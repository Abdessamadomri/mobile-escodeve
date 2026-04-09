import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { colors } from '@/constants/colors';

export default function StudentLoginScreen() {
  const { loginStudent } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    setLoading(true);
    try {
      await loginStudent({ email, password });
    } catch (e: any) {
      Alert.alert('Connexion échouée', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <View style={styles.header}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Connexion</Text>
          <Text style={styles.subtitle}>Espace Étudiant</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Adresse email</Text>
            <TextInput
              style={styles.input}
              placeholder="exemple@ecole.ma"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="••••••••"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                <Text style={styles.eyeText}>{showPass ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnText}>Se connecter</Text>
            }
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 36, gap: 6 },
  logo: { width: 80, height: 80, marginBottom: 8 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 14, color: colors.primary, fontWeight: '600' },
  form: { gap: 18 },
  field: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
  input: { backgroundColor: colors.card, borderRadius: 14, padding: 16, fontSize: 15, color: colors.text, borderWidth: 1.5, borderColor: colors.border },
  passwordRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eyeBtn: { backgroundColor: colors.card, borderRadius: 14, padding: 16, borderWidth: 1.5, borderColor: colors.border },
  eyeText: { fontSize: 16 },
  btn: { backgroundColor: colors.primary, borderRadius: 16, padding: 18, alignItems: 'center', marginTop: 8, shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
});
