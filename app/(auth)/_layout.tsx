import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="student-login" options={{ headerShown: true, title: 'Connexion Étudiant' }} />
      <Stack.Screen name="parent-login" options={{ headerShown: true, title: 'Connexion Parent' }} />
    </Stack>
  );
}
