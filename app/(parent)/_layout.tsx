import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

export default function ParentLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
      tabBarStyle: { backgroundColor: colors.primary, borderTopWidth: 0, height: 64, paddingBottom: 10, paddingTop: 6 },
      tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
      headerStyle: { backgroundColor: colors.card },
      headerTintColor: colors.text,
      headerTitleStyle: { fontWeight: '700', fontSize: 18 },
      headerShadowVisible: false,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Accueil', tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="schedule" options={{ title: 'Planning', tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="grades" options={{ title: 'Notes', tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="homework" options={{ title: 'Devoirs', tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="attendance" options={{ title: 'Présences', tabBarIcon: ({ color, size }) => <Ionicons name="checkmark-circle-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil', tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
    </Tabs>
  );
}
