import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { BackHeader } from '../../components/BackHeader';
import { rewardsLastRedeem, rewardsRedeemHistory } from '../../data/liveAppMockData';

interface Props {
  navigation: { goBack: () => void };
}

export const RewardsScreen: React.FC<Props> = ({ navigation }) => {
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BackHeader title="Rewards" onBack={navigation.goBack} icon="gift-outline" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Redeem a reward code</Text>
          <Text style={styles.cardBody}>
            Enter a reward code to instantly claim GXT or USDT to your balance. Each code can be claimed once per
            account.
          </Text>

          <TextInput
            value={code}
            onChangeText={(t) => setCode(t.toUpperCase())}
            placeholder="ENTER CODE"
            placeholderTextColor={colors.textTertiary}
            autoCapitalize="characters"
            style={styles.input}
          />

          <Pressable style={styles.redeemBtn}>
            <Text style={styles.redeemBtnText}>Redeem</Text>
          </Pressable>

          <Text style={styles.confirmation}>{rewardsLastRedeem}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.historyHeader}>
            <View style={styles.historyHeaderLeft}>
              <Ionicons name="time-outline" size={15} color={colors.textSecondary} />
              <Text style={styles.historyTitle}>Redeem history</Text>
            </View>
            <Text style={styles.historyLast}>Last 10</Text>
          </View>

          {rewardsRedeemHistory.map((r, i) => (
            <View key={i} style={[styles.historyRow, i !== rewardsRedeemHistory.length - 1 && styles.historyRowBorder]}>
              <Ionicons name="checkmark-circle" size={18} color={colors.positive} />
              <View style={{ flex: 1 }}>
                <Text style={styles.historyCode}>{r.code}</Text>
                <Text style={styles.historyDate}>
                  {r.date} {r.time}
                </Text>
              </View>
              <Text style={styles.historyAmount}>{r.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 100, gap: spacing.md },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary },
  cardBody: { fontSize: 12.5, color: colors.textSecondary, lineHeight: 18, marginTop: 6 },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    marginTop: spacing.md,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 2,
  },
  redeemBtn: {
    backgroundColor: colors.brandMuted,
    borderRadius: radii.pill,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: spacing.sm,
  },
  redeemBtnText: { fontSize: 15, fontWeight: '800', color: colors.textPrimary },
  confirmation: { fontSize: 12.5, color: colors.positive, textAlign: 'center', marginTop: spacing.sm },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  historyTitle: { fontSize: 15, fontWeight: '800', color: colors.textPrimary },
  historyLast: { fontSize: 12, color: colors.textTertiary },
  historyRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm + 2, marginTop: 2 },
  historyRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
  historyCode: { fontSize: 12.5, fontWeight: '700', color: colors.textPrimary },
  historyDate: { fontSize: 11, color: colors.textTertiary, marginTop: 3 },
  historyAmount: { fontSize: 13, fontWeight: '800', color: colors.positive },
});
