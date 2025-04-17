import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Info, AlertTriangle, Utensils, Clock, Activity, Heart } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

export default function EducationScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://source.unsplash.com/featured/?diabetes,education,food' }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Understanding Food & Diabetes</Text>
          </View>
        </View>

        <Text style={[typography.body, styles.intro]}>
          Managing diabetes effectively requires understanding how different foods affect your blood sugar levels. Here's what you need to know:
        </Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Info size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>What is the Glycemic Index?</Text>
          </View>
          <Text style={styles.cardText}>
            The Glycemic Index (GI) ranks foods on a scale from 0 to 100 based on how quickly they raise blood sugar levels. Foods with a high GI are rapidly digested and cause significant blood sugar spikes.
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://source.unsplash.com/featured/?glycemic,index,chart' }}
              style={styles.cardImage}
              contentFit="cover"
            />
          </View>
          <View style={styles.giScale}>
            <View style={styles.giScaleItem}>
              <View style={[styles.giIndicator, { backgroundColor: colors.success }]} />
              <Text style={styles.giLabel}>Low GI (0-55)</Text>
              <Text style={styles.giDescription}>Slow, gradual rise in blood sugar</Text>
            </View>
            <View style={styles.giScaleItem}>
              <View style={[styles.giIndicator, { backgroundColor: colors.warning }]} />
              <Text style={styles.giLabel}>Medium GI (56-69)</Text>
              <Text style={styles.giDescription}>Moderate rise in blood sugar</Text>
            </View>
            <View style={styles.giScaleItem}>
              <View style={[styles.giIndicator, { backgroundColor: colors.danger }]} />
              <Text style={styles.giLabel}>High GI (70-100)</Text>
              <Text style={styles.giDescription}>Rapid rise in blood sugar</Text>
            </View>
          </View>
        </View>

        {/* Added new card about sugar content */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <AlertTriangle size={24} color={colors.secondary} />
            <Text style={styles.cardTitle}>Sugar Content & Diabetes</Text>
          </View>
          <Text style={styles.cardText}>
            Sugar content is a critical factor for people with diabetes. Both natural and added sugars can affect blood glucose levels, though they impact your body differently:
          </Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://source.unsplash.com/featured/?sugar,food' }}
              style={styles.cardImage}
              contentFit="cover"
            />
          </View>
          <View style={styles.factorList}>
            <View style={styles.factor}>
              <View style={[styles.sugarIndicator, { backgroundColor: colors.success }]} />
              <View>
                <Text style={styles.factorTitle}>Low Sugar (0-5g per 100g)</Text>
                <Text style={styles.factorDescription}>
                  Foods with minimal sugar content are generally safer for blood glucose management. Examples include most vegetables, some dairy, and proteins.
                </Text>
              </View>
            </View>
            <View style={styles.factor}>
              <View style={[styles.sugarIndicator, { backgroundColor: colors.warning }]} />
              <View>
                <Text style={styles.factorTitle}>Moderate Sugar (5-10g per 100g)</Text>
                <Text style={styles.factorDescription}>
                  These foods should be consumed in moderation and paired with protein or fat to slow absorption. Examples include some fruits and whole grains.
                </Text>
              </View>
            </View>
            <View style={styles.factor}>
              <View style={[styles.sugarIndicator, { backgroundColor: colors.danger }]} />
              <View>
                <Text style={styles.factorTitle}>High Sugar ({'>'}10g per 100g)</Text>
                <Text style={styles.factorDescription}>
                  These foods can cause rapid blood sugar spikes and should be limited or avoided. Examples include sweets, sodas, and many processed foods.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <AlertTriangle size={24} color={colors.warning} />
            <Text style={styles.cardTitle}>Beyond GI: What Else Matters</Text>
          </View>
          <Text style={styles.cardText}>
            While GI and sugar content are important, other factors also affect how food impacts your blood sugar:
          </Text>
          <View style={styles.factorList}>
            <View style={styles.factor}>
              <Utensils size={20} color={colors.primary} style={styles.factorIcon} />
              <View>
                <Text style={styles.factorTitle}>Portion Size</Text>
                <Text style={styles.factorDescription}>
                  Even low-GI foods can raise blood sugar if eaten in large amounts. Portion control is essential.
                </Text>
              </View>
            </View>
            <View style={styles.factor}>
              <Clock size={20} color={colors.primary} style={styles.factorIcon} />
              <View>
                <Text style={styles.factorTitle}>Meal Timing</Text>
                <Text style={styles.factorDescription}>
                  Spacing meals throughout the day helps maintain stable blood sugar levels.
                </Text>
              </View>
            </View>
            <View style={styles.factor}>
              <Activity size={20} color={colors.primary} style={styles.factorIcon} />
              <View>
                <Text style={styles.factorTitle}>Food Combinations</Text>
                <Text style={styles.factorDescription}>
                  Pairing carbs with protein, fat, or fiber slows digestion and reduces blood sugar impact.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://source.unsplash.com/featured/?healthy,meal,plate' }}
            style={styles.fullWidthImage}
            contentFit="cover"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Heart size={24} color={colors.success} />
            <Text style={styles.cardTitle}>Best Practices for Diabetic Eating</Text>
          </View>
          <View style={styles.tipList}>
            <View style={styles.tip}>
              <Text style={styles.tipNumber}>1</Text>
              <Text style={styles.tipText}>
                Choose high-fiber, low-GI carbohydrates like whole grains, legumes, and non-starchy vegetables.
              </Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipNumber}>2</Text>
              <Text style={styles.tipText}>
                Include lean protein with meals to slow digestion and improve satiety.
              </Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipNumber}>3</Text>
              <Text style={styles.tipText}>
                Add healthy fats like avocados, nuts, and olive oil to reduce the glycemic impact of meals.
              </Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipNumber}>4</Text>
              <Text style={styles.tipText}>
                Stay hydrated with water instead of sugary beverages.
              </Text>
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipNumber}>5</Text>
              <Text style={styles.tipText}>
                Monitor your blood sugar response to different foods to understand your personal patterns.
              </Text>
            </View>
            {/* Added new tip about sugar */}
            <View style={styles.tip}>
              <Text style={styles.tipNumber}>6</Text>
              <Text style={styles.tipText}>
                Pay attention to both total carbs and sugar content. Choose foods with less than 5g of sugar per serving when possible.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            Disclaimer: This app provides general information and is not a substitute for professional medical advice. Always consult with your healthcare provider about your specific dietary needs.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 0,
    paddingBottom: 32,
  },
  heroContainer: {
    position: 'relative',
    height: 180,
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  intro: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 12,
  },
  cardText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  imageContainer: {
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  fullWidthImage: {
    width: '100%',
    height: 200,
  },
  giScale: {
    marginTop: 8,
  },
  giScaleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  giIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  sugarIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
    marginTop: 4,
  },
  giLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    width: 120,
  },
  giDescription: {
    flex: 1,
    fontSize: 14,
    color: colors.textLight,
  },
  factorList: {
    marginTop: 8,
  },
  factor: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  factorIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  factorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  factorDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  tipList: {
    marginTop: 8,
  },
  tip: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    color: colors.card,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  disclaimer: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: colors.warning + '15',
    borderRadius: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 18,
    fontStyle: 'italic',
  },
});