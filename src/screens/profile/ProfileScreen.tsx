import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { type } from '../../theme/typography';
import { Card } from '../../components/Card';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../../navigation/types';
import { useState } from 'react';

type Props = BottomTabScreenProps<MainTabParamList, 'Profile'>;

const menuGroups: {
  title: string;
  items: { key: string; label: string; icon: keyof typeof Ionicons.glyphMap; value?: string }[];
}[] = [
  {
    title: 'Security',
    items: [
      { key: 'password', label: 'Change password', icon: 'key-outline' },
      { key: '2fa', label: 'Two-factor authentication', icon: 'shield-checkmark-outline', value: 'Enabled' },
      { key: 'devices', label: 'Login activity', icon: 'phone-portrait-outline' },
      { key: 'whitelist', label: 'Withdrawal whitelist', icon: 'lock-closed-outline' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { key: 'notifications', label: 'Notifications', icon: 'notifications-outline' },
      { key: 'language', label: 'Language', icon: 'language-outline', value: 'English' },
      { key: 'currency', label: 'Display currency', icon: 'cash-outline', value: 'USD' },
    ],
  },
  {
    title: 'Support',
    items: [
      { key: 'help', label: 'Help center', icon: 'help-circle-outline' },
      { key: 'chat', label: 'Live chat', icon: 'chatbubble-ellipses-outline' },
      { key: 'about', label: 'About GXT Exchange', icon: 'information-circle-outline' },
    ],
  },
];

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [faceId, setFaceId] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JK</Text>
          </View>
          <Text style={styles.name}>Jules Konan</Text>
          <Text style={styles.email}>jules.konan@gmail.com</Text>

          <View style={styles.kycBadge}>
            <Ionicons name="checkmark-circle" size={14} color={colors.positive} />
            <Text style={styles.kycText}>KYC Level 2 verified</Text>
          </View>
        </View>

        <Card style={styles.uidCard}>
          <View>
            <Text style={styles.uidLabel}>UID</Text>
            <Text style={styles.uidValue}>4471 0293 8842</Text>
          </View>
          <Pressable style={styles.copyBtn}>
            <Ionicons name="copy-outline" size={16} color={colors.brand} />
          </Pressable>
        </Card>

        <View style={styles.quickToggles}>
          <Card style={styles.toggleCard}>
            <Ionicons name="finger-print-outline" size={20} color={colors.brand} />
            <Text style={styles.toggleLabel}>Face ID login</Text>
            <Switch
              value={faceId}
              onValueChange={setFaceId}
              trackColor={{ false: colors.surfaceHigh, true: colors.brandDim }}
              thumbColor={faceId ? colors.brand : colors.textTertiary}
            />
          </Card>
          <Card style={styles.toggleCard}>
            <Ionicons name="moon-outline" size={20} color={colors.brand} />
            <Text style={styles.toggleLabel}>Dark mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.surfaceHigh, true: colors.brandDim }}
              thumbColor={darkMode ? colors.brand : colors.textTertiary}
            />
          </Card>
        </View>

        {menuGroups.map((group) => (
          <View key={group.title} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <Card padded={false}>
              {group.items.map((item, i) => (
                <Pressable
                  key={item.key}
                  style={[styles.menuRow, i !== group.items.length - 1 && styles.menuRowBorder]}
                >
                  <View style={styles.menuIconWrap}>
                    <Ionicons name={item.icon} size={18} color={colors.textSecondary} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
                  <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
                </Pressable>
              ))}
            </Card>
          </View>
        ))}

        <Pressable style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={18} color={colors.negative} />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>

        <Text style={styles.version}>GXT Exchange · v1.0.0 (Prototype)</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  profileHeader: { alignItems: 'center', paddingTop: spacing.md, paddingBottom: spacing.md },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.brandGlow,
    borderWidth: 1,
    borderColor: colors.brandDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: { ...type.h1, color: colors.brand, fontWeight: '800' },
  name: { ...type.h2, color: colors.textPrimary, fontWeight: '700' },
  email: { ...type.caption, color: colors.textTertiary, marginTop: 2 },
  kycBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.positiveDim,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radii.pill,
    marginTop: spacing.sm,
  },
  kycText: { ...type.caption, color: colors.positive, fontWeight: '700' },
  uidCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  uidLabel: { ...type.caption, color: colors.textTertiary },
  uidValue: { ...type.bodyMedium, color: colors.textPrimary, fontWeight: '700', marginTop: 2, letterSpacing: 1 },
  copyBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.brandGlow, alignItems: 'center', justifyContent: 'center' },
  quickToggles: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  toggleCard: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: spacing.md },
  toggleLabel: { ...type.caption, color: colors.textSecondary, fontWeight: '600', textAlign: 'center' },
  group: { marginTop: spacing.xl },
  groupTitle: { ...type.caption, color: colors.textTertiary, fontWeight: '700', marginBottom: spacing.xs, textTransform: 'uppercase', letterSpacing: 1 },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.md },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
  menuIconWrap: { width: 30, alignItems: 'center' },
  menuLabel: { ...type.body, color: colors.textPrimary, flex: 1 },
  menuValue: { ...type.caption, color: colors.textTertiary, marginRight: 4 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.xl,
    paddingVertical: spacing.sm,
  },
  logoutText: { ...type.bodyMedium, color: colors.negative, fontWeight: '700' },
  version: { ...type.caption, color: colors.textTertiary, textAlign: 'center', marginTop: spacing.lg },
});
