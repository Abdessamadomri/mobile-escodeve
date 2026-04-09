import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { studentService } from '@/services/student.service';
import { colors } from '@/constants/colors';
import type { FinancialSummary } from '@/types';

const STATUS: Record<string, { color: string; label: string }> = {
  PAID:    { color: colors.success, label: 'Payé' },
  PENDING: { color: colors.warning, label: 'En attente' },
  OVERDUE: { color: colors.danger,  label: 'En retard' },
};

export default function StudentFinanceScreen() {
  const [summary, setSummary] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService.getFinancialSummary()
      .then(setSummary)
      .catch((e) => Alert.alert('Erreur', e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <FlatList
      data={summary?.invoices ?? []}
      keyExtractor={(item) => item.id}
      style={styles.scroll}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        summary ? (
          <LinearGradient colors={['#1C1C1E', '#2E2F39', '#5DAEB3']} style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Résumé financier</Text>
            <Text style={styles.balance}>{summary.balance} MAD</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total dû</Text>
                <Text style={[styles.summaryValue, { color: colors.danger }]}>{summary.totalDue} MAD</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Payé</Text>
                <Text style={[styles.summaryValue, { color: colors.success }]}>{summary.totalPaid} MAD</Text>
              </View>
            </View>
          </LinearGradient>
        ) : null
      }
      renderItem={({ item }) => {
        const s = STATUS[item.status];
        return (
          <LinearGradient colors={['#2E2F39', '#3a3a4a']} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.invoiceTitle}>{item.title}</Text>
              <View style={[styles.badge, { backgroundColor: `${s.color}22`, borderColor: s.color }]}>
                <Text style={[styles.badgeText, { color: s.color }]}>{s.label}</Text>
              </View>
            </View>
            <Text style={styles.amount}>{item.amount} MAD</Text>
            <Text style={styles.meta}>Échéance : {item.dueDate}</Text>
          </LinearGradient>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: '#1C1C1E' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C1C1E' },
  list: { padding: 16, gap: 10 },
  summaryCard: { borderRadius: 20, padding: 24, marginBottom: 8, gap: 8 },
  summaryTitle: { fontSize: 13, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1 },
  balance: { fontSize: 36, fontWeight: '800', color: '#fff' },
  summaryRow: { flexDirection: 'row', gap: 24, marginTop: 4 },
  summaryItem: { gap: 2 },
  summaryLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)' },
  summaryValue: { fontSize: 16, fontWeight: '700' },
  card: { borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(93,174,179,0.2)' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  invoiceTitle: { fontSize: 15, fontWeight: '700', color: '#fff', flex: 1 },
  amount: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  meta: { fontSize: 12, color: 'rgba(255,255,255,0.4)' },
});
