import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii, spacing } from '../../theme/colors';
import { BackHeader } from '../../components/BackHeader';
import { inviteData } from '../../data/liveAppMockData';

interface Props {
  navigation: { goBack: () => void };
}

export const InviteScreen: React.FC<Props> = ({ navigation }) => {
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BackHeader title="Invite friends" onBack={navigation.goBack} icon="gift-outline" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#123542', '#0A0A0A']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="gift" size={26} color={colors.brand} />
          </View>
          <Text style={styles.heroTitle}>
            Receive 10% commission + 1 <Text style={{ color: colors.brand }}>$GXT</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Get a 10% lifetime commission from every invitee's mining, trading and quest rewards.
          </Text>
        </LinearGradient>

        <View style={styles.card}>
          <Text style={styles.label}>Your invite code</Text>
          <View style={styles.codeRow}>
            <Text style={styles.codeText}>{inviteData.code}</Text>
            <Pressable
              style={styles.copyBtn}
              onPress={() => {
                setCodeCopied(true);
                setTimeout(() => setCodeCopied(false), 1500);
              }}
            >
              <Text style={styles.copyBtnText}>{codeCopied ? 'Copied' : 'Copy'}</Text>
            </Pressable>
          </View>

          <Text style={[styles.label, { marginTop: spacing.md }]}>Invite link</Text>
          <View style={styles.linkRow}>
            <Text style={styles.linkText} numberOfLines={1}>
              {inviteData.link.replace('https://', '')}
            </Text>
            <Pressable
              onPress={() => {
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 1500);
              }}
              hitSlop={8}
            >
              <Ionicons name={linkCopied ? 'checkmark' : 'copy-outline'} size={17} color={colors.textSecondary} />
            </Pressable>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatCell icon="people-outline" label="Total invited" value={inviteData.totalInvited} />
          <StatCell icon="checkmark-circle-outline" label="Qualified" value={inviteData.qualified} />
          <StatCell icon="link-outline" label="Claims" value={inviteData.claims} />
          <StatCell icon="gift-outline" label="credited (GXT)" value={inviteData.creditedGxt} valueColor={colors.positive} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StatCell: React.FC<{ icon: keyof typeof Ionicons.glyphMap; label: string; value: number; valueColor?: string }> = ({
  icon,
  label,
  value,
  valueColor,
}) => (
  <View style={styles.statCell}>
    <Ionicons name={icon} size={17} color={colors.brand} />
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={[styles.statValue, valueColor && { color: valueColor }]}>
      {Number.isInteger(value) ? value : value.toFixed(4)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 100, gap: spacing.md },
  hero: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.lg,
    alignItems: 'center',
  },
  heroIconWrap: { marginBottom: spacing.sm },
  heroTitle: { fontSize: 19, fontWeight: '800', color: colors.textPrimary, textAlign: 'center', lineHeight: 26 },
  heroSubtitle: { fontSize: 12.5, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs, lineHeight: 18 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
  },
  label: { fontSize: 12.5, color: colors.textTertiary },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  codeText: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, letterSpacing: 1 },
  copyBtn: { backgroundColor: colors.brand, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: 9 },
  copyBtnText: { fontSize: 13, fontWeight: '800', color: colors.black },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    marginTop: 6,
    gap: spacing.xs,
  },
  linkText: { flex: 1, fontSize: 12.5, color: colors.textSecondary },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  statCell: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: 6,
  },
  statLabel: { fontSize: 12, color: colors.textTertiary },
  statValue: { fontSize: 17, fontWeight: '800', color: colors.textPrimary },
});
