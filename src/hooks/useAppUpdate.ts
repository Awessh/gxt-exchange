import { useCallback, useState } from 'react';
import { Alert, Platform } from 'react-native';
import * as Updates from 'expo-updates';
import Constants from 'expo-constants';

export type UpdateCheckState = 'idle' | 'checking' | 'downloading' | 'upToDate' | 'error';

/**
 * Wraps expo-updates so the Profile screen can offer a manual
 * "Check for updates" button, matching an OTA (over-the-air) update flow
 * via EAS Update. This only does anything in a real build (dev-client,
 * internal, or store build) published through `eas update` — it's a no-op
 * in Expo Go / the local dev server, where `Updates.isEnabled` is false.
 */
export function useAppUpdate() {
  const [state, setState] = useState<UpdateCheckState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentVersion = Constants.expoConfig?.version ?? '1.0.0';
  const runtimeVersion = Updates.runtimeVersion ?? currentVersion;
  const channel = Updates.channel || (__DEV__ ? 'development' : 'default');

  const checkForUpdate = useCallback(async () => {
    // In Expo Go / a bare dev server there is no update service to talk to —
    // explain that instead of silently failing.
    if (!Updates.isEnabled || Platform.OS === 'web') {
      Alert.alert(
        'Updates unavailable here',
        "OTA update checks only run in a build published via EAS Update (dev-client, internal, or store build) — not in Expo Go or the web preview."
      );
      return;
    }

    setState('checking');
    setErrorMessage(null);
    try {
      const result = await Updates.checkForUpdateAsync();

      if (!result.isAvailable) {
        setState('upToDate');
        Alert.alert('You\'re up to date', `Running the latest version on the "${channel}" channel.`);
        return;
      }

      setState('downloading');
      await Updates.fetchUpdateAsync();

      Alert.alert('Update ready', 'A new version has been downloaded. Restart now to apply it?', [
        { text: 'Later', style: 'cancel', onPress: () => setState('idle') },
        {
          text: 'Restart now',
          style: 'default',
          onPress: async () => {
            await Updates.reloadAsync();
          },
        },
      ]);
    } catch (err: any) {
      setState('error');
      setErrorMessage(err?.message ?? 'Something went wrong while checking for updates.');
      Alert.alert('Update check failed', err?.message ?? 'Please try again in a moment.');
    }
  }, [channel]);

  return {
    state,
    errorMessage,
    checkForUpdate,
    currentVersion,
    runtimeVersion,
    channel,
    updateId: Updates.updateId,
    isEmbeddedLaunch: Updates.isEmbeddedLaunch,
  };
}
