import { FoodItem } from '@/mocks/food-database';
import { Platform } from 'react-native';

// Hardcoded API key
const API_KEY = 'AIzaSyC20z3MwtecTJbshcxMc2IlYJ44SJo7cMM';

// Function to convert image URI to base64
async function imageUriToBase64(uri: string): Promise<string> {
  try {
    // For web, we need to fetch the image and convert it
    if (Platform.OS === 'web') {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64 = base64String.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } else {
      // For native platforms, we would use expo-file-system
      // This is a simplified version - in a real app, you'd need to handle different URI formats
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          // Remove the data URL prefix
          const base64 = base64String.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
}

// Function to analyze food using Gemini API
export async function analyzeFoodWithGemini(imageUri: string): Promise<FoodItem | null> {
  try {
    // Convert image to base64
    const base64Image = await imageUriToBase64(imageUri);
    
    // Prepare the request payload for Gemini with enhanced nutrition extraction prompt
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `You are a nutrition expert specializing in diabetes management. Analyze this food image in detail and provide comprehensive information:

1. IDENTIFICATION: What specific food item is shown in the image? Be precise.

2. CATEGORY: Classify it as: fruit, vegetable, grain, protein, dairy, processed, beverage, or other.

3. GLYCEMIC INDEX: Provide the estimated glycemic index (GI) value (0-100). If it's a protein or fat with no GI, use 0.

4. DETAILED NUTRITION (per 100g):
   - Carbohydrates (g): [exact number]
   - Fiber (g): [exact number]
   - Protein (g): [exact number]
   - Fat (g): [exact number]
   - Sugar (g): [exact number]
   - Calories: [exact number]

5. DIABETIC RECOMMENDATION: Classify as "good", "moderate", or "limit" for people with diabetes.

6. REASONING: Provide a detailed explanation for your recommendation based on nutritional content.

7. TIPS: Offer specific advice for diabetics consuming this food.

IMPORTANT: If you can see a nutrition label in the image, use that data. Extract all visible nutrition information from the label.

Format your response as a clean JSON object with these exact fields:
{
  "name": "Food Name",
  "category": "category",
  "giIndex": number,
  "carbs": number,
  "fiber": number,
  "protein": number,
  "fat": number,
  "sugar": number,
  "calories": number,
  "diabeticRecommendation": "good/moderate/limit",
  "reasoning": "Detailed reasoning",
  "tips": "Specific tips"
}`
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: base64Image
              }
            }
          ]
        }
      ],
      generation_config: {
        temperature: 0.2,
        top_p: 0.95,
        top_k: 40,
        max_output_tokens: 1024,
      }
    };

    // Make the API request - Using the newer gemini-1.5-flash model
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error Response:', errorData);
      throw new Error(`API request failed with status ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    
    // Extract the text response from Gemini
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid response format from Gemini API');
    }
    
    console.log('Raw Gemini response:', textResponse);
    
    // Try to parse the JSON response
    try {
      // The response might contain markdown code blocks, so we need to extract the JSON
      const jsonRegex1 = /```json\n([\s\S]*?)\n```/;
      const jsonRegex2 = /```\n([\s\S]*?)\n```/;
      
      const jsonMatch = textResponse.match(jsonRegex1) || 
                        textResponse.match(jsonRegex2) ||
                        [null, textResponse];
      
      const jsonString = jsonMatch[1] || textResponse;
      const cleanJsonString = jsonString.trim().replace(/^```json\n|\n```$/g, '');
      
      console.log('Cleaned JSON string:', cleanJsonString);
      
      const parsedResponse = JSON.parse(cleanJsonString);
      
      console.log('Parsed response:', parsedResponse);
      
      // Map the Gemini response to our FoodItem structure
      const foodItem: FoodItem = {
        id: Date.now().toString(), // Generate a unique ID
        name: parsedResponse.name || "Unknown Food",
        category: parsedResponse.category || "other",
        giIndex: Number(parsedResponse.giIndex) || 0,
        carbs: Number(parsedResponse.carbs) || 0,
        fiber: Number(parsedResponse.fiber) || 0,
        protein: Number(parsedResponse.protein) || 0,
        fat: Number(parsedResponse.fat) || 0,
        sugar: Number(parsedResponse.sugar) || 0,
        calories: Number(parsedResponse.calories) || 0,
        diabeticRecommendation: parsedResponse.diabeticRecommendation || "moderate",
        reasoning: parsedResponse.reasoning || "No reasoning provided",
        tips: parsedResponse.tips || "No tips provided"
      };
      
      return foodItem;
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.log('Raw response:', textResponse);
      
      // Try to extract information using regex as a fallback
      try {
        const extractedFood = extractFoodInfoFromText(textResponse);
        return extractedFood;
      } catch (extractError) {
        console.error('Error extracting food info from text:', extractError);
        
        // Last resort fallback
        return {
          id: Date.now().toString(),
          name: extractFoodNameFromText(textResponse) || "Unidentified Food",
          category: "other",
          giIndex: 0,
          carbs: 0,
          fiber: 0,
          protein: 0,
          fat: 0,
          sugar: 0,
          calories: 0,
          diabeticRecommendation: "moderate",
          reasoning: "Could not analyze this food properly. The AI provided this response: " + textResponse.substring(0, 200) + "...",
          tips: "Please try again with a clearer image or manually enter the food name."
        };
      }
    }
  } catch (error) {
    console.error('Error analyzing food with Gemini:', error);
    return null;
  }
}

// Function to extract food name from text as a last resort
function extractFoodNameFromText(text: string): string {
  // Try to find food name in various formats
  const nameMatch = 
    text.match(/name["\s:]+([^"]+)["]/i) || 
    text.match(/food item[^\n]+?is[^\n]+?([a-zA-Z\s]+)/i) ||
    text.match(/identified as[^\n]+?([a-zA-Z\s]+)/i);
  
  return nameMatch ? nameMatch[1].trim() : "Unidentified Food";
}

// Function to extract food information from text using regex
function extractFoodInfoFromText(text: string): FoodItem {
  const id = Date.now().toString();
  
  // Extract food name
  const nameMatch = text.match(/name["\s:]+([^"]+)["]/i) || 
                   text.match(/food item[^\n]+?is[^\n]+?([a-zA-Z\s]+)/i) ||
                   text.match(/identified as[^\n]+?([a-zA-Z\s]+)/i);
  const name = nameMatch ? nameMatch[1].trim() : "Unidentified Food";
  
  // Extract category
  const categoryMatch = text.match(/category["\s:]+([^"]+)["]/i) ||
                       text.match(/category[^\n]+?([a-zA-Z]+)/i);
  const category = categoryMatch ? 
    categoryMatch[1].trim().toLowerCase() as FoodItem['category'] : "other";
  
  // Extract GI index
  const giMatch = text.match(/giIndex["\s:]+(\d+)/i) ||
                 text.match(/glycemic index[^\n]+?(\d+)/i);
  const giIndex = giMatch ? parseInt(giMatch[1]) : 0;
  
  // Extract nutrition values
  const carbsMatch = text.match(/carbs["\s:]+(\d+\.?\d*)/i) ||
                    text.match(/carbohydrates[^\n]+?(\d+\.?\d*)/i);
  const carbs = carbsMatch ? parseFloat(carbsMatch[1]) : 0;
  
  const fiberMatch = text.match(/fiber["\s:]+(\d+\.?\d*)/i) ||
                    text.match(/dietary fiber[^\n]+?(\d+\.?\d*)/i);
  const fiber = fiberMatch ? parseFloat(fiberMatch[1]) : 0;
  
  const proteinMatch = text.match(/protein["\s:]+(\d+\.?\d*)/i) ||
                      text.match(/protein[^\n]+?(\d+\.?\d*)/i);
  const protein = proteinMatch ? parseFloat(proteinMatch[1]) : 0;
  
  const fatMatch = text.match(/fat["\s:]+(\d+\.?\d*)/i) ||
                  text.match(/total fat[^\n]+?(\d+\.?\d*)/i);
  const fat = fatMatch ? parseFloat(fatMatch[1]) : 0;
  
  const sugarMatch = text.match(/sugar["\s:]+(\d+\.?\d*)/i) ||
                    text.match(/sugars[^\n]+?(\d+\.?\d*)/i);
  const sugar = sugarMatch ? parseFloat(sugarMatch[1]) : 0;
  
  const caloriesMatch = text.match(/calories["\s:]+(\d+\.?\d*)/i) ||
                       text.match(/calories[^\n]+?(\d+\.?\d*)/i);
  const calories = caloriesMatch ? parseFloat(caloriesMatch[1]) : 0;
  
  // Extract recommendation
  const recommendationMatch = text.match(/diabeticRecommendation["\s:]+([^"]+)["]/i) ||
                             text.match(/recommendation[^\n]+?(good|moderate|limit)/i);
  const diabeticRecommendation = recommendationMatch ? 
    recommendationMatch[1].trim().toLowerCase() as FoodItem['diabeticRecommendation'] : "moderate";
  
  // Extract reasoning and tips
  const reasoningMatch = text.match(/reasoning["\s:]+([^"]+)["]/i) ||
                        text.match(/reasoning:(.*?)(?=tips:|$)/is);
  const reasoning = reasoningMatch ? reasoningMatch[1].trim() : "No reasoning provided";
  
  const tipsMatch = text.match(/tips["\s:]+([^"]+)["]/i) ||
                   text.match(/tips:(.*?)(?=$)/is);
  const tips = tipsMatch ? tipsMatch[1].trim() : "No tips provided";
  
  return {
    id,
    name,
    category,
    giIndex,
    carbs,
    fiber,
    protein,
    fat,
    sugar,
    calories,
    diabeticRecommendation,
    reasoning,
    tips
  };
}

// Function to analyze food by text description
export async function analyzeFoodByText(foodName: string): Promise<FoodItem | null> {
  try {
    // Prepare the request payload for Gemini (text-only version)
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `You are a nutrition expert specializing in diabetes management. Analyze this food item "${foodName}" in detail and provide comprehensive information:

1. CATEGORY: Classify it as: fruit, vegetable, grain, protein, dairy, processed, beverage, or other.

2. GLYCEMIC INDEX: Provide the estimated glycemic index (GI) value (0-100). If it's a protein or fat with no GI, use 0.

3. DETAILED NUTRITION (per 100g):
   - Carbohydrates (g): [exact number]
   - Fiber (g): [exact number]
   - Protein (g): [exact number]
   - Fat (g): [exact number]
   - Sugar (g): [exact number]
   - Calories: [exact number]

4. DIABETIC RECOMMENDATION: Classify as "good", "moderate", or "limit" for people with diabetes.

5. REASONING: Provide a detailed explanation for your recommendation based on nutritional content.

6. TIPS: Offer specific advice for diabetics consuming this food.

Format your response as a clean JSON object with these exact fields:
{
  "name": "${foodName}",
  "category": "category",
  "giIndex": number,
  "carbs": number,
  "fiber": number,
  "protein": number,
  "fat": number,
  "sugar": number,
  "calories": number,
  "diabeticRecommendation": "good/moderate/limit",
  "reasoning": "Detailed reasoning",
  "tips": "Specific tips"
}`
            }
          ]
        }
      ],
      generation_config: {
        temperature: 0.2,
        top_p: 0.95,
        top_k: 40,
        max_output_tokens: 1024,
      }
    };

    // Make the API request - Using the newer gemini-1.5-flash model
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error Response:', errorData);
      throw new Error(`API request failed with status ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    
    // Extract the text response from Gemini
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid response format from Gemini API');
    }
    
    console.log('Raw Gemini text response:', textResponse);
    
    // Try to parse the JSON response
    try {
      // The response might contain markdown code blocks, so we need to extract the JSON
      const jsonRegex1 = /```json\n([\s\S]*?)\n```/;
      const jsonRegex2 = /```\n([\s\S]*?)\n```/;
      
      const jsonMatch = textResponse.match(jsonRegex1) || 
                        textResponse.match(jsonRegex2) ||
                        [null, textResponse];
      
      const jsonString = jsonMatch[1] || textResponse;
      const cleanJsonString = jsonString.trim().replace(/^```json\n|\n```$/g, '');
      
      console.log('Cleaned JSON string:', cleanJsonString);
      
      const parsedResponse = JSON.parse(cleanJsonString);
      
      console.log('Parsed response:', parsedResponse);
      
      // Map the Gemini response to our FoodItem structure
      const foodItem: FoodItem = {
        id: Date.now().toString(), // Generate a unique ID
        name: foodName,
        category: parsedResponse.category || "other",
        giIndex: Number(parsedResponse.giIndex) || 0,
        carbs: Number(parsedResponse.carbs) || 0,
        fiber: Number(parsedResponse.fiber) || 0,
        protein: Number(parsedResponse.protein) || 0,
        fat: Number(parsedResponse.fat) || 0,
        sugar: Number(parsedResponse.sugar) || 0,
        calories: Number(parsedResponse.calories) || 0,
        diabeticRecommendation: parsedResponse.diabeticRecommendation || "moderate",
        reasoning: parsedResponse.reasoning || "No reasoning provided",
        tips: parsedResponse.tips || "No tips provided"
      };
      
      return foodItem;
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      console.log('Raw response:', textResponse);
      
      // Try to extract information using regex as a fallback
      try {
        const extractedFood = extractFoodInfoFromText(textResponse);
        extractedFood.name = foodName; // Ensure the name is set correctly
        return extractedFood;
      } catch (extractError) {
        console.error('Error extracting food info from text:', extractError);
        
        // Last resort fallback
        return {
          id: Date.now().toString(),
          name: foodName,
          category: "other",
          giIndex: 0,
          carbs: 0,
          fiber: 0,
          protein: 0,
          fat: 0,
          sugar: 0,
          calories: 0,
          diabeticRecommendation: "moderate",
          reasoning: "Could not analyze this food properly. The AI provided this response: " + textResponse.substring(0, 200) + "...",
          tips: "Please try again with a different food name or description."
        };
      }
    }
  } catch (error) {
    console.error('Error analyzing food with Gemini:', error);
    return null;
  }
}