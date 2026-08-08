import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { BackHeader } from '../../components/BackHeader';
import {
  airdropTasks,
  miningData,
  miningClaimHistory,
  type AirdropTask,
} from '../../data/liveAppMockData';

type TopTab = 'Airdrop' | 'Mining';

interface Props {
  navigation: { goBack: () => void };
  route: { params?: { tab?: TopTab } };
}

const subTabs = ['Active Tasks', 'Completed'] as const;

export const AirdropMiningScreen: React.FC<Props> = ({ navigation, route }) => {
  const [topTab, setTopTab] = useState<TopTab>(route.params?.tab ?? 'Airdrop');
  const [subTab, setSubTab] = useState<(typeof subTabs)[number]>('Active Tasks');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BackHeader
        title={topTab === 'Airdrop' ? 'GXT Airdrop' : 'GXT Mining'}
        onBack={navigation.goBack}
        icon={topTab === 'Airdrop' ? 'gift-outline' : 'hardware-chip-outline'}
      />

      <View style={styles.toggleRow}>
        <Pressable
          style={[styles.toggleBtn, topTab === 'Airdrop' && styles.toggleBtnActive]}
          onPress={() => setTopTab('Airdrop')}
        >
          <Ionicons name="gift-outline" size={14} color={topTab === 'Airdrop' ? colors.black : colors.textSecondary} />
          <Text style={[styles.toggleText, topTab === 'Airdrop' && styles.toggleTextActive]}>GXT Airdrop</Text>
          <View style={[styles.countBadge, topTab === 'Airdrop' && styles.countBadgeActive]}>
            <Text style={[styles.countBadgeText, topTab === 'Airdrop' && { color: colors.black }]}>{airdropTasks.length}</Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.toggleBtn, topTab === 'Mining' && styles.toggleBtnActive]}
          onPress={() => setTopTab('Mining')}
        >
          <Ionicons name="hardware-chip-outline" size={14} color={topTab === 'Mining' ? colors.black : colors.textSecondary} />
          <Text style={[styles.toggleText, topTab === 'Mining' && styles.toggleTextActive]}>GXT Mining</Text>
        </Pressable>
      </View>

      {topTab === 'Airdrop' ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <View style={styles.subTabRow}>
            {subTabs.map((t) => (
              <Pressable key={t} onPress={() => setSubTab(t)} style={[styles.subTabBtn, subTab === t && styles.subTabBtnActive]}>
                <Text style={[styles.subTabText, subTab === t && styles.subTabTextActive]}>
                  {t}
                  {t === 'Active Tasks' ? ` ${airdropTasks.length}` : ''}
                </Text>
              </Pressable>
            ))}
          </View>

          {subTab === 'Active Tasks' ? (
            airdropTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No completed tasks yet.</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <View style={styles.minedIconWrap}>
              <Ionicons name="checkmark" size={16} color={colors.brand} />
            </View>
            <Text style={styles.minedLabel}>Total mined GXT</Text>
            <Text style={styles.minedValue}>{miningData.totalMined.toFixed(6).replace('.', ',')}</Text>
            <View style={styles.noticeBanner}>
              <Text style={styles.noticeText}>{miningData.endedNotice}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.balanceLabel}>Your GXT balance</Text>
            <Text style={styles.balanceValue}>{miningData.balance.toFixed(6).replace('.', ',')}</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.commissionHeader}>
              <Text style={styles.commissionTitle}>Invite &amp; Receive 10% Commission</Text>
              <Text style={styles.openLink}>Open</Text>
            </View>
            <View style={styles.commissionStatsRow}>
              <View style={styles.commissionStat}>
                <Text style={styles.commissionStatLabel}>Referrals</Text>
                <Text style={styles.commissionStatValue}>{miningData.referrals}</Text>
              </View>
              <View style={styles.commissionStat}>
                <Text style={styles.commissionStatLabel}>Commission credited</Text>
                <Text style={styles.commissionStatValue}>{miningData.commissionCredited.toFixed(4).replace('.', ',')}</Text>
              </View>
            </View>
            <View style={styles.commissionFootRow}>
              <Ionicons name="trending-up-outline" size={13} color={colors.brand} />
              <Text style={styles.commissionFootText}>Receive a flat 10% commission on quest rewards from your invitees.</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.historyHeader}>
              <View style={styles.historyHeaderLeft}>
                <Ionicons name="time-outline" size={15} color={colors.textSecondary} />
                <Text style={styles.historyTitle}>Claim history</Text>
              </View>
              <Text style={styles.historyLoaded}>{miningClaimHistory.length * 4} loaded</Text>
            </View>
            <Text style={styles.historySubtitle}>Past mining claims, newest first.</Text>

            <View style={styles.historyColHeader}>
              <Text style={styles.historyColLabel}>DATE</Text>
              <Text style={styles.historyColLabel}>AMOUNT</Text>
            </View>
            {miningClaimHistory.map((c, i) => (
              <View key={i} style={[styles.historyRow, i !== miningClaimHistory.length - 1 && styles.historyRowBorder]}>
                <View>
                  <Text style={styles.historyDate}>{c.date}</Text>
                  <Text style={styles.historyTime}>{c.time}</Text>
                </View>
                <Text style={styles.historyAmount}>+{c.amount.toFixed(6).replace('.', ',')} GXT</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const TaskCard: React.FC<{ task: AirdropTask }> = ({ task }) => (
  <View style={styles.card}>
    <View style={styles.taskTop}>
      <View style={[styles.taskIconWrap, { backgroundColor: `${task.iconColor}22` }]}>
        <Ionicons name={task.icon as any} size={18} color={task.iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskSubtitle}>{task.subtitle}</Text>
      </View>
      <View style={styles.rewardPill}>
        <Text style={styles.rewardPillText}>{task.reward}</Text>
      </View>
    </View>

    {task.bonusLine && <Text style={styles.bonusLine}>{task.bonusLine}</Text>}
    {task.minLine && <Text style={styles.minLine}>{task.minLine}</Text>}
    {task.progressLine && <Text style={styles.progressLine}>{task.progressLine}</Text>}

    {task.ctaKind === 'start' ? (
      <Pressable style={styles.startBtn}>
        <Ionicons name="open-outline" size={15} color={colors.black} />
        <Text style={styles.startBtnText}>Start</Text>
      </Pressable>
    ) : (
      <View style={styles.gateRow}>
        <Pressable style={styles.depositBtn}>
          <Ionicons name="wallet-outline" size={14} color={colors.textPrimary} />
          <Text style={styles.depositBtnText}>Deposit</Text>
        </Pressable>
        <View style={styles.notEligibleBtn}>
          <Ionicons name="checkmark-circle-outline" size={14} color={colors.positive} />
          <Text style={styles.notEligibleText}>Not eligible yet</Text>
        </View>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    padding: 3,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 9,
    borderRadius: radii.pill,
  },
  toggleBtnActive: { backgroundColor: colors.brand },
  toggleText: { fontSize: 13, fontWeight: '700', color: colors.textSecondary },
  toggleTextActive: { color: colors.black },
  countBadge: { backgroundColor: colors.surfaceHigh, borderRadius: radii.pill, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  countBadgeActive: { backgroundColor: 'rgba(0,0,0,0.2)' },
  countBadgeText: { fontSize: 11, fontWeight: '800', color: colors.textPrimary },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 100, gap: spacing.sm },
  subTabRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    padding: 3,
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
  },
  subTabBtn: { paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radii.pill },
  subTabBtnActive: { backgroundColor: colors.brand },
  subTabText: { fontSize: 13, fontWeight: '700', color: colors.textSecondary },
  subTabTextActive: { color: colors.black },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xxl },
  emptyText: { fontSize: 13, color: colors.textTertiary },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
  },
  taskTop: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  taskIconWrap: { width: 34, height: 34, borderRadius: radii.sm, alignItems: 'center', justifyContent: 'center' },
  taskTitle: { fontSize: 14.5, fontWeight: '800', color: colors.textPrimary },
  taskSubtitle: { fontSize: 12, color: colors.textTertiary, marginTop: 2 },
  rewardPill: { backgroundColor: colors.surfaceBrand, borderRadius: radii.pill, paddingHorizontal: spacing.xs, paddingVertical: 4 },
  rewardPillText: { fontSize: 11, fontWeight: '800', color: colors.brand },
  bonusLine: { fontSize: 12.5, color: colors.positive, fontWeight: '700', marginTop: spacing.sm },
  minLine: { fontSize: 12, color: colors.textTertiary, marginTop: 3 },
  progressLine: { fontSize: 12, color: '#F5B94A', marginTop: 3 },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.brand,
    borderRadius: radii.pill,
    paddingVertical: 12,
    marginTop: spacing.md,
  },
  startBtnText: { fontSize: 14, fontWeight: '800', color: colors.black },
  gateRow: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.md },
  depositBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
  },
  depositBtnText: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  notEligibleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: colors.positiveDim,
    borderRadius: radii.pill,
    paddingVertical: 10,
    opacity: 0.85,
  },
  notEligibleText: { fontSize: 12.5, fontWeight: '700', color: colors.positive },
  minedIconWrap: {
    alignSelf: 'center',
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minedLabel: { fontSize: 12.5, color: colors.textTertiary, textAlign: 'center', marginTop: spacing.sm },
  minedValue: { fontSize: 28, fontWeight: '800', color: colors.textPrimary, textAlign: 'center', marginTop: 4 },
  noticeBanner: {
    backgroundColor: colors.background,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  noticeText: { fontSize: 12, color: colors.textSecondary, textAlign: 'center' },
  balanceLabel: { fontSize: 12.5, color: colors.textTertiary },
  balanceValue: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, marginTop: 4 },
  commissionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  commissionTitle: { fontSize: 14.5, fontWeight: '800', color: colors.textPrimary, flex: 1 },
  openLink: { fontSize: 13, color: colors.brand, fontWeight: '700' },
  commissionStatsRow: { flexDirection: 'row', marginTop: spacing.md },
  commissionStat: { flex: 1, alignItems: 'center' },
  commissionStatLabel: { fontSize: 12, color: colors.textTertiary },
  commissionStatValue: { fontSize: 18, fontWeight: '800', color: colors.textPrimary, marginTop: 4 },
  commissionFootRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: spacing.md },
  commissionFootText: { flex: 1, fontSize: 11.5, color: colors.textTertiary, lineHeight: 16 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  historyTitle: { fontSize: 14.5, fontWeight: '800', color: colors.textPrimary },
  historyLoaded: { fontSize: 12, color: colors.textTertiary },
  historySubtitle: { fontSize: 12, color: colors.textTertiary, marginTop: 2 },
  historyColHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md },
  historyColLabel: { fontSize: 10.5, color: colors.textTertiary, fontWeight: '700', letterSpacing: 0.5 },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm },
  historyRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
  historyDate: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  historyTime: { fontSize: 11.5, color: colors.textTertiary, marginTop: 2 },
  historyAmount: { fontSize: 13, fontWeight: '800', color: colors.positive },
});
