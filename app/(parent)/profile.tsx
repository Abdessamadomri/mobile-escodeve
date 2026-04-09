import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';

export default function ParentProfileScreen() {
  const { user, parentProfile, logout } = useAuth();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.prenom?.[0]}{user?.nom?.[0]}</Text>
        </View>
        <Text style={styles.name}>{user?.prenom} {user?.nom}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>👨👩👧 Parent</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations personnelles</Text>
        <Row icon="✉️" label="Email" value={user?.email ?? '—'} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mes enfants ({parentProfile?.totalChildren ?? 0})</Text>
        {parentProfile?.students.map((child) => (
          <View key={child.id} style={styles.childCard}>
            <View style={styles.childAvatar}>
              <Text style={styles.childAvatarText}>{child.prenom?.[0]}{child.nom?.[0]}</Text>
            </View>
            <View style={styles.childInfo}>
              <Text style={styles.childName}>{child.prenom} {child.nom}</Text>
              <Text style={styles.childMeta}>{child.level.name} · {child.group.name}</Text>
              <Text style={styles.childMeta}>CNE : {child.cne}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: child.isActive ? colors.successLight : colors.dangerLight }]}>
              <Text style={[styles.statusText, { color: child.isActive ? colors.success : colors.danger }]}>
                {child.isActive ? 'Actif' : 'Inactif'}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.8}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Row({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowIcon}>{icon}</Text>
      <View style={styles.rowContent}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: colors.background },
  container: { padding: 20, gap: 16, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', gap: 8, paddingVertical: 16 },
  avatar: { width: 80, height: 80, borderRadius: 24, backgroundColor: colors.primaryDark, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 28, fontWeight: '800', color: '#fff' },
  name: { fontSize: 22, fontWeight: '800', color: colors.text },
  roleBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  roleText: { fontSize: 13, color: colors.warning, fontWeight: '600' },
  section: { backgroundColor: colors.card, borderRadius: 20, padding: 16, gap: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { fontSize: 18, width: 28, textAlign: 'center' },
  rowContent: { flex: 1 },
  rowLabel: { fontSize: 11, color: colors.textMuted, marginBottom: 1 },
  rowValue: { fontSize: 14, fontWeight: '600', color: colors.text },
  childCard: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  childAvatar: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.primaryLight, justifyContent: 'center', alignItems: 'center' },
  childAvatarText: { fontSize: 16, fontWeight: '800', color: colors.primary },
  childInfo: { flex: 1 },
  childName: { fontSize: 14, fontWeight: '700', color: colors.text },
  childMeta: { fontSize: 12, color: colors.textMuted },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusText: { fontSize: 11, fontWeight: '700' },
  logoutBtn: { backgroundColor: colors.dangerLight, borderRadius: 16, padding: 16, alignItems: 'center' },
  logoutText: { color: colors.danger, fontWeight: '700', fontSize: 15 },
});
