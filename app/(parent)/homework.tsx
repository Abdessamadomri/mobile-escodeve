import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { parentService } from '@/services/parent.service';
import { colors } from '@/constants/colors';
import type { Homework } from '@/types';

export default function ParentHomeworkScreen() {
  const { parentProfile } = useAuth();
  const [homework, setHomework] = useState<Homework[]>([]);
  const [loading, setLoading] = useState(true);
  const childId = parentProfile?.students[0]?.id ?? '';

  useEffect(() => {
    if (!childId) return;
    parentService.getChildHomework(childId)
      .then((res) => setHomework(Array.isArray(res) ? res : (res as any).data ?? []))
      .catch((e) => Alert.alert('Erreur', e.message))
      .finally(() => setLoading(false));
  }, [childId]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <FlatList
      data={homework}
      keyExtractor={(item) => item.id}
      style={styles.scroll}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyIcon}>📝</Text><Text style={styles.emptyText}>Aucun devoir disponible</Text></View>}
      renderItem={({ item }) => (
        <View style={[styles.card, item.isCompleted && styles.done]}>
          <View style={styles.cardTop}>
            <View style={styles.subjectBadge}>
              <Text style={styles.subjectText}>{item.subject}</Text>
            </View>
            <View style={styles.dueBadge}>
              <Text style={styles.dueText}>📅 {item.dueDate}</Text>
            </View>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
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
  card: { backgroundColor: colors.card, borderRadius: 18, padding: 16, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  done: { opacity: 0.6 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subjectBadge: { backgroundColor: colors.primaryLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  subjectText: { fontSize: 12, fontWeight: '700', color: colors.primary },
  dueBadge: { backgroundColor: colors.warningLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  dueText: { fontSize: 11, color: colors.warning, fontWeight: '600' },
  title: { fontSize: 15, fontWeight: '700', color: colors.text },
  desc: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
});
