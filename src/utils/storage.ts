import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_STORAGE_KEY = 'holland-casino-padel-connect';

export async function readStorage<T>(fallback: T): Promise<T> {
  try {
    const value = await AsyncStorage.getItem(APP_STORAGE_KEY);
    if (!value) {
      return fallback;
    }
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export async function writeStorage<T>(value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(value));
  } catch {}
}
