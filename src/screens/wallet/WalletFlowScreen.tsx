import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { BackHeader } from '../../components/BackHeader';
import { SelectorField } from '../../components/SelectorField';
import { AmountField } from '../../components/AmountField';
import { gxtToken } from '../../data/liveAppMockData';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AssetsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AssetsStackParamList, 'WalletFlow'>;

const tabs = [
  { key: 'Transfer', icon: 'repeat-outline' as const },
  { key: 'Send', icon: 'paper-plane-outline' as const },
  { key: 'Withdraw', icon: 'arrow-up-circle-outline' as const },
  { key: 'History', icon: 'time-outline' as const },
] as const;
type TabKey = (typeof tabs)[number]['key'];

const historyGroups = ['Deposits', 'Withdrawals', 'Transfers', 'Sends & Receives'];

export const WalletFlowScreen: React.FC<Props> = ({ route, navigation }) => {
  const [tab, setTab] = useState<TabKey>(route.params?.tab ?? 'Transfer');
  useEffect(() => {
    if (route.params?.tab) setTab(route.params.tab);
  }, [route.params?.tab]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BackHeader title="Wallet" onBack={() => navigation.goBack()} />

      <View style={styles.tabBar}>
        {tabs.map((t) => {
          const active = t.key === tab;
          return (
            <Pressable key={t.key} onPress={() => setTab(t.key)} style={[styles.tab, active && styles.tabActive]}>
              <Ionicons name={t.icon} size={13} color={active ? colors.textPrimary : colors.textTertiary} />
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.key}</Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {tab === 'Transfer' && <TransferPanel />}
        {tab === 'Send' && <SendPanel />}
        {tab === 'Withdraw' && <WithdrawPanel />}
        {tab === 'History' && <HistoryPanel />}
      </ScrollView>
    </SafeAreaView>
  );
};

const TransferPanel: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [flipped, setFlipped] = useState(false);
  const from = flipped ? 'Futures' : 'Spot';
  const to = flipped ? 'Spot' : 'Futures';
  const fromBalance = flipped ? '0.0000' : '0.5000';
  const toBalance = flipped ? '0.5000' : '0.0000';

  return (
    <View style={styles.card}>
      <View style={styles.transferRow}>
        <View>
          <Text style={styles.transferLabel}>From</Text>
          <Text style={styles.transferAccount}>{from}</Text>
          <Text style={styles.transferBalance}>{fromBalance} USDT</Text>
        </View>
        <Pressable style={styles.swapBtn} onPress={() => setFlipped((f) => !f)}>
          <Ionicons name="swap-vertical" size={18} color={colors.black} />
        </Pressable>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.transferLabel}>To</Text>
          <Text style={styles.transferAccount}>{to}</Text>
          <Text style={styles.transferBalance}>{toBalance} USDT</Text>
        </View>
      </View>

      <AmountField label="Amount (USDT)" value={amount} onChangeText={setAmount} onMax={() => setAmount(fromBalance)} style={{ marginTop: spacing.lg }} />

      <Pressable style={styles.reviewBtn}>
        <Text style={styles.reviewBtnText}>Review transfer</Text>
      </Pressable>

      <Text style={styles.footnote}>Only USDT can be transferred between Spot and Futures.</Text>
    </View>
  );
};

const SendPanel: React.FC = () => {
  const [uid, setUid] = useState('');
  const [amount, setAmount] = useState('');
  const available = 0.5;

  return (
    <View style={styles.card}>
      <SelectorField label="Asset" iconSymbol="USDT" iconColor="#26A17B" value="USDT" suffix="0.5000" />
      <Text style={styles.helperCaption}>Available: {available.toFixed(6)} USDT</Text>

      <Text style={[styles.fieldLabel, { marginTop: spacing.md }]}>Recipient UID (8 digits)</Text>
      <TextInput
        value={uid}
        onChangeText={setUid}
        placeholder="12345678"
        placeholderTextColor={colors.textTertiary}
        keyboardType="number-pad"
        maxLength={8}
        style={styles.textInput}
      />

      <AmountField label="Amount" value={amount} onChangeText={setAmount} onMax={() => setAmount(available.toString())} style={{ marginTop: spacing.md }} />
      <Text style={styles.helperCaption}>Min: 20 USDT · No fee on internal sends</Text>

      <Pressable style={[styles.reviewBtn, { marginTop: spacing.md }]}>
        <Text style={styles.reviewBtnText}>Review send</Text>
      </Pressable>
    </View>
  );
};

const WithdrawPanel: React.FC = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const available = gxtToken.balance;

  return (
    <View style={styles.card}>
      <View style={styles.dualRow}>
        <SelectorField label="Coin" iconSymbol="GXT" iconColor={colors.brand} value="G..." suffix="247.4414" style={{ flex: 1 }} />
        <SelectorField label="Network" iconLetter="BEP" iconColor={colors.brand} value="BEP20" style={{ flex: 1 }} />
      </View>

      <Text style={[styles.fieldLabel, { marginTop: spacing.md }]}>Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Recipient address"
        placeholderTextColor={colors.textTertiary}
        style={styles.textInput}
      />

      <AmountField label="Amount" value={amount} onChangeText={setAmount} onMax={() => setAmount(available.toString())} style={{ marginTop: spacing.md }} />
      <Text style={styles.helperCaption}>
        Available: {available.toFixed(6)} GXT · Min: 10 · Max: 1500 · Fee: $1 USDT
      </Text>
      <Text style={styles.helperCaption}>Fee is deducted from your USDT balance (available: 0.50 USDT)</Text>

      <View style={styles.receiveRow}>
        <Text style={styles.receiveLabel}>You will receive</Text>
        <Text style={styles.receiveValue}>{(parseFloat(amount) || 0).toFixed(6)} GXT</Text>
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="key-outline" size={16} color={colors.brand} style={{ marginTop: 1 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>2FA code required</Text>
          <Text style={styles.infoBody}>You'll be asked for a 6-digit code to authorize this action.</Text>
        </View>
      </View>

      <Pressable style={styles.reviewBtn}>
        <Text style={styles.reviewBtnText}>Review withdrawal</Text>
      </Pressable>
    </View>
  );
};

const HistoryPanel: React.FC = () => {
  const [expanded, setExpanded] = useState('Sends & Receives');

  return (
    <View style={{ gap: spacing.sm }}>
      {historyGroups.map((g) => {
        const isOpen = g === expanded;
        return (
          <View key={g} style={styles.historyCard}>
            <Pressable style={styles.historyHeader} onPress={() => setExpanded(isOpen ? '' : g)}>
              <Text style={styles.historyTitle}>{g.toUpperCase()}</Text>
              <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textTertiary} />
            </Pressable>
            {isOpen && (
              <View style={styles.historyBody}>
                <Text style={styles.historyEmpty}>No {g.toLowerCase()} yet</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    padding: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  tabActive: { backgroundColor: colors.surfaceHigh },
  tabText: { fontSize: 12.5, color: colors.textTertiary, fontWeight: '600' },
  tabTextActive: { color: colors.textPrimary, fontWeight: '700' },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 100 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
  },
  transferRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  transferLabel: { fontSize: 12, color: colors.textTertiary },
  transferAccount: { fontSize: 16, fontWeight: '800', color: colors.textPrimary, marginTop: 4 },
  transferBalance: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  swapBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewBtn: {
    backgroundColor: colors.brandMuted,
    borderRadius: radii.pill,
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: spacing.md,
  },
  reviewBtnText: { color: colors.black, fontWeight: '800', fontSize: 15 },
  footnote: { fontSize: 12, color: colors.textTertiary, marginTop: spacing.sm },
  fieldLabel: { fontSize: 12, color: colors.textTertiary, marginBottom: 6 },
  textInput: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.sm,
    height: 48,
    color: colors.textPrimary,
    fontSize: 14,
  },
  helperCaption: { fontSize: 11.5, color: colors.textTertiary, marginTop: 6, lineHeight: 16 },
  dualRow: { flexDirection: 'row', gap: spacing.sm },
  receiveRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radii.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    marginTop: spacing.md,
  },
  receiveLabel: { fontSize: 13, color: colors.textSecondary },
  receiveValue: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  infoBox: {
    flexDirection: 'row',
    gap: spacing.xs,
    backgroundColor: 'rgba(59,213,254,0.08)',
    borderWidth: 1,
    borderColor: colors.brandDim,
    borderRadius: radii.md,
    padding: spacing.sm,
    marginTop: spacing.md,
  },
  infoTitle: { fontSize: 13, fontWeight: '700', color: colors.brand },
  infoBody: { fontSize: 12, color: colors.textSecondary, marginTop: 2, lineHeight: 16 },
  historyCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
  },
  historyHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  historyTitle: { fontSize: 12.5, fontWeight: '700', color: colors.textSecondary, letterSpacing: 0.5 },
  historyBody: { borderTopWidth: 1, borderTopColor: colors.borderSubtle, paddingVertical: spacing.lg, alignItems: 'center' },
  historyEmpty: { fontSize: 13, color: colors.textTertiary },
});
