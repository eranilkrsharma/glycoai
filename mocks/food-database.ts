export interface FoodItem {
  id: string;
  name: string;
  category: 'fruit' | 'vegetable' | 'grain' | 'protein' | 'dairy' | 'processed' | 'beverage' | 'other';
  giIndex: number;
  carbs: number; // per 100g
  fiber: number; // per 100g
  protein: number; // per 100g
  fat: number; // per 100g
  sugar: number; // per 100g (added)
  calories: number; // per 100g
  diabeticRecommendation: 'good' | 'moderate' | 'limit';
  reasoning: string;
  tips: string;
}

const foodDatabase: FoodItem[] = [
  {
    id: '1',
    name: 'Apple',
    category: 'fruit',
    giIndex: 36,
    carbs: 14,
    fiber: 2.4,
    protein: 0.3,
    fat: 0.2,
    sugar: 10.4, // Added sugar content
    calories: 52,
    diabeticRecommendation: 'good',
    reasoning: "Apples have a low glycemic index (36) and are high in fiber, which helps slow down sugar absorption. While they contain natural sugars (10.4g per 100g), the fiber content helps prevent blood sugar spikes.",
    tips: "Eat with the skin on for maximum fiber. Pair with a protein like cheese or nut butter to further reduce blood sugar impact."
  },
  {
    id: '2',
    name: 'Banana',
    category: 'fruit',
    giIndex: 51,
    carbs: 23,
    fiber: 2.6,
    protein: 1.1,
    fat: 0.3,
    sugar: 12.2, // Added sugar content
    calories: 89,
    diabeticRecommendation: 'moderate',
    reasoning: "Bananas have a medium glycemic index (51) and higher sugar content (12.2g per 100g). Riper bananas have more sugar and a higher GI impact.",
    tips: "Choose slightly underripe bananas with some green on the peel. Portion control is important - half a banana may be better than a whole one."
  },
  {
    id: '3',
    name: 'Broccoli',
    category: 'vegetable',
    giIndex: 15,
    carbs: 6.6,
    fiber: 2.6,
    protein: 2.8,
    fat: 0.4,
    sugar: 1.7, // Added sugar content
    calories: 34,
    diabeticRecommendation: 'good',
    reasoning: "Broccoli has a very low glycemic index (15), minimal sugar (1.7g per 100g), and is high in fiber and nutrients while being low in carbs. It's an excellent choice for blood sugar management.",
    tips: "Steam or roast instead of boiling to preserve nutrients. Add healthy fats like olive oil to increase nutrient absorption."
  },
  {
    id: '4',
    name: 'Brown Rice',
    category: 'grain',
    giIndex: 50,
    carbs: 23,
    fiber: 1.8,
    protein: 2.6,
    fat: 0.9,
    sugar: 0.4, // Added sugar content
    calories: 112,
    diabeticRecommendation: 'moderate',
    reasoning: "Brown rice has a medium glycemic index (50) but contains fiber and very little sugar (0.4g per 100g). The fiber helps slow digestion and blood sugar impact.",
    tips: "Keep portions to 1/3-1/2 cup cooked. Pair with proteins and non-starchy vegetables to create a balanced meal with less blood sugar impact."
  },
  {
    id: '5',
    name: 'White Bread',
    category: 'grain',
    giIndex: 75,
    carbs: 49,
    fiber: 2.7,
    protein: 9,
    fat: 3.2,
    sugar: 5.1, // Added sugar content
    calories: 265,
    diabeticRecommendation: 'limit',
    reasoning: "White bread has a high glycemic index (75), contains added sugars (5.1g per 100g), and can cause rapid blood sugar spikes. It's low in fiber and nutrients compared to whole grain options.",
    tips: "Choose whole grain bread instead, which has more fiber. If you must have white bread, limit to a small portion and pair with protein and healthy fats."
  },
  {
    id: '6',
    name: 'Salmon',
    category: 'protein',
    giIndex: 0,
    carbs: 0,
    fiber: 0,
    protein: 20,
    fat: 13,
    sugar: 0, // Added sugar content
    calories: 208,
    diabeticRecommendation: 'good',
    reasoning: "Salmon has no carbs, no sugar, and thus no glycemic impact. It's rich in protein and healthy omega-3 fats that may improve insulin sensitivity.",
    tips: "Aim for 2-3 servings of fatty fish like salmon per week. Bake, grill, or steam rather than frying."
  },
  {
    id: '7',
    name: 'Sweet Potato',
    category: 'vegetable',
    giIndex: 44,
    carbs: 20,
    fiber: 3,
    protein: 1.6,
    fat: 0.1,
    sugar: 4.2, // Added sugar content
    calories: 86,
    diabeticRecommendation: 'moderate',
    reasoning: "Sweet potatoes have a medium glycemic index (44), moderate natural sugar content (4.2g per 100g), but are rich in fiber and nutrients. They're a better choice than regular potatoes for blood sugar management.",
    tips: "Keep portions moderate (half a medium sweet potato). Cooking and cooling creates resistant starch, which has less impact on blood sugar."
  },
  {
    id: '8',
    name: 'Soda',
    category: 'beverage',
    giIndex: 65,
    carbs: 10.6,
    fiber: 0,
    protein: 0,
    fat: 0,
    sugar: 10.6, // Added sugar content
    calories: 41,
    diabeticRecommendation: 'limit',
    reasoning: "Soda contains high amounts of rapidly absorbed sugars (10.6g per 100g) with no nutritional value. It's essentially pure sugar water that can cause significant blood sugar spikes.",
    tips: "Avoid regular soda completely. Choose water, unsweetened tea, or sparkling water with a splash of lemon or lime instead."
  },
  {
    id: '9',
    name: 'Spinach',
    category: 'vegetable',
    giIndex: 0,
    carbs: 3.6,
    fiber: 2.2,
    protein: 2.9,
    fat: 0.4,
    sugar: 0.4, // Added sugar content
    calories: 23,
    diabeticRecommendation: 'good',
    reasoning: "Spinach has virtually no impact on blood sugar, negligible sugar content (0.4g per 100g), and is packed with nutrients and fiber. It's an excellent choice for diabetes management.",
    tips: "Eat raw in salads or lightly sautéed to preserve nutrients. Add to smoothies, omelets, and soups to increase vegetable intake."
  },
  {
    id: '10',
    name: 'Chicken Breast',
    category: 'protein',
    giIndex: 0,
    carbs: 0,
    fiber: 0,
    protein: 31,
    fat: 3.6,
    sugar: 0, // Added sugar content
    calories: 165,
    diabeticRecommendation: 'good',
    reasoning: "Chicken breast has no carbs, no sugar, and thus no glycemic impact. It's high in protein which helps with satiety and doesn't affect blood sugar.",
    tips: "Remove skin to reduce saturated fat. Grill, bake, or poach instead of frying. Pair with non-starchy vegetables for a balanced meal."
  },
  {
    id: '11',
    name: 'Avocado',
    category: 'fruit',
    giIndex: 15,
    carbs: 8.5,
    fiber: 6.7,
    protein: 2,
    fat: 15,
    sugar: 0.7, // Added sugar content
    calories: 160,
    diabeticRecommendation: 'good',
    reasoning: "Avocados have a very low glycemic index (15), minimal sugar (0.7g per 100g), and are rich in healthy monounsaturated fats and fiber. They can help improve insulin sensitivity.",
    tips: "Add to salads, sandwiches, or enjoy with eggs. The healthy fats help slow digestion and reduce blood sugar impact of other foods."
  },
  {
    id: '12',
    name: 'Greek Yogurt (Plain)',
    category: 'dairy',
    giIndex: 11,
    carbs: 3.6,
    fiber: 0,
    protein: 10,
    fat: 0.4,
    sugar: 3.6, // Added sugar content
    calories: 59,
    diabeticRecommendation: 'good',
    reasoning: "Plain Greek yogurt has a low glycemic index (11), is high in protein with minimal carbs and moderate natural sugar (3.6g per 100g). The protein helps with blood sugar regulation.",
    tips: "Choose unsweetened varieties. Add berries, nuts, or a sprinkle of cinnamon for flavor without significantly impacting blood sugar."
  },
  {
    id: '13',
    name: 'Oatmeal',
    category: 'grain',
    giIndex: 55,
    carbs: 12,
    fiber: 2,
    protein: 2.4,
    fat: 1.4,
    sugar: 0.5, // Added sugar content
    calories: 68,
    diabeticRecommendation: 'moderate',
    reasoning: "Steel-cut and rolled oats have a medium glycemic index (55), very low sugar content (0.5g per 100g), but are high in soluble fiber, which helps regulate blood sugar. They're better than most breakfast cereals.",
    tips: "Choose steel-cut or rolled oats over instant varieties. Add protein (nuts, seeds) and healthy fat to slow digestion and reduce blood sugar impact."
  },
  {
    id: '14',
    name: 'Chocolate Cake',
    category: 'processed',
    giIndex: 38,
    carbs: 52,
    fiber: 2,
    protein: 5,
    fat: 20,
    sugar: 36.8, // Added sugar content
    calories: 371,
    diabeticRecommendation: 'limit',
    reasoning: "While chocolate cake may have a moderate glycemic index (38) due to fat content slowing absorption, it's very high in sugar (36.8g per 100g) and refined carbs with little nutritional value.",
    tips: "Save for special occasions in very small portions. Consider almond flour or coconut flour based cakes with less sugar as alternatives."
  },
  {
    id: '15',
    name: 'Lentils',
    category: 'protein',
    giIndex: 32,
    carbs: 20,
    fiber: 7.9,
    protein: 9,
    fat: 0.4,
    sugar: 1.8, // Added sugar content
    calories: 116,
    diabeticRecommendation: 'good',
    reasoning: "Lentils have a low glycemic index (32), low sugar content (1.8g per 100g), and are high in fiber and plant protein. They can help improve blood sugar regulation and provide sustained energy.",
    tips: "Add to soups, salads, or use as a meat substitute. The combination of protein and fiber makes them excellent for blood sugar management."
  },
  {
    id: '16',
    name: 'Orange Juice',
    category: 'beverage',
    giIndex: 50,
    carbs: 10.4,
    fiber: 0.2,
    protein: 0.7,
    fat: 0.2,
    sugar: 8.3, // Added sugar content
    calories: 45,
    diabeticRecommendation: 'limit',
    reasoning: "Orange juice has a medium glycemic index (50) but is high in natural sugars (8.3g per 100g) with minimal fiber. Without the fiber of whole fruit, these sugars are rapidly absorbed, causing blood sugar spikes.",
    tips: "Choose whole oranges instead of juice. If you must have juice, limit to a very small portion (4oz) and have with a meal containing protein and fat."
  },
  {
    id: '17',
    name: 'Quinoa',
    category: 'grain',
    giIndex: 53,
    carbs: 21.3,
    fiber: 2.8,
    protein: 4.4,
    fat: 1.9,
    sugar: 0.9, // Added sugar content
    calories: 120,
    diabeticRecommendation: 'moderate',
    reasoning: "Quinoa has a medium glycemic index (53), very low sugar content (0.9g per 100g), and provides complete protein and fiber. It's a better choice than many other grains for blood sugar management.",
    tips: "Keep portions to 1/2-3/4 cup cooked. Rinse well before cooking to remove bitter saponins. Pair with non-starchy vegetables and healthy fats."
  },
  {
    id: '18',
    name: 'Blueberries',
    category: 'fruit',
    giIndex: 53,
    carbs: 14.5,
    fiber: 2.4,
    protein: 0.7,
    fat: 0.3,
    sugar: 10, // Added sugar content
    calories: 57,
    diabeticRecommendation: 'moderate',
    reasoning: "Blueberries have a medium glycemic index (53) and contain natural sugars (10g per 100g), but they're rich in fiber and antioxidants that may help improve insulin sensitivity.",
    tips: "Limit portion size to 1/2-3/4 cup. Pair with protein sources like Greek yogurt or nuts to reduce blood sugar impact."
  },
  {
    id: '19',
    name: 'Potato Chips',
    category: 'processed',
    giIndex: 75,
    carbs: 52.9,
    fiber: 4.8,
    protein: 7,
    fat: 34.6,
    sugar: 0.6, // Added sugar content
    calories: 547,
    diabeticRecommendation: 'limit',
    reasoning: "Potato chips have a high glycemic index (75), are high in refined carbs and unhealthy fats. While sugar content is low (0.6g per 100g), the refined carbs quickly convert to glucose in the bloodstream.",
    tips: "Avoid or limit severely. Try air-popped popcorn, roasted chickpeas, or vegetable chips made from kale or zucchini as alternatives."
  },
  {
    id: '20',
    name: 'Dark Chocolate (70%+ cocoa)',
    category: 'processed',
    giIndex: 23,
    carbs: 46,
    fiber: 11,
    protein: 7.8,
    fat: 43,
    sugar: 24, // Added sugar content
    calories: 598,
    diabeticRecommendation: 'moderate',
    reasoning: "Dark chocolate (70%+ cocoa) has a low glycemic index (23) and contains antioxidants that may improve insulin sensitivity. However, it still contains sugar (24g per 100g) and is calorie-dense.",
    tips: "Limit to a small square (10-15g) of 70%+ cocoa dark chocolate. Enjoy after a meal rather than on an empty stomach to reduce blood sugar impact."
  }
];

export default foodDatabase;