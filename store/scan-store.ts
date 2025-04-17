import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodItem } from '@/mocks/food-database';
import { Platform } from 'react-native';

interface ScanHistory {
  id: string;
  foodId: string;
  foodName: string;
  timestamp: number;
  // Don't store imageUri in persisted state
}

// Separate interface for runtime state that includes image URIs
interface RuntimeScanHistory extends ScanHistory {
  imageUri?: string;
}

// Split the store into persisted and non-persisted parts
interface PersistedState {
  history: ScanHistory[]; // Doesn't include image URIs
}

interface RuntimeState {
  recentScans: RuntimeScanHistory[]; // Includes image URIs but not persisted
  currentScan: {
    isScanning: boolean;
    imageUri?: string;
    result?: FoodItem | null;
  };
  
  // Actions
  startScan: (imageUri: string) => void;
  setScanResult: (result: FoodItem | null) => void;
  finishScan: () => void;
  clearCurrentScan: () => void;
  addToHistory: (scan: RuntimeScanHistory) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
}

// Combine both state types
type ScanState = PersistedState & RuntimeState;

// Create a smaller history limit for web
const HISTORY_LIMIT = Platform.OS === 'web' ? 5 : 20;
const RECENT_SCANS_LIMIT = Platform.OS === 'web' ? 2 : 5;

// Create the store with error handling for persistence
export const useScanStore = create<ScanState>()(
  persist(
    (set, get) => ({
      // Persisted state
      history: [],
      
      // Runtime state (not persisted)
      recentScans: [],
      currentScan: {
        isScanning: false,
        imageUri: undefined,
        result: null,
      },
      
      startScan: (imageUri: string) => set({
        currentScan: {
          isScanning: true,
          imageUri,
          result: null,
        }
      }),
      
      setScanResult: (result: FoodItem | null) => set({
        currentScan: {
          ...get().currentScan,
          isScanning: false,
          result,
        }
      }),
      
      finishScan: () => {
        const { currentScan } = get();
        if (currentScan.result) {
          try {
            const newScan: RuntimeScanHistory = {
              id: Date.now().toString(),
              foodId: currentScan.result.id,
              foodName: currentScan.result.name,
              timestamp: Date.now(),
              imageUri: currentScan.imageUri,
            };
            
            get().addToHistory(newScan);
          } catch (error) {
            console.error('Error saving scan to history:', error);
            // Continue without saving to history if there's an error
          }
        }
      },
      
      clearCurrentScan: () => set({
        currentScan: {
          isScanning: false,
          imageUri: undefined,
          result: null,
        }
      }),
      
      addToHistory: (scan: RuntimeScanHistory) => set((state) => {
        try {
          // For persistence, store a version without the imageUri
          const persistedScan: ScanHistory = {
            id: scan.id,
            foodId: scan.foodId,
            foodName: scan.foodName,
            timestamp: scan.timestamp,
          };
          
          const newHistory = [persistedScan, ...state.history].slice(0, HISTORY_LIMIT);
          const newRecentScans = [scan, ...state.recentScans].slice(0, RECENT_SCANS_LIMIT);
          
          return {
            history: newHistory,
            recentScans: newRecentScans,
          };
        } catch (error) {
          console.error('Error adding to history:', error);
          // Return unchanged state if there's an error
          return state;
        }
      }),
      
      removeFromHistory: (id: string) => set((state) => ({
        history: state.history.filter(scan => scan.id !== id),
        recentScans: state.recentScans.filter(scan => scan.id !== id),
      })),
      
      clearHistory: () => set({
        history: [],
        recentScans: [],
      }),
    }),
    {
      name: 'scan-storage',
      storage: createJSONStorage(() => ({
        // Custom storage with error handling
        getItem: async (name) => {
          try {
            const value = await AsyncStorage.getItem(name);
            return value ? JSON.parse(value) : null;
          } catch (error) {
            console.error('Error reading from storage:', error);
            return null;
          }
        },
        setItem: async (name, value) => {
          try {
            // For web, we need to be careful about storage limits
            if (Platform.OS === 'web') {
              // Stringify the value first to check its size
              const jsonValue = JSON.stringify(value);
              // If it's too large, only store a subset of the history
              if (jsonValue.length > 100000) { // ~100KB limit
                const reducedValue = {
                  ...value,
                  history: (value as any).history?.slice(0, 5) || [] // Only keep the 5 most recent items
                };
                await AsyncStorage.setItem(name, JSON.stringify(reducedValue));
                return;
              }
            }
            await AsyncStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error('Error writing to storage:', error);
            // Try to save with a reduced dataset if we hit a quota error
            try {
              const reducedValue = {
                history: [] // Reset history if we can't save
              };
              await AsyncStorage.setItem(name, JSON.stringify(reducedValue));
            } catch (fallbackError) {
              // If even that fails, just log the error
              console.error('Failed to save even with reduced data:', fallbackError);
            }
          }
        },
        removeItem: async (name) => {
          try {
            await AsyncStorage.removeItem(name);
          } catch (error) {
            console.error('Error removing from storage:', error);
          }
        }
      })),
      // Only persist the history array, not the entire state
      partialize: (state) => ({ history: state.history }),
    }
  )
);