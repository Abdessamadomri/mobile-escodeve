import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';

export default function StudentProfileScreen() {
  const { user, studentProfile, logout } = useAuth();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.prenom?.[0]}{user?.nom?.[0]}</Text>
        </View>
        <Text style={styles.name}>{user?.prenom} {user?.nom}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>🎓 Étudiant</Text>
        </View>
      </View>

      {/* Infos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations personnelles</Text>
        <Row icon="✉️" label="Email" value={user?.email ?? '—'} />
        <Row icon="🪪" label="CNE" value={studentProfile?.cne ?? '—'} />
        <Row icon="🎂" label="Date de naissance" value={studentProfile?.dateOfBirth ?? '—'} />
        <Row icon="📅" label="Âge" value={studentProfile?.age ? `${studentProfile.age} ans` : '—'} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scolarité</Text>
        <Row icon="📚" label="Niveau" value={studentProfile?.level?.name ?? '—'} />
        <Row icon="👥" label="Groupe" value={studentProfile?.group?.name ?? '—'} />
        <Row icon="🏫" label="Section" value={studentProfile?.group?.section ?? '—'} />
        <Row icon="🔄" label="Cycle" value={studentProfile?.level?.cycle ?? '—'} />
      </View>

      {studentProfile?.parent && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parent / Tuteur</Text>
          <Row icon="👤" label="Nom" value={`${studentProfile.parent.prenom} ${studentProfile.parent.nom}`} />
          <Row icon="📞" label="Téléphone" value={studentProfile.parent.phone} />
        </View>
      )}

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
  avatar: { width: 80, height: 80, borderRadius: 24, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 28, fontWeight: '800', color: '#fff' },
  name: { fontSize: 22, fontWeight: '800', color: colors.text },
  roleBadge: { backgroundColor: colors.primaryLight, paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  roleText: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  section: { backgroundColor: colors.card, borderRadius: 20, padding: 16, gap: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { fontSize: 18, width: 28, textAlign: 'center' },
  rowContent: { flex: 1 },
  rowLabel: { fontSize: 11, color: colors.textMuted, marginBottom: 1 },
  rowValue: { fontSize: 14, fontWeight: '600', color: colors.text },
  logoutBtn: { backgroundColor: colors.dangerLight, borderRadius: 16, padding: 16, alignItems: 'center' },
  logoutText: { color: colors.danger, fontWeight: '700', fontSize: 15 },
});
