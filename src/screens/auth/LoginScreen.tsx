import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { Button } from '../../components/Button';
import { TextField } from '../../components/TextField';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.getParent()?.navigate('Main' as never);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.brandRow}>
            <Image source={require('../../../assets/icon.png')} style={styles.logo} resizeMode="contain" />
          </View>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Log in to continue trading on GXT Exchange</Text>

          <View style={{ marginTop: spacing.xl }}>
            <TextField
              label="Email address"
              placeholder="you@example.com"
              icon="mail-outline"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextField
              label="Password"
              placeholder="••••••••"
              icon="lock-closed-outline"
              isPassword
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Text style={styles.forgot}>Forgot password?</Text>

          <Button label="Log in" onPress={handleLogin} loading={loading} style={{ marginTop: spacing.sm }} />

          <View style={styles.faceIdRow}>
            <View style={styles.faceIdBtn}>
              <Ionicons name="scan-outline" size={22} color={colors.brand} />
            </View>
            <Text style={styles.faceIdText}>Use Face ID / Fingerprint</Text>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
          </View>

          <Button
            label="Continue with Google"
            variant="secondary"
            icon={<Ionicons name="logo-google" size={18} color={colors.textPrimary} />}
            onPress={handleLogin}
          />

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
              Sign up
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xxl },
  brandRow: { alignItems: 'center', marginBottom: spacing.lg },
  logo: { width: 56, height: 56 },
  title: { ...type.display, color: colors.textPrimary, fontWeight: '700' },
  subtitle: { ...type.body, color: colors.textSecondary, marginTop: 6 },
  forgot: {
    ...type.caption,
    color: colors.brand,
    textAlign: 'right',
    marginBottom: spacing.lg,
    fontWeight: '600',
  },
  faceIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  faceIdBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.brandGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceIdText: { ...type.bodyMedium, color: colors.textSecondary, fontWeight: '600' },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginVertical: spacing.lg,
  },
  divider: { flex: 1, height: 1, backgroundColor: colors.divider },
  dividerText: { ...type.caption, color: colors.textTertiary },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  signupText: { ...type.body, color: colors.textSecondary },
  signupLink: { ...type.bodyMedium, color: colors.brand, fontWeight: '700' },
});
