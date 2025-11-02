// Firestore service for flashcard data (ratings and mastered cards)
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from './config.js';

/**
 * Get user's flashcard data document reference
 */
const getUserFlashcardDocRef = (userId) => {
  return doc(db, 'users', userId, 'study_data', 'flashcards');
};

/**
 * Save card ratings to Firestore
 * @param {string} userId - User ID
 * @param {Map<number, {flip2: number, flip3: number}>} cardRatings - Map of card ratings
 */
export const saveCardRatings = async (userId, cardRatings) => {
  try {
    const docRef = getUserFlashcardDocRef(userId);

    // Convert Map to object for Firestore
    const ratingsObj = {};
    cardRatings.forEach((value, key) => {
      ratingsObj[key] = value;
    });

    await setDoc(docRef, {
      ratings: ratingsObj,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return { error: null };
  } catch (error) {
    console.error('Error saving card ratings:', error);
    return { error };
  }
};

/**
 * Save mastered cards to Firestore
 * @param {string} userId - User ID
 * @param {Set<number>} masteredCards - Set of mastered card IDs
 */
export const saveMasteredCards = async (userId, masteredCards) => {
  try {
    const docRef = getUserFlashcardDocRef(userId);

    // Convert Set to array for Firestore
    const masteredArray = Array.from(masteredCards);

    await setDoc(docRef, {
      mastered: masteredArray,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return { error: null };
  } catch (error) {
    console.error('Error saving mastered cards:', error);
    return { error };
  }
};

/**
 * Get user's flashcard data from Firestore
 * @param {string} userId - User ID
 */
export const getFlashcardData = async (userId) => {
  try {
    const docRef = getUserFlashcardDocRef(userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Convert ratings object to Map
      const ratingsMap = new Map();
      if (data.ratings) {
        Object.entries(data.ratings).forEach(([key, value]) => {
          ratingsMap.set(parseInt(key), value);
        });
      }

      // Convert mastered array to Set
      const masteredSet = new Set(data.mastered || []);

      return {
        ratings: ratingsMap,
        mastered: masteredSet,
        error: null
      };
    } else {
      // Return empty data if document doesn't exist
      return {
        ratings: new Map(),
        mastered: new Set(),
        error: null
      };
    }
  } catch (error) {
    console.error('Error getting flashcard data:', error);
    return {
      ratings: new Map(),
      mastered: new Set(),
      error
    };
  }
};

/**
 * Listen to real-time updates of user's flashcard data
 * @param {string} userId - User ID
 * @param {Function} callback - Callback function to handle updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToFlashcardData = (userId, callback) => {
  const docRef = getUserFlashcardDocRef(userId);

  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();

      // Convert ratings object to Map
      const ratingsMap = new Map();
      if (data.ratings) {
        Object.entries(data.ratings).forEach(([key, value]) => {
          ratingsMap.set(parseInt(key), value);
        });
      }

      // Convert mastered array to Set
      const masteredSet = new Set(data.mastered || []);

      callback({
        ratings: ratingsMap,
        mastered: masteredSet
      });
    } else {
      callback({
        ratings: new Map(),
        mastered: new Set()
      });
    }
  }, (error) => {
    console.error('Error subscribing to flashcard data:', error);
  });
};
