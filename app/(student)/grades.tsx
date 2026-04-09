import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { studentService } from '@/services/student.service';
import { colors } from '@/constants/colors';
import type { Grade } from '@/types';

function gradeInfo(value: number, max: number) {
  const pct = value / max;
  if (pct >= 0.75) return { color: colors.success, bg: colors.successLight, label: 'Bien' };
  if (pct >= 0.5)  return { color: colors.warning, bg: colors.warningLight, label: 'Moyen' };
  return { color: colors.danger, bg: colors.dangerLight, label: 'Insuffisant' };
}

export default function StudentGradesScreen() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService.getGrades()
      .then((res) => setGrades(Array.isArray(res) ? res : (res as any).data ?? []))
      .catch((e) => Alert.alert('Erreur', e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <FlatList
      data={grades}
      keyExtractor={(item) => item.id}
      style={styles.scroll}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyIcon}>📊</Text><Text style={styles.emptyText}>Aucune note disponible</Text></View>}
      renderItem={({ item }) => {
        const info = gradeInfo(item.value, item.maxValue);
        return (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.meta}>{item.type} · Coef. {item.coefficient}</Text>
              <Text style={styles.date}>{item.date}</Text>
              {item.comment && <Text style={styles.comment}>💬 {item.comment}</Text>}
            </View>
            <View style={styles.cardRight}>
              <View style={[styles.scoreBadge, { backgroundColor: info.bg }]}>
                <Text style={[styles.scoreValue, { color: info.color }]}>{item.value}</Text>
                <Text style={[styles.scoreMax, { color: info.color }]}>/{item.maxValue}</Text>
              </View>
              <Text style={[styles.scoreLabel, { color: info.color }]}>{info.label}</Text>
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
  card: { backgroundColor: colors.card, borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardLeft: { flex: 1, gap: 3 },
  subject: { fontSize: 15, fontWeight: '700', color: colors.text },
  meta: { fontSize: 12, color: colors.textMuted },
  date: { fontSize: 11, color: colors.textMuted },
  comment: { fontSize: 12, color: colors.textSecondary, fontStyle: 'italic', marginTop: 2 },
  cardRight: { alignItems: 'center', gap: 4 },
  scoreBadge: { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8, flexDirection: 'row', alignItems: 'baseline', gap: 1 },
  scoreValue: { fontSize: 22, fontWeight: '800' },
  scoreMax: { fontSize: 13, fontWeight: '600' },
  scoreLabel: { fontSize: 11, fontWeight: '600' },
});
