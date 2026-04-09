import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';

const SHORTCUTS = [
  { icon: '📅', label: 'Planning', sub: 'Emploi du temps', route: '/(parent)/schedule', bg: colors.primaryLight },
  { icon: '📊', label: 'Notes', sub: 'Résultats scolaires', route: '/(parent)/grades', bg: '#D1FAE5' },
  { icon: '📝', label: 'Devoirs', sub: 'Travaux à rendre', route: '/(parent)/homework', bg: '#FEF3C7' },
  { icon: '✅', label: 'Présences', sub: 'Suivi absences', route: '/(parent)/attendance', bg: '#FEE2E2' },
];

export default function ParentDashboard() {
  const { user, parentProfile } = useAuth();
  const router = useRouter();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.heroLeft}>
          <Text style={styles.heroGreeting}>Bonjour 👋</Text>
          <Text style={styles.heroName}>{user?.prenom} {user?.nom}</Text>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>👨👩👧 {parentProfile?.totalChildren} enfant(s)</Text>
          </View>
        </View>
        <Image source={require('@/assets/images/logo.png')} style={styles.heroLogo} resizeMode="contain" />
      </View>

      {/* Enfants */}
      {parentProfile?.students && parentProfile.students.length > 0 && (
        <View style={styles.childrenCard}>
          <Text style={styles.childrenTitle}>Mes enfants</Text>
          {parentProfile.students.map((child) => (
            <View key={child.id} style={styles.childRow}>
              <View style={styles.childAvatar}>
                <Text style={styles.childAvatarText}>{child.prenom?.[0]}{child.nom?.[0]}</Text>
              </View>
              <View style={styles.childInfo}>
                <Text style={styles.childName}>{child.prenom} {child.nom}</Text>
                <Text style={styles.childMeta}>{child.level.name} · {child.group.name}</Text>
              </View>
              <View style={[styles.dot, { backgroundColor: child.isActive ? colors.success : colors.danger }]} />
            </View>
          ))}
        </View>
      )}

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
  heroBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start', marginTop: 4 },
  heroBadgeText: { fontSize: 12, color: colors.warning, fontWeight: '600' },
  heroLogo: { width: 60, height: 60 },
  childrenCard: { backgroundColor: colors.card, borderRadius: 20, padding: 16, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  childrenTitle: { fontSize: 14, fontWeight: '700', color: colors.textSecondary },
  childRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  childAvatar: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primaryLight, justifyContent: 'center', alignItems: 'center' },
  childAvatarText: { fontSize: 14, fontWeight: '800', color: colors.primary },
  childInfo: { flex: 1 },
  childName: { fontSize: 14, fontWeight: '700', color: colors.text },
  childMeta: { fontSize: 12, color: colors.textMuted },
  dot: { width: 8, height: 8, borderRadius: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  shortcut: { width: '47%', backgroundColor: colors.card, borderRadius: 20, padding: 16, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  shortcutIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  shortcutEmoji: { fontSize: 22 },
  shortcutLabel: { fontSize: 15, fontWeight: '700', color: colors.text },
  shortcutSub: { fontSize: 11, color: colors.textMuted },
});
