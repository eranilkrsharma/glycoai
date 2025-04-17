export type TranslationKey = 
  | 'appName'
  | 'home'
  | 'history'
  | 'learn'
  | 'settings'
  | 'scanFood'
  | 'scanning'
  | 'enterFoodManually'
  | 'searchForFoods'
  | 'recentScans'
  | 'recommendedForDiabetics'
  | 'lowSugarOptions'
  | 'eatSmartLiveWell'
  | 'discoverDiabeticFriendlyFoods'
  | 'scanFoodForHealth'
  | 'takePhotoOrSearch'
  | 'diabetesFriendlyScanner'
  | 'makeInformedChoices'
  | 'noScansYet'
  | 'scanFirstFood'
  | 'noScanHistory'
  | 'analyzingFood'
  | 'loadingAnalysis'
  | 'glycemicIndex'
  | 'nutritionFacts'
  | 'carbs'
  | 'fiber'
  | 'protein'
  | 'fat'
  | 'sugar'
  | 'calories'
  | 'netCarbs'
  | 'sugarImpact'
  | 'low'
  | 'moderate'
  | 'high'
  | 'goodChoice'
  | 'consumeInModeration'
  | 'limitConsumption'
  | 'why'
  | 'tips'
  | 'betterAlternatives'
  | 'similarFoods'
  | 'newScan'
  | 'reanalyze'
  | 'category'
  | 'aiPowered'
  | 'disclaimer'
  | 'aboutDiabetScan'
  | 'aboutText'
  | 'version'
  | 'aiPoweredAnalysis'
  | 'aiInfoText'
  | 'appSettings'
  | 'saveScanHistory'
  | 'notifications'
  | 'darkMode'
  | 'language'
  | 'dataManagement'
  | 'clearScanHistory'
  | 'clearHistoryConfirm'
  | 'cancel'
  | 'clear'
  | 'success'
  | 'historyCleared'
  | 'analyzeWithAI'
  | 'analyzing'
  | 'noFoodsFound'
  | 'enterFoodName'
  | 'analyzeAnyFood'
  | 'searchDatabase'
  | 'orSearchDatabase'
  | 'type2CharsToSearch'
  | 'foodNotFound'
  | 'tryAgain'
  | 'goBack'
  | 'lowGI'
  | 'mediumGI'
  | 'highGI'
  | 'noGI'
  | 'giExplanationLow'
  | 'giExplanationMedium'
  | 'giExplanationHigh'
  | 'giExplanationNone'
  | 'sugarInfoLow'
  | 'sugarInfoModerate'
  | 'sugarInfoHigh'
  | 'importantForBloodSugar'
  | 'noNutritionData'
  | 'noNutritionDataMessage'
  | 'understandingFoodDiabetes'
  | 'whatIsGlycemicIndex'
  | 'giDefinition'
  | 'sugarContentDiabetes'
  | 'sugarContentText'
  | 'lowSugarDefinition'
  | 'moderateSugarDefinition'
  | 'highSugarDefinition'
  | 'beyondGI'
  | 'beyondGIText'
  | 'portionSize'
  | 'portionSizeText'
  | 'mealTiming'
  | 'mealTimingText'
  | 'foodCombinations'
  | 'foodCombinationsText'
  | 'bestPractices'
  | 'tip1'
  | 'tip2'
  | 'tip3'
  | 'tip4'
  | 'tip5'
  | 'tip6'
  | 'disclaimerText';

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

export type Language = 'en' | 'hi';

export const translations: Translations = {
  en: {
    appName: 'Gyco AI',
    home: 'Home',
    history: 'History',
    learn: 'Learn',
    settings: 'Settings',
    scanFood: 'Scan Food',
    scanning: 'Scanning...',
    enterFoodManually: 'Or enter food name manually',
    searchForFoods: 'Search for foods (e.g., apple, rice, chicken)',
    recentScans: 'Recent Scans',
    recommendedForDiabetics: 'Recommended for Diabetics',
    lowSugarOptions: 'Low Sugar Options',
    eatSmartLiveWell: 'Eat Smart, Live Well',
    discoverDiabeticFriendlyFoods: 'Discover diabetes-friendly foods',
    scanFoodForHealth: 'Scan Food for Diabetic Health Insights',
    takePhotoOrSearch: 'Take a photo of your food or search by name to get personalized recommendations',
    diabetesFriendlyScanner: 'Diabetes-Friendly Food Scanner',
    makeInformedChoices: 'Make informed food choices',
    noScansYet: 'No Scans Yet',
    scanFirstFood: 'Scan your first food item to get personalized diabetic health recommendations.',
    noScanHistory: 'No Scan History',
    analyzingFood: 'Analyzing your food...',
    loadingAnalysis: 'Loading food analysis...',
    glycemicIndex: 'Glycemic Index',
    nutritionFacts: 'Nutrition Facts (per 100g)',
    carbs: 'Carbs',
    fiber: 'Fiber',
    protein: 'Protein',
    fat: 'Fat',
    sugar: 'Sugar',
    calories: 'Calories',
    netCarbs: 'Net Carbs:',
    sugarImpact: 'Sugar Impact:',
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
    goodChoice: 'Good Choice',
    consumeInModeration: 'Consume in Moderation',
    limitConsumption: 'Limit Consumption',
    why: 'Why?',
    tips: 'Tips:',
    betterAlternatives: 'Better Alternatives',
    similarFoods: 'Similar Foods',
    newScan: 'New Scan',
    reanalyze: 'Reanalyze',
    category: 'Category',
    aiPowered: 'AI Powered',
    disclaimer: 'Disclaimer',
    aboutDiabetScan: 'About Gyco AI',
    aboutText: 'Gyco AI helps people with diabetes make informed food choices by providing nutritional information and personalized recommendations based on glycemic index and sugar content.',
    version: 'Version 1.0.0',
    aiPoweredAnalysis: 'AI-Powered Analysis',
    aiInfoText: 'This app uses Google\'s Gemini 1.5 Flash AI model to analyze food images and provide nutritional information. The API key is securely integrated into the app.',
    appSettings: 'App Settings',
    saveScanHistory: 'Save Scan History',
    notifications: 'Notifications',
    darkMode: 'Dark Mode',
    language: 'Language',
    dataManagement: 'Data Management',
    clearScanHistory: 'Clear Scan History',
    clearHistoryConfirm: 'Are you sure you want to clear all scan history? This action cannot be undone.',
    cancel: 'Cancel',
    clear: 'Clear',
    success: 'Success',
    historyCleared: 'Scan history cleared successfully',
    analyzeWithAI: 'Analyze with AI',
    analyzing: 'Analyzing...',
    noFoodsFound: 'No foods found in database matching',
    enterFoodName: 'Enter Food Name',
    analyzeAnyFood: 'Analyze any food with AI:',
    searchDatabase: 'Search database (e.g., apple, rice)',
    orSearchDatabase: 'or search our database',
    type2CharsToSearch: 'Type at least 2 characters to search our database',
    foodNotFound: 'Food Not Found',
    tryAgain: 'We couldn\'t find the food you\'re looking for. Please try scanning again.',
    goBack: 'Go Back',
    lowGI: 'Low GI',
    mediumGI: 'Medium GI',
    highGI: 'High GI',
    noGI: 'No GI',
    giExplanationLow: 'Low GI foods are digested slowly, causing a gradual rise in blood sugar levels.',
    giExplanationMedium: 'Medium GI foods cause a moderate rise in blood sugar levels.',
    giExplanationHigh: 'High GI foods are quickly digested, causing a rapid rise in blood sugar levels.',
    giExplanationNone: 'This food has no glycemic index as it contains minimal or no carbohydrates.',
    sugarInfoLow: 'Low sugar content is generally better for blood sugar control.',
    sugarInfoModerate: 'Moderate sugar content - portion control is important.',
    sugarInfoHigh: 'High sugar content - consume with caution and in small amounts.',
    importantForBloodSugar: 'important for blood sugar management',
    noNutritionData: 'Nutrition data could not be extracted from the image.',
    noNutritionDataMessage: 'Try taking a clearer photo of the nutrition label or search for this food by name.',
    understandingFoodDiabetes: 'Understanding Food & Diabetes',
    whatIsGlycemicIndex: 'What is the Glycemic Index?',
    giDefinition: 'The Glycemic Index (GI) ranks foods on a scale from 0 to 100 based on how quickly they raise blood sugar levels. Foods with a high GI are rapidly digested and cause significant blood sugar spikes.',
    sugarContentDiabetes: 'Sugar Content & Diabetes',
    sugarContentText: 'Sugar content is a critical factor for people with diabetes. Both natural and added sugars can affect blood glucose levels, though they impact your body differently:',
    lowSugarDefinition: 'Foods with minimal sugar content are generally safer for blood glucose management. Examples include most vegetables, some dairy, and proteins.',
    moderateSugarDefinition: 'These foods should be consumed in moderation and paired with protein or fat to slow absorption. Examples include some fruits and whole grains.',
    highSugarDefinition: 'These foods can cause rapid blood sugar spikes and should be limited or avoided. Examples include sweets, sodas, and many processed foods.',
    beyondGI: 'Beyond GI: What Else Matters',
    beyondGIText: 'While GI and sugar content are important, other factors also affect how food impacts your blood sugar:',
    portionSize: 'Portion Size',
    portionSizeText: 'Even low-GI foods can raise blood sugar if eaten in large amounts. Portion control is essential.',
    mealTiming: 'Meal Timing',
    mealTimingText: 'Spacing meals throughout the day helps maintain stable blood sugar levels.',
    foodCombinations: 'Food Combinations',
    foodCombinationsText: 'Pairing carbs with protein, fat, or fiber slows digestion and reduces blood sugar impact.',
    bestPractices: 'Best Practices for Diabetic Eating',
    tip1: 'Choose high-fiber, low-GI carbohydrates like whole grains, legumes, and non-starchy vegetables.',
    tip2: 'Include lean protein with meals to slow digestion and improve satiety.',
    tip3: 'Add healthy fats like avocados, nuts, and olive oil to reduce the glycemic impact of meals.',
    tip4: 'Stay hydrated with water instead of sugary beverages.',
    tip5: 'Monitor your blood sugar response to different foods to understand your personal patterns.',
    tip6: 'Pay attention to both total carbs and sugar content. Choose foods with less than 5g of sugar per serving when possible.',
    disclaimerText: 'This app provides general information and is not a substitute for professional medical advice. Always consult with your healthcare provider about your specific dietary needs.'
  },
  hi: {
    appName: 'ग्लाइको एआई',
    home: 'होम',
    history: 'इतिहास',
    learn: 'जानें',
    settings: 'सेटिंग्स',
    scanFood: 'खाना स्कैन करें',
    scanning: 'स्कैन हो रहा है...',
    enterFoodManually: 'या खाने का नाम मैन्युअली दर्ज करें',
    searchForFoods: 'खाने की तलाश करें (जैसे, सेब, चावल, चिकन)',
    recentScans: 'हाल के स्कैन',
    recommendedForDiabetics: 'मधुमेह रोगियों के लिए अनुशंसित',
    lowSugarOptions: 'कम शुगर वाले विकल्प',
    eatSmartLiveWell: 'स्मार्ट खाएं, अच्छा जीवन जिएं',
    discoverDiabeticFriendlyFoods: 'मधुमेह के अनुकूल खाद्य पदार्थ खोजें',
    scanFoodForHealth: 'मधुमेह स्वास्थ्य अंतर्दृष्टि के लिए खाना स्कैन करें',
    takePhotoOrSearch: 'व्यक्तिगत सिफारिशें प्राप्त करने के लिए अपने खाने की फोटो लें या नाम से खोजें',
    diabetesFriendlyScanner: 'मधुमेह-अनुकूल खाद्य स्कैनर',
    makeInformedChoices: 'सूचित खाद्य विकल्प बनाएं',
    noScansYet: 'अभी तक कोई स्कैन नहीं',
    scanFirstFood: 'व्यक्तिगत मधुमेह स्वास्थ्य सिफारिशें प्राप्त करने के लिए अपना पहला खाद्य आइटम स्कैन करें।',
    noScanHistory: 'कोई स्कैन इतिहास नहीं',
    analyzingFood: 'आपके खाने का विश्लेषण हो रहा है...',
    loadingAnalysis: 'खाद्य विश्लेषण लोड हो रहा है...',
    glycemicIndex: 'ग्लाइसेमिक इंडेक्स',
    nutritionFacts: 'पोषण तथ्य (प्रति 100ग्राम)',
    carbs: 'कार्ब्स',
    fiber: 'फाइबर',
    protein: 'प्रोटीन',
    fat: 'वसा',
    sugar: 'शुगर',
    calories: 'कैलोरी',
    netCarbs: 'नेट कार्ब्स:',
    sugarImpact: 'शुगर प्रभाव:',
    low: 'कम',
    moderate: 'मध्यम',
    high: 'उच्च',
    goodChoice: 'अच्छा विकल्प',
    consumeInModeration: 'संयम में उपभोग करें',
    limitConsumption: 'उपभोग सीमित करें',
    why: 'क्यों?',
    tips: 'सुझाव:',
    betterAlternatives: 'बेहतर विकल्प',
    similarFoods: 'समान खाद्य पदार्थ',
    newScan: 'नया स्कैन',
    reanalyze: 'पुनः विश्लेषण',
    category: 'श्रेणी',
    aiPowered: 'एआई संचालित',
    disclaimer: 'अस्वीकरण',
    aboutDiabetScan: 'ग्लाइको एआई के बारे में',
    aboutText: 'ग्लाइको एआई मधुमेह वाले लोगों को ग्लाइसेमिक इंडेक्स और शुगर सामग्री के आधार पर पोषण संबंधी जानकारी और व्यक्तिगत सिफारिशें प्रदान करके सूचित खाद्य विकल्प बनाने में मदद करता है।',
    version: 'संस्करण 1.0.0',
    aiPoweredAnalysis: 'एआई-संचालित विश्लेषण',
    aiInfoText: 'यह ऐप खाद्य छवियों का विश्लेषण करने और पोषण संबंधी जानकारी प्रदान करने के लिए Google के Gemini 1.5 Flash AI मॉडल का उपयोग करता है। API कुंजी ऐप में सुरक्षित रूप से एकीकृत है।',
    appSettings: 'ऐप सेटिंग्स',
    saveScanHistory: 'स्कैन इतिहास सहेजें',
    notifications: 'सूचनाएं',
    darkMode: 'डार्क मोड',
    language: 'भाषा',
    dataManagement: 'डेटा प्रबंधन',
    clearScanHistory: 'स्कैन इतिहास साफ़ करें',
    clearHistoryConfirm: 'क्या आप वाकई सभी स्कैन इतिहास साफ़ करना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।',
    cancel: 'रद्द करें',
    clear: 'साफ़ करें',
    success: 'सफलता',
    historyCleared: 'स्कैन इतिहास सफलतापूर्वक साफ़ किया गया',
    analyzeWithAI: 'एआई के साथ विश्लेषण करें',
    analyzing: 'विश्लेषण हो रहा है...',
    noFoodsFound: 'डेटाबेस में कोई खाद्य पदार्थ नहीं मिला',
    enterFoodName: 'खाने का नाम दर्ज करें',
    analyzeAnyFood: 'एआई के साथ किसी भी खाद्य पदार्थ का विश्लेषण करें:',
    searchDatabase: 'डेटाबेस खोजें (जैसे, सेब, चावल)',
    orSearchDatabase: 'या हमारे डेटाबेस में खोजें',
    type2CharsToSearch: 'हमारे डेटाबेस में खोजने के लिए कम से कम 2 अक्षर टाइप करें',
    foodNotFound: 'खाद्य पदार्थ नहीं मिला',
    tryAgain: 'हम आपके द्वारा खोजे जा रहे खाद्य पदार्थ को नहीं ढूंढ सके। कृपया फिर से स्कैन करने का प्रयास करें।',
    goBack: 'वापस जाएं',
    lowGI: 'कम GI',
    mediumGI: 'मध्यम GI',
    highGI: 'उच्च GI',
    noGI: 'कोई GI नहीं',
    giExplanationLow: 'कम GI वाले खाद्य पदार्थ धीरे-धीरे पचते हैं, जिससे रक्त शर्करा के स्तर में धीमी वृद्धि होती है।',
    giExplanationMedium: 'मध्यम GI वाले खाद्य पदार्थ रक्त शर्करा के स्तर में मध्यम वृद्धि का कारण बनते हैं।',
    giExplanationHigh: 'उच्च GI वाले खाद्य पदार्थ जल्दी पचते हैं, जिससे रक्त शर्करा के स्तर में तेजी से वृद्धि होती है।',
    giExplanationNone: 'इस खाद्य पदार्थ में कोई ग्लाइसेमिक इंडेक्स नहीं है क्योंकि इसमें न्यूनतम या कोई कार्बोहाइड्रेट नहीं है।',
    sugarInfoLow: 'कम शुगर सामग्री आमतौर पर रक्त शर्करा नियंत्रण के लिए बेहतर होती है।',
    sugarInfoModerate: 'मध्यम शुगर सामग्री - पोर्शन नियंत्रण महत्वपूर्ण है।',
    sugarInfoHigh: 'उच्च शुगर सामग्री - सावधानी के साथ और छोटी मात्रा में उपभोग करें।',
    importantForBloodSugar: 'रक्त शर्करा प्रबंधन के लिए महत्वपूर्ण',
    noNutritionData: 'छवि से पोषण डेटा निकाला नहीं जा सका।',
    noNutritionDataMessage: 'पोषण लेबल की एक स्पष्ट फोटो लेने का प्रयास करें या इस खाद्य पदार्थ को नाम से खोजें।',
    understandingFoodDiabetes: 'खाद्य और मधुमेह को समझना',
    whatIsGlycemicIndex: 'ग्लाइसेमिक इंडेक्स क्या है?',
    giDefinition: 'ग्लाइसेमिक इंडेक्स (GI) खाद्य पदार्थों को 0 से 100 के पैमाने पर रैंक करता है, जो इस बात पर आधारित है कि वे कितनी जल्दी रक्त शर्करा के स्तर को बढ़ाते हैं। उच्च GI वाले खाद्य पदार्थ तेजी से पचते हैं और रक्त शर्करा में महत्वपूर्ण उछाल का कारण बनते हैं।',
    sugarContentDiabetes: 'शुगर सामग्री और मधुमेह',
    sugarContentText: 'शुगर सामग्री मधुमेह वाले लोगों के लिए एक महत्वपूर्ण कारक है। प्राकृतिक और जोड़ी गई दोनों शुगर रक्त ग्लूकोज के स्तर को प्रभावित कर सकती हैं, हालांकि वे आपके शरीर को अलग-अलग तरीके से प्रभावित करती हैं:',
    lowSugarDefinition: 'न्यूनतम शुगर सामग्री वाले खाद्य पदार्थ आमतौर पर रक्त ग्लूकोज प्रबंधन के लिए सुरक्षित होते हैं। उदाहरणों में अधिकांश सब्जियां, कुछ डेयरी और प्रोटीन शामिल हैं।',
    moderateSugarDefinition: 'इन खाद्य पदार्थों को संयम में उपभोग किया जाना चाहिए और अवशोषण को धीमा करने के लिए प्रोटीन या वसा के साथ जोड़ा जाना चाहिए। उदाहरणों में कुछ फल और साबुत अनाज शामिल हैं।',
    highSugarDefinition: 'ये खाद्य पदार्थ रक्त शर्करा में तेजी से उछाल का कारण बन सकते हैं और इन्हें सीमित या टाला जाना चाहिए। उदाहरणों में मिठाई, सोडा और कई प्रसंस्कृत खाद्य पदार्थ शामिल हैं।',
    beyondGI: 'GI से परे: और क्या मायने रखता है',
    beyondGIText: 'जबकि GI और शुगर सामग्री महत्वपूर्ण हैं, अन्य कारक भी प्रभावित करते हैं कि खाद्य पदार्थ आपके रक्त शर्करा को कैसे प्रभावित करता है:',
    portionSize: 'पोर्शन का आकार',
    portionSizeText: 'यहां तक कि कम-GI वाले खाद्य पदार्थ भी बड़ी मात्रा में खाए जाने पर रक्त शर्करा को बढ़ा सकते हैं। पोर्शन नियंत्रण आवश्यक है।',
    mealTiming: 'भोजन का समय',
    mealTimingText: 'दिन भर में भोजन को अंतराल देने से स्थिर रक्त शर्करा के स्तर को बनाए रखने में मदद मिलती है।',
    foodCombinations: 'खाद्य संयोजन',
    foodCombinationsText: 'कार्ब्स को प्रोटीन, वसा या फाइबर के साथ जोड़ने से पाचन धीमा होता है और रक्त शर्करा प्रभाव कम होता है।',
    bestPractices: 'मधुमेह खाने के लिए सर्वोत्तम अभ्यास',
    tip1: 'साबुत अनाज, फलियां और गैर-स्टार्ची सब्जियों जैसे उच्च-फाइबर, कम-GI कार्बोहाइड्रेट चुनें।',
    tip2: 'पाचन को धीमा करने और तृप्ति में सुधार के लिए भोजन के साथ दुबला प्रोटीन शामिल करें।',
    tip3: 'भोजन के ग्लाइसेमिक प्रभाव को कम करने के लिए एवोकाडो, नट्स और जैतून के तेल जैसे स्वस्थ वसा जोड़ें।',
    tip4: 'मीठे पेय पदार्थों के बजाय पानी के साथ हाइड्रेटेड रहें।',
    tip5: 'अपने व्यक्तिगत पैटर्न को समझने के लिए विभिन्न खाद्य पदार्थों पर अपनी रक्त शर्करा प्रतिक्रिया की निगरानी करें।',
    tip6: 'कुल कार्ब्स और शुगर सामग्री दोनों पर ध्यान दें। जब संभव हो तो प्रति सर्विंग 5ग्राम से कम शुगर वाले खाद्य पदार्थ चुनें।',
    disclaimerText: 'यह ऐप सामान्य जानकारी प्रदान करता है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। अपनी विशिष्ट आहार संबंधी जरूरतों के बारे में हमेशा अपने स्वास्थ्य सेवा प्रदाता से परामर्श करें।'
  }
};