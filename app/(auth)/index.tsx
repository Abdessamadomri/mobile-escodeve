import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';

export default function RoleSelectScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.appName}>EscoSchool</Text>
        <Text style={styles.tagline}>Votre espace scolaire numérique</Text>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.question}>Qui êtes-vous ?</Text>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/(auth)/student-login')} activeOpacity={0.85}>
          <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
            <Text style={styles.iconText}>🎓</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Étudiant</Text>
            <Text style={styles.cardSub}>Notes · Devoirs · Planning</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/(auth)/parent-login')} activeOpacity={0.85}>
          <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
            <Text style={styles.iconText}>👨‍👩‍👧</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Parent</Text>
            <Text style={styles.cardSub}>Suivi · Présences · Résultats</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  top: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8, paddingTop: 40 },
  logo: { width: 100, height: 100 },
  appName: { fontSize: 28, fontWeight: '800', color: colors.text, letterSpacing: -0.5 },
  tagline: { fontSize: 14, color: colors.textMuted },
  bottom: { padding: 24, gap: 14, paddingBottom: 48 },
  question: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 4 },
  card: { backgroundColor: colors.card, borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 3 },
  iconBox: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  iconText: { fontSize: 24 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  cardSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  arrow: { fontSize: 22, color: colors.primary, fontWeight: '700' },
});
