import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { colors } from '../theme/colors';

// Svg/G rendus animables par react-native-svg
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedG = Animated.createAnimatedComponent(G);

type Props = {
  /** Largeur du logo ; la hauteur suit le ratio du viewBox d'origine (427.6 x 277.5) */
  width?: number;
  /** Lance l'animation d'entrée au montage (défaut: true) */
  autoPlay?: boolean;
  /** Appelé une fois la séquence d'entrée terminée */
  onFinish?: () => void;
  style?: StyleProp<ViewStyle>;
};

const VIEWBOX_W = 427.6;
const VIEWBOX_H = 277.5;

export const GxtLogo: React.FC<Props> = ({
  width = 260,
  autoPlay = true,
  onFinish,
  style,
}) => {
  const markOpacity = useRef(new Animated.Value(0)).current;
  const markScale = useRef(new Animated.Value(0.86)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(6)).current;

  useEffect(() => {
    if (!autoPlay) return;

    Animated.sequence([
      Animated.parallel([
        Animated.timing(markOpacity, {
          toValue: 1,
          duration: 650,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(markScale, {
          toValue: 1,
          duration: 650,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(taglineTranslateY, {
          toValue: 0,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start(({ finished }) => {
      if (finished) onFinish?.();
    });
  }, [autoPlay]);

  const height = (width * VIEWBOX_H) / VIEWBOX_W;

  return (
    <AnimatedSvg
      width={width}
      height={height}
      viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
      style={style}
    >
      {/* Icône + wordmark "GXT EXCHANGE" */}
      <AnimatedG
        opacity={markOpacity}
        style={{
          transform: [{ scale: markScale }],
        }}
      >
        <Path
          fill={colors.textPrimary}
          d="M89,90.1h56.8v22.4c0,9.1-2.4,17-7.3,23.8c-4.8,6.8-11.7,12-20.4,15.8c-8.8,3.7-19,5.6-30.8,5.6
            c-11.9,0-22.3-1.8-31.1-5.3c-8.9-3.5-15.8-8.5-20.7-14.9c-4.9-6.4-7.4-13.9-7.4-22.4V79.4c0-9.1,2.4-17,7.3-23.8
            c4.9-6.8,11.7-12,20.4-15.7c8.7-3.7,19-5.6,30.8-5.6c9.8,0,18.7,1.5,26.7,4.5c8,3,14.7,7.2,20.2,12.5c5.5,5.4,9.1,11.7,11,18.9
            h-29.1c-1.9-5.1-5.6-9-11.1-11.8s-11.4-4.1-17.6-4.1c-9.3,0-16.8,2.3-22.4,6.9c-5.6,4.6-8.4,10.7-8.4,18.2v35.7
            c0,6.8,2.9,12.3,8.6,16.4c5.8,4.1,13.4,6.1,22.8,6.1c9.3,0,16.8-2.2,22.4-6.6c5.6-4.4,8.4-10.5,8.4-18.3v-3.7H89V90.1z"
        />
        <Path
          fill={colors.textPrimary}
          d="M159.4,156.4l58.1-71.7l39-49.1h29.2l-54.2,66.8l-42.9,54H159.4z M259,156.4l-41.2-51.3l-3.3-4.1l-53.8-65.5
            H190l38.1,47.5l4.1,4.9l56,68.4H259z"
        />
        <Path
          fill={colors.textPrimary}
          d="M295,54.6v-19h118v19H295z M340.5,156.4V45.5h26.8v110.9H340.5z"
        />
        <Path
          fill={colors.textPrimary}
          d="M28.5,219v-40.9h7.8V219H28.5z M32.2,183.5v-5.5h31.9v5.5H32.2z M32.2,201.4v-5.5h27.7v5.5H32.2z M32.2,219
            v-5.5h31.9v5.5H32.2z"
        />
        <Path
          fill={colors.textPrimary}
          d="M69.1,219l19.3-23.4l13.9-17.5h8.7l-18.4,22.1L77.8,219H69.1z M103.1,219l-14.4-18l-1.2-1.4l-18-21.5h8.7
            l13.4,16.6l1.3,1.5l19,22.7H103.1z"
        />
        <Path
          fill={colors.textPrimary}
          d="M135.4,219.4c-3.9,0-7.2-0.6-10.1-1.9c-2.9-1.3-5.2-3-6.8-5.3s-2.4-5-2.4-8v-11.2c0-3.1,0.8-5.8,2.4-8
            s3.9-4.1,6.8-5.3c2.9-1.3,6.3-1.9,10.1-1.9c3.2,0,6.1,0.5,8.8,1.5c2.7,1,4.9,2.4,6.7,4.2c1.8,1.8,3,3.9,3.6,6.4h-8
            c-0.5-1.3-1.3-2.5-2.4-3.4c-1.1-1-2.5-1.7-4-2.3c-1.5-0.5-3.1-0.8-4.7-0.8c-3.4,0-6.1,0.9-8.2,2.7c-2.1,1.8-3.1,4.1-3.1,7v11.2
            c0,2.9,1,5.2,3.1,7c2.1,1.8,4.8,2.6,8.2,2.6c2.4,0,4.7-0.6,6.8-1.7s3.6-2.7,4.3-4.9h8c-0.6,2.4-1.9,4.6-3.7,6.4
            c-1.8,1.8-4,3.2-6.7,4.2S138.6,219.4,135.4,219.4z"
        />
        <Path
          fill={colors.textPrimary}
          d="M164.8,219v-40.9h7.8V219H164.8z M169.6,201.6v-5.5h30.8v5.5H169.6z M196.3,219v-40.9h7.8V219H196.3z"
        />
        <Path
          fill={colors.textPrimary}
          d="M211.7,219l20.5-40.9h6.6l20.5,40.9h-8.4l-15.4-33l-15.4,33H211.7z M221.1,210v-5.5h29.2v5.5H221.1z"
        />
        <Path
          fill={colors.textPrimary}
          d="M267.6,218.9v-40.9h7.1l27.1,31.6l-0.9,0.7v-32.3h7.7v40.9h-7.1l-27.1-31.1l0.9-0.7v31.9H267.6z"
        />
        <Path
          fill={colors.textPrimary}
          d="M341.1,197h19.2v7.1c0,3.1-0.8,5.8-2.4,8.1c-1.6,2.3-3.9,4.1-6.8,5.3c-2.9,1.3-6.3,1.9-10.2,1.9
            c-3.9,0-7.4-0.6-10.3-1.8c-3-1.2-5.2-2.9-6.9-5c-1.6-2.2-2.4-4.7-2.4-7.6v-12.1c0-3.1,0.8-5.8,2.4-8s3.9-4.1,6.8-5.3
            c2.9-1.3,6.3-1.9,10.2-1.9c3.2,0,6.2,0.5,8.8,1.5c2.7,1,4.9,2.4,6.7,4.2c1.8,1.8,3,3.9,3.7,6.4h-8.4c-0.7-2.1-2.1-3.7-4.2-4.9
            c-2.1-1.1-4.3-1.7-6.6-1.7c-3.5,0-6.2,0.9-8.3,2.7c-2.1,1.8-3.1,4.1-3.1,7V205c0,2.7,1.1,4.8,3.2,6.4c2.1,1.6,5,2.4,8.5,2.4
            c3.5,0,6.2-0.8,8.3-2.5c2.1-1.7,3.1-4,3.1-7.1v-1.8h-11.3V197z"
        />
        <Path
          fill={colors.textPrimary}
          d="M372.1,219v-40.9h7.8V219H372.1z M375.9,183.5v-5.5h31.9v5.5H375.9z M375.9,201.4v-5.5h27.7v5.5H375.9z
            M375.9,219v-5.5h31.9v5.5H375.9z"
        />
      </AnimatedG>

      {/* Tagline "TRADE. INVEST. GROW." en couleur de marque */}
      <AnimatedG
        opacity={taglineOpacity}
        style={{
          transform: [{ translateY: taglineTranslateY }],
        }}
      >
        <Path fill={colors.brand} d="M24.5,237.2v-2.7h19.2v2.7H24.5z M32.2,254.6v-18.4h3.8v18.4H32.2z" />
        <Path
          fill={colors.brand}
          d="M47.5,254.6v-20.1h3.8v20.1H47.5z M49.2,246.1v-2.7h9.3c1.1,0,2-0.3,2.7-0.9c0.7-0.6,1-1.3,1-2.3
            c0-0.9-0.3-1.7-1-2.3c-0.7-0.6-1.6-0.9-2.7-0.9h-9.3v-2.7h9.1c1.6,0,3,0.2,4.2,0.7c1.2,0.5,2.1,1.2,2.8,2c0.7,0.9,1,1.9,1,3.1
            c0,1.2-0.3,2.2-1,3c-0.7,0.9-1.6,1.5-2.8,2c-1.2,0.5-2.6,0.7-4.2,0.7H49.2z M62.8,254.6l-6.2-9.1l3.8-0.6l7,9.7H62.8z"
        />
        <Path
          fill={colors.brand}
          d="M69,254.6l10-20.1h3.3l10,20.1h-4.1l-7.6-16.2l-7.6,16.2H69z M73.6,250.2v-2.7h14.3v2.7H73.6z"
        />
        <Path
          fill={colors.brand}
          d="M96.4,254.6v-20.1h3.8v20.1H96.4z M99,254.6v-2.7h6.2c2,0,3.6-0.4,4.7-1.2c1.1-0.8,1.7-1.9,1.7-3.3v-5.9
            c0-1.4-0.6-2.5-1.7-3.3c-1.1-0.8-2.7-1.2-4.7-1.2H99v-2.7h6.1c3.3,0,5.8,0.6,7.7,1.9c1.8,1.3,2.7,3,2.7,5.3v5.7
            c0,1.5-0.4,2.8-1.2,3.9c-0.8,1.1-2,1.9-3.5,2.5c-1.5,0.6-3.4,0.8-5.6,0.8H99z"
        />
        <Path
          fill={colors.brand}
          d="M121.2,254.6v-20.1h3.8v20.1H121.2z M123.1,237.2v-2.7h15.6v2.7H123.1z M123.1,245.9v-2.7h13.6v2.7H123.1z
            M123.1,254.6v-2.7h15.6v2.7H123.1z"
        />
        <Path fill={colors.brand} d="M143.1,254.6v-3h4v3H143.1z" />
        <Path fill={colors.brand} d="M167,234.5v20.1h-3.8v-20.1H167z" />
        <Path
          fill={colors.brand}
          d="M173.7,254.5v-20.1h3.5l13.3,15.5l-0.5,0.4v-15.9h3.8v20.1h-3.5l-13.3-15.3l0.5-0.4v15.6H173.7z"
        />
        <Path
          fill={colors.brand}
          d="M207.4,254.6l-8.9-20.1h4.2l6.5,15.7l6.5-15.7h4.2l-8.9,20.1H207.4z"
        />
        <Path
          fill={colors.brand}
          d="M224.1,254.6v-20.1h3.8v20.1H224.1z M225.9,237.2v-2.7h15.6v2.7H225.9z M225.9,245.9v-2.7h13.6v2.7H225.9z
            M225.9,254.6v-2.7h15.6v2.7H225.9z"
        />
        <Path
          fill={colors.brand}
          d="M255.2,254.8c-1.3,0-2.6-0.1-3.7-0.3s-2.3-0.5-3.3-0.8c-1-0.4-2-0.8-2.9-1.4l2.4-2.2c1,0.7,2.2,1.2,3.4,1.5
            c1.2,0.3,2.6,0.5,4.1,0.5c2,0,3.5-0.3,4.6-0.8s1.6-1.3,1.6-2.3v0c0-0.8-0.3-1.3-0.8-1.8c-0.5-0.4-1.3-0.7-2.2-0.9
            c-0.9-0.2-1.9-0.4-2.9-0.5c-1-0.1-2.1-0.3-3.1-0.5c-1-0.2-2-0.4-2.9-0.8c-0.9-0.4-1.6-0.9-2.1-1.6s-0.8-1.6-0.8-2.8v0
            c0-1.9,0.8-3.3,2.5-4.3c1.7-1,4.1-1.5,7.1-1.5c1.5,0,2.9,0.2,4.3,0.5c1.4,0.3,2.8,0.9,4.1,1.6l-2.2,2.2c-1-0.6-2.1-1-3.1-1.3
            c-1-0.3-2.1-0.4-3.1-0.4c-1.9,0-3.3,0.3-4.3,0.8c-1,0.5-1.5,1.3-1.5,2.3v0c0,0.8,0.3,1.3,0.9,1.7c0.6,0.4,1.4,0.7,2.4,0.9
            c1,0.2,2,0.4,3.1,0.5c1,0.1,2,0.3,3,0.5c1,0.2,1.9,0.5,2.7,0.9s1.5,0.9,2,1.6c0.5,0.7,0.7,1.6,0.7,2.7v0c0,1.8-0.9,3.3-2.6,4.3
            C260.8,254.3,258.4,254.8,255.2,254.8z"
        />
        <Path fill={colors.brand} d="M266.9,237.2v-2.7h19.2v2.7H266.9z M274.6,254.6v-18.4h3.8v18.4H274.6z" />
        <Path fill={colors.brand} d="M286.6,254.6v-3h4v3H286.6z" />
        <Path
          fill={colors.brand}
          d="M315.8,243.7h9.4v3.5c0,1.5-0.4,2.8-1.2,4c-0.8,1.1-1.9,2-3.3,2.6s-3.1,0.9-5,0.9c-1.9,0-3.6-0.3-5.1-0.9
            c-1.4-0.6-2.6-1.4-3.4-2.5s-1.2-2.3-1.2-3.7v-5.9c0-1.5,0.4-2.8,1.2-3.9c0.8-1.1,1.9-2,3.3-2.6c1.4-0.6,3.1-0.9,5-0.9
            c1.6,0,3,0.2,4.3,0.7c1.3,0.5,2.4,1.2,3.3,2.1s1.5,1.9,1.8,3.1h-4.1c-0.4-1-1-1.8-2-2.4c-1-0.6-2.1-0.8-3.2-0.8
            c-1.7,0-3.1,0.4-4.1,1.3c-1,0.9-1.5,2-1.5,3.4v5.9c0,1.3,0.5,2.4,1.6,3.1c1,0.8,2.4,1.2,4.2,1.2c1.7,0,3.1-0.4,4.1-1.2
            c1-0.8,1.5-2,1.5-3.5v-0.9h-5.5V243.7z"
        />
        <Path
          fill={colors.brand}
          d="M331,254.6v-20.1h3.8v20.1H331z M332.7,246.1v-2.7h9.3c1.1,0,2-0.3,2.7-0.9c0.7-0.6,1-1.3,1-2.3
            c0-0.9-0.3-1.7-1-2.3c-0.7-0.6-1.6-0.9-2.7-0.9h-9.3v-2.7h9.1c1.6,0,3,0.2,4.2,0.7c1.2,0.5,2.1,1.2,2.8,2c0.7,0.9,1,1.9,1,3.1
            c0,1.2-0.3,2.2-1,3c-0.7,0.9-1.6,1.5-2.8,2c-1.2,0.5-2.6,0.7-4.2,0.7H332.7z M346.4,254.6l-6.2-9.1l3.8-0.6l7,9.7H346.4z"
        />
        <Path
          fill={colors.brand}
          d="M364.3,254.8c-1.9,0-3.6-0.3-5-0.9c-1.4-0.6-2.6-1.5-3.3-2.6c-0.8-1.1-1.2-2.4-1.2-3.9v-5.7
            c0-1.5,0.4-2.8,1.2-3.9c0.8-1.1,1.9-2,3.3-2.6c1.4-0.6,3.1-0.9,5-0.9s3.6,0.3,5,0.9c1.4,0.6,2.6,1.5,3.3,2.6
            c0.8,1.1,1.2,2.4,1.2,3.9v5.7c0,1.5-0.4,2.8-1.2,3.9c-0.8,1.1-1.9,2-3.3,2.6C367.9,254.5,366.3,254.8,364.3,254.8z M364.3,252
            c1.7,0,3.1-0.4,4.1-1.2c1-0.8,1.5-1.9,1.5-3.3v-5.9c0-1.4-0.5-2.5-1.5-3.3c-1-0.8-2.4-1.2-4.1-1.2c-1.7,0-3.1,0.4-4.1,1.2
            s-1.6,1.9-1.6,3.3v5.9c0,1.4,0.5,2.5,1.6,3.3S362.6,252,364.3,252z"
        />
        <Path
          fill={colors.brand}
          d="M386.1,250.2l5.6-15.7h2.6l5.6,15.7l4.8-15.7h4l-6.7,20.1h-3.9l-5-14l-5.2,14h-3.9l-6.7-20.1h4L386.1,250.2z"
        />
      </AnimatedG>
    </AnimatedSvg>
  );
};

export default GxtLogo;
