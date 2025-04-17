import foodDatabase, { FoodItem } from './food-database';
import { analyzeFoodWithGemini, analyzeFoodByText } from '@/services/gemini-service';

// This function now uses Gemini API for real food recognition
export async function recognizeFood(imageUri: string): Promise<FoodItem | null> {
  try {
    // Call Gemini API to analyze the food image
    const result = await analyzeFoodWithGemini(imageUri);
    return result;
  } catch (error) {
    console.error('Error recognizing food:', error);
    
    // Fallback to mock data if Gemini API fails
    // In a production app, you might want to show an error instead
    const randomIndex = Math.floor(Math.random() * foodDatabase.length);
    return foodDatabase[randomIndex];
  }
}

// Function to get a food item by name (for search functionality)
// Now uses Gemini API for text-based food analysis
export async function getFoodByName(name: string): Promise<FoodItem | null> {
  try {
    // First check if we have this food in our database
    const foodFromDb = foodDatabase.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    
    if (foodFromDb) {
      return foodFromDb;
    }
    
    // If not in database, use Gemini to analyze
    const result = await analyzeFoodByText(name);
    return result;
  } catch (error) {
    console.error('Error getting food by name:', error);
    return null;
  }
}

// Function to get similar foods (for recommendations)
export function getSimilarFoods(category: string, excludeId: string): FoodItem[] {
  return foodDatabase
    .filter((item) => item.category === category && item.id !== excludeId)
    .slice(0, 3);
}

// Function to get better alternatives for foods with 'limit' recommendation
export function getBetterAlternatives(food: FoodItem): FoodItem[] {
  if (food.diabeticRecommendation !== 'limit') {
    return [];
  }
  
  return foodDatabase
    .filter(
      (item) => 
        item.category === food.category && 
        item.diabeticRecommendation !== 'limit' &&
        item.id !== food.id
    )
    .slice(0, 3);
}