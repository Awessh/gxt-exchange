import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing } from '../../theme/colors';
import { BackHeader } from '../../components/BackHeader';
import { SelectorField } from '../../components/SelectorField';
import { presaleStages, launchpadOffer } from '../../data/liveAppMockData';

interface Props {
  navigation: { goBack: () => void };
}

const currentStage = presaleStages.find((s) => s.status === 'live') ?? presaleStages[presaleStages.length - 1];

export const LaunchpadScreen: React.FC<Props> = ({ navigation }) => {
  const [payAmount, setPayAmount] = useState('');

  const receiveAmount = useMemo(() => {
    const pay = parseFloat(payAmount);
    if (!pay || pay <= 0) return 0;
    return pay / currentStage.price;
  }, [payAmount]);

  const soldPercent = (currentStage.sold / currentStage.total) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BackHeader title="Launchpad" onBack={navigation.goBack} icon="rocket-outline" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Stages overview */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Presale stages</Text>
          <Text style={styles.cardSubtitle}>Prices step up each stage - earlier is cheaper.</Text>

          <View style={styles.stagesRow}>
            {presaleStages.map((s) => {
              const isLive = s.status === 'live';
              return (
                <View key={s.stage} style={[styles.stageChip, isLive && styles.stageChipLive]}>
                  <View style={styles.stageChipTop}>
                    <Text style={styles.stageChipLabel}>Stage {s.stage}</Text>
                    {s.status === 'done' ? (
                      <Text style={styles.doneLabel}>DONE</Text>
                    ) : isLive ? (
                      <View style={styles.livePill}>
                        <Text style={styles.livePillText}>LIVE</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.stagePrice}>${s.price.toFixed(2)}</Text>
                  <Text style={styles.stageSold} numberOfLines={1}>
                    {s.sold.toLocaleString('fr-FR', { maximumFractionDigits: 3 })}/{(s.total / 1000).toFixed(0)}
                    000...
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Buy panel */}
        <View style={styles.card}>
          <View style={styles.offerHeader}>
            <View style={styles.gxtBadge}>
              <Text style={styles.gxtBadgeText}>G</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.offerTitle}>Presale Stage {currentStage.stage}</Text>
              <Text style={styles.offerSubtitle}>GXT · {currentStage.price} USDT / token</Text>
            </View>
            <View style={styles.openPill}>
              <Text style={styles.openPillText}>OPEN</Text>
            </View>
          </View>

          <Text style={styles.description}>{launchpadOffer.description}</Text>

          <View style={styles.bonusBanner}>
            <Text style={styles.bonusIcon}>%</Text>
            <Text style={styles.bonusText}>
              <Text style={styles.bonusTextBold}>
                Buy ${launchpadOffer.bonusThresholdUsd}+ and get {launchpadOffer.bonusPercent}% bonus
              </Text>
              <Text style={styles.bonusTextDim}> — extra GXT credited automatically.</Text>
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${soldPercent}%` }]} />
            <View style={[styles.progressHandle, { left: `${soldPercent}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLeft}>
              {currentStage.sold.toLocaleString('fr-FR', { maximumFractionDigits: 3 })} / {currentStage.total.toLocaleString('fr-FR')} GXT
            </Text>
            <Text style={styles.progressRight}>{soldPercent.toFixed(2)}% sold</Text>
          </View>

          <Text style={styles.fieldLabel}>Pay with</Text>
          <SelectorField label="" iconSymbol="USDT" iconColor="#26A17B" value="USDT" suffix={`bal ${launchpadOffer.usdtBalance.toFixed(4)}`} />

          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>USDT balance</Text>
            <View style={styles.balanceValueRow}>
              <Ionicons name="wallet-outline" size={13} color={colors.textTertiary} />
              <Text style={styles.balanceValue}>{launchpadOffer.usdtBalance.toFixed(6)}</Text>
            </View>
          </View>

          {/* You pay */}
          <View style={styles.amountCard}>
            <View style={styles.amountCardTop}>
              <Text style={styles.amountCardLabel}>You pay</Text>
              <Pressable style={styles.maxPill} onPress={() => setPayAmount(launchpadOffer.usdtBalance.toString())}>
                <Text style={styles.maxPillText}>MAX</Text>
              </Pressable>
            </View>
            <View style={styles.amountCardRow}>
              <TextInput
                value={payAmount}
                onChangeText={setPayAmount}
                placeholder="0.00"
                placeholderTextColor={colors.textTertiary}
                keyboardType="decimal-pad"
                style={styles.amountInput}
              />
              <View style={styles.assetTag}>
                <View style={styles.assetTagDot} />
                <Text style={styles.assetTagText}>USDT</Text>
              </View>
            </View>
            <View style={styles.amountCardBottom}>
              <Text style={styles.amountUsd}>≈ ${(parseFloat(payAmount) || 0).toFixed(2)}</Text>
              <Text style={styles.amountBalance}>Balance {launchpadOffer.usdtBalance.toFixed(6)} USDT</Text>
            </View>
          </View>

          <View style={styles.swapDivider}>
            <View style={styles.swapCircle}>
              <Ionicons name="arrow-down" size={14} color={colors.textSecondary} />
            </View>
          </View>

          {/* You receive */}
          <View style={styles.amountCard}>
            <View style={styles.amountCardTop}>
              <Text style={styles.amountCardLabel}>You receive</Text>
              <Text style={styles.minMaxText}>
                min {launchpadOffer.minTokens} · max {launchpadOffer.maxTokens.toLocaleString()}
              </Text>
            </View>
            <View style={styles.amountCardRow}>
              <Text style={styles.amountInput}>{receiveAmount ? receiveAmount.toFixed(2) : '0.00'}</Text>
              <View style={styles.assetTag}>
                <View style={[styles.assetTagDot, { backgroundColor: colors.brand }]} />
                <Text style={styles.assetTagText}>GXT</Text>
              </View>
            </View>
          </View>
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
  cardTitle: { fontSize: 17, fontWeight: '800', color: colors.textPrimary },
  cardSubtitle: { fontSize: 12.5, color: colors.textTertiary, marginTop: 4 },
  stagesRow: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.md },
  stageChip: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
  },
  stageChipLive: { borderColor: colors.brand, backgroundColor: colors.surfaceBrand },
  stageChipTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stageChipLabel: { fontSize: 11, color: colors.textSecondary, fontWeight: '700' },
  doneLabel: { fontSize: 9, color: colors.textTertiary, fontWeight: '700' },
  livePill: { backgroundColor: colors.brand, borderRadius: radii.pill, paddingHorizontal: 6, paddingVertical: 1.5 },
  livePillText: { fontSize: 8.5, fontWeight: '800', color: colors.black },
  stagePrice: { fontSize: 17, fontWeight: '800', color: colors.textPrimary, marginTop: 6 },
  stageSold: { fontSize: 9.5, color: colors.textTertiary, marginTop: 4 },
  offerHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  gxtBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.surfaceBrand,
    borderWidth: 1,
    borderColor: colors.brandDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gxtBadgeText: { color: colors.brand, fontWeight: '800' },
  offerTitle: { fontSize: 15, fontWeight: '800', color: colors.textPrimary },
  offerSubtitle: { fontSize: 12, color: colors.textTertiary, marginTop: 2 },
  openPill: { backgroundColor: colors.positiveDim, borderRadius: radii.pill, paddingHorizontal: spacing.xs, paddingVertical: 4 },
  openPillText: { fontSize: 11, fontWeight: '800', color: colors.positive },
  description: { fontSize: 13, color: colors.textSecondary, lineHeight: 19, marginTop: spacing.sm },
  bonusBanner: {
    flexDirection: 'row',
    gap: spacing.xs,
    backgroundColor: colors.surfaceBrand,
    borderWidth: 1,
    borderColor: colors.brandDim,
    borderRadius: radii.md,
    padding: spacing.sm,
    marginTop: spacing.sm,
  },
  bonusIcon: { color: colors.brand, fontWeight: '800', fontSize: 13 },
  bonusText: { flex: 1, fontSize: 12.5, lineHeight: 18 },
  bonusTextBold: { color: colors.brand, fontWeight: '700' },
  bonusTextDim: { color: colors.textSecondary },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceHigh,
    marginTop: spacing.md,
    position: 'relative',
  },
  progressFill: { position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: colors.brand, borderRadius: 2 },
  progressHandle: {
    position: 'absolute',
    top: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.white,
    marginLeft: -6,
  },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  progressLeft: { fontSize: 12, color: colors.textSecondary },
  progressRight: { fontSize: 12, color: colors.brand, fontWeight: '700' },
  fieldLabel: { fontSize: 12, color: colors.textTertiary, marginTop: spacing.lg, marginBottom: 6 },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  balanceLabel: { fontSize: 12, color: colors.textTertiary },
  balanceValueRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  balanceValue: { fontSize: 12, color: colors.textSecondary, fontWeight: '600' },
  amountCard: {
    backgroundColor: colors.background,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    marginTop: spacing.md,
  },
  amountCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  amountCardLabel: { fontSize: 12, color: colors.textTertiary },
  maxPill: { backgroundColor: colors.surfaceHigh, borderRadius: radii.pill, paddingHorizontal: spacing.xs, paddingVertical: 2 },
  maxPillText: { fontSize: 10, fontWeight: '800', color: colors.brand },
  minMaxText: { fontSize: 11, color: colors.textTertiary },
  amountCardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
  amountInput: { fontSize: 22, fontWeight: '700', color: colors.textPrimary, padding: 0, flex: 1 },
  assetTag: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  assetTagDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#26A17B' },
  assetTagText: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  amountCardBottom: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  amountUsd: { fontSize: 11.5, color: colors.textTertiary },
  amountBalance: { fontSize: 11.5, color: colors.textTertiary },
  swapDivider: { alignItems: 'center', marginVertical: -spacing.xs },
  swapCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
