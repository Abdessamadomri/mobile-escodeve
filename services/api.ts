import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const BASE_URL = 'https://students-worker.abde-school.workers.dev';
const TOKEN_KEY = 'auth_token';

export const tokenStorage = {
  get: () =>
    Platform.OS === 'web'
      ? Promise.resolve(localStorage.getItem(TOKEN_KEY))
      : SecureStore.getItemAsync(TOKEN_KEY),
  set: (token: string) =>
    Platform.OS === 'web'
      ? Promise.resolve(localStorage.setItem(TOKEN_KEY, token))
      : SecureStore.setItemAsync(TOKEN_KEY, token),
  remove: () =>
    Platform.OS === 'web'
      ? Promise.resolve(localStorage.removeItem(TOKEN_KEY))
      : SecureStore.deleteItemAsync(TOKEN_KEY),
};

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await tokenStorage.get();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? 'Erreur serveur');
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
};
