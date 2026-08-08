import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { Button } from '../../components/DepositButton';
import { TextField } from '../../components/TextField';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.getParent()?.navigate('Main' as never);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => navigation.goBack()} style={styles.back} hitSlop={10}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </Pressable>

          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Join thousands trading on GXT Exchange</Text>

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
              placeholder="Minimum 8 characters"
              icon="lock-closed-outline"
              isPassword
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Pressable style={styles.termsRow} onPress={() => setAgreed((a) => !a)}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Ionicons name="checkmark" size={13} color={colors.textOnBrand} />}
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </Pressable>

          <Button
            label="Create account"
            onPress={handleSignUp}
            loading={loading}
            disabled={!agreed || !email || !password}
            style={{ marginTop: spacing.lg }}
          />

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
          </View>

          <Button
            label="Continue with Google"
            variant="secondary"
            icon={<Ionicons name="logo-google" size={18} color={colors.textPrimary} />}
            onPress={handleSignUp}
          />

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>
              Log in
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
  back: { marginBottom: spacing.lg },
  title: { ...type.display, color: colors.textPrimary, fontWeight: '700' },
  subtitle: { ...type.body, color: colors.textSecondary, marginTop: 6 },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: { backgroundColor: colors.brand, borderColor: colors.brand },
  termsText: { ...type.caption, color: colors.textSecondary, flex: 1, lineHeight: 18 },
  termsLink: { color: colors.brand, fontWeight: '600' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginVertical: spacing.lg },
  divider: { flex: 1, height: 1, backgroundColor: colors.divider },
  dividerText: { ...type.caption, color: colors.textTertiary },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl },
  signupText: { ...type.body, color: colors.textSecondary },
  signupLink: { ...type.bodyMedium, color: colors.brand, fontWeight: '700' },
});
