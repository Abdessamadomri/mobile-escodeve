import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';

const SHORTCUTS = [
  { icon: '📅', label: 'Planning', sub: 'Emploi du temps', route: '/(student)/schedule', bg: colors.primaryLight, accent: colors.primary },
  { icon: '📊', label: 'Notes', sub: 'Mes résultats', route: '/(student)/grades', bg: '#D1FAE5', accent: colors.success },
  { icon: '📝', label: 'Devoirs', sub: 'À rendre', route: '/(student)/homework', bg: '#FEF3C7', accent: colors.warning },
  { icon: '✅', label: 'Présences', sub: 'Suivi absences', route: '/(student)/attendance', bg: '#FEE2E2', accent: colors.danger },
];

export default function StudentDashboard() {
  const { user, studentProfile } = useAuth();
  const router = useRouter();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroLeft}>
          <Text style={styles.heroGreeting}>Bonjour 👋</Text>
          <Text style={styles.heroName}>{user?.prenom} {user?.nom}</Text>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>{studentProfile?.level?.name} · {studentProfile?.group?.name}</Text>
          </View>
        </View>
        <Image source={require('@/assets/images/logo.png')} style={styles.heroLogo} resizeMode="contain" />
      </View>

      {/* Shortcuts */}
      <Text style={styles.sectionTitle}>Accès rapide</Text>
      <View style={styles.grid}>
        {SHORTCUTS.map((item) => (
          <TouchableOpacity key={item.label} style={styles.shortcut} onPress={() => router.push(item.route as any)} activeOpacity={0.8}>
            <View style={[styles.shortcutIcon, { backgroundColor: item.bg }]}>
              <Text style={styles.shortcutEmoji}>{item.icon}</Text>
            </View>
            <Text style={styles.shortcutLabel}>{item.label}</Text>
            <Text style={styles.shortcutSub}>{item.sub}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: colors.background },
  container: { padding: 20, gap: 16, paddingBottom: 32 },
  hero: { backgroundColor: colors.card, borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 3 },
  heroLeft: { gap: 4 },
  heroGreeting: { fontSize: 14, color: colors.textMuted },
  heroName: { fontSize: 22, fontWeight: '800', color: colors.text },
  heroBadge: { backgroundColor: colors.primaryLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start', marginTop: 4 },
  heroBadgeText: { fontSize: 12, color: colors.primary, fontWeight: '600' },
  heroLogo: { width: 60, height: 60 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  shortcut: { width: '47%', backgroundColor: colors.card, borderRadius: 20, padding: 16, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  shortcutIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  shortcutEmoji: { fontSize: 22 },
  shortcutLabel: { fontSize: 15, fontWeight: '700', color: colors.text },
  shortcutSub: { fontSize: 11, color: colors.textMuted },
});
