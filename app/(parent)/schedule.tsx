import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { parentService } from '@/services/parent.service';
import { colors } from '@/constants/colors';
import type { ScheduleSlot } from '@/types';

const DAY_COLORS: Record<string, string> = {
  Lundi: '#E8F5F6', Mardi: '#D1FAE5', Mercredi: '#FEF3C7',
  Jeudi: '#FEE2E2', Vendredi: '#EDE9FE', Samedi: '#FCE7F3',
};

export default function ParentScheduleScreen() {
  const { parentProfile } = useAuth();
  const [slots, setSlots] = useState<ScheduleSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const childId = parentProfile?.students[0]?.id ?? '';

  useEffect(() => {
    if (!childId) return;
    parentService.getChildSchedule(childId)
      .then((res) => setSlots(Array.isArray(res) ? res : (res as any).data ?? []))
      .catch((e) => Alert.alert('Erreur', e.message))
      .finally(() => setLoading(false));
  }, [childId]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <FlatList
      data={slots}
      keyExtractor={(item) => item.id}
      style={styles.scroll}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyIcon}>📅</Text><Text style={styles.emptyText}>Aucun cours cette semaine</Text></View>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={[styles.dayTag, { backgroundColor: DAY_COLORS[item.day] ?? colors.primaryLight }]}>
            <Text style={styles.dayText}>{item.day}</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.meta}>🕐 {item.startTime} – {item.endTime}</Text>
            <Text style={styles.meta}>👤 {item.teacher} · 🚪 Salle {item.room}</Text>
          </View>
          <View style={styles.timePill}>
            <Text style={styles.timePillText}>{item.startTime}</Text>
          </View>
        </View>
      )}
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
  dayTag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  dayText: { fontSize: 11, fontWeight: '700', color: colors.text },
  cardBody: { flex: 1, gap: 3 },
  subject: { fontSize: 15, fontWeight: '700', color: colors.text },
  meta: { fontSize: 12, color: colors.textMuted },
  timePill: { backgroundColor: colors.primaryLight, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  timePillText: { fontSize: 12, fontWeight: '700', color: colors.primary },
});
