import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { studentService } from '@/services/student.service';
import { colors } from '@/constants/colors';
import type { Attendance } from '@/types';

const STATUS: Record<Attendance['status'], { color: string; bg: string; label: string; icon: string }> = {
  PRESENT: { color: colors.success, bg: colors.successLight, label: 'Présent', icon: '✅' },
  ABSENT:  { color: colors.danger,  bg: colors.dangerLight,  label: 'Absent',  icon: '❌' },
  LATE:    { color: colors.warning, bg: colors.warningLight, label: 'Retard',  icon: '⏰' },
};

export default function StudentAttendanceScreen() {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService.getAttendance()
      .then((res) => setRecords(Array.isArray(res) ? res : (res as any).data ?? []))
      .catch((e) => Alert.alert('Erreur', e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <FlatList
      data={records}
      keyExtractor={(item) => item.id}
      style={styles.scroll}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyIcon}>✅</Text><Text style={styles.emptyText}>Aucune présence enregistrée</Text></View>}
      renderItem={({ item }) => {
        const s = STATUS[item.status];
        return (
          <View style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: s.bg }]}>
              <Text style={styles.icon}>{s.icon}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.date}>{item.date}</Text>
              {item.justification && <Text style={styles.just}>📎 {item.justification}</Text>}
            </View>
            <View style={[styles.badge, { backgroundColor: s.bg }]}>
              <Text style={[styles.badgeText, { color: s.color }]}>{s.label}</Text>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  list: { padding: 16, gap: 10 },
  empty: { alignItems: 'center', paddingTop: 80, gap: 8 },
  emptyIcon: { fontSize: 40 },
  emptyText: { color: colors.textMuted, fontSize: 15 },
  card: { backgroundColor: colors.card, borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  iconBox: { width: 46, height: 46, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 20 },
  info: { flex: 1, gap: 2 },
  subject: { fontSize: 15, fontWeight: '700', color: colors.text },
  date: { fontSize: 12, color: colors.textMuted },
  just: { fontSize: 12, color: colors.textSecondary, fontStyle: 'italic' },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  badgeText: { fontSize: 12, fontWeight: '700' },
});
