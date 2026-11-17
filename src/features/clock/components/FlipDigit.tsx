import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

interface FlipDigitProps {
  value: string;
  width?: number;
  height?: number;
}

export function FlipDigit({ value, width = 88, height = 132 }: FlipDigitProps) {
  const halfHeight = height / 2;

  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);

  const topProgress = useSharedValue(1);
  const bottomProgress = useSharedValue(1);

  useEffect(() => {
    if (value === current) return;

    setPrevious(current);
    setCurrent(value);

    topProgress.value = 0;
    bottomProgress.value = 0;

    // Primero gira la solapa superior
    topProgress.value = withTiming(1, {
      duration: 300,
      easing: Easing.in(Easing.cubic),
    });

    // Después gira la solapa inferior
    bottomProgress.value = withDelay(
      300,
      withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [value, current, topProgress, bottomProgress]);

  // Rotación de la solapa superior
  const topFlapStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateX: `${-90 * topProgress.value}deg` },
    ],
  }));

  // Rotación de la solapa inferior
  const bottomFlapStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateX: `${90 * (1 - bottomProgress.value)}deg` },
    ],
  }));

  // Sombra de la solapa superior
  const topShadowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(topProgress.value, [0, 0.5, 1], [0, 0.4, 0]),
  }));

  // Sombra de la solapa inferior
  const bottomShadowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(bottomProgress.value, [0, 0.5, 1], [0, 0.4, 0]),
  }));

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Mitad superior fija */}
      <View style={[styles.half, styles.top, { height: halfHeight }]}>
        <Digit value={current} height={height} />
      </View>

      {/* Mitad inferior fija */}
      <View style={[styles.half, styles.bottom, { height: halfHeight }]}>
        <Digit value={current} height={height} bottom />
      </View>

      {/* Solapa superior animada */}
      <Animated.View
        style={[
          styles.half,
          styles.topFlap,
          { height: halfHeight },
          topFlapStyle,
        ]}
      >
        <Digit value={previous} height={height} />

        <Animated.View
          pointerEvents="none"
          style={[styles.shadow, topShadowStyle]}
        />
      </Animated.View>

      {/* Solapa inferior animada */}
      <Animated.View
        style={[
          styles.half,
          styles.bottomFlap,
          { height: halfHeight },
          bottomFlapStyle,
        ]}
      >
        <Digit value={current} height={height} bottom />

        <Animated.View
          pointerEvents="none"
          style={[styles.shadow, bottomShadowStyle]}
        />
      </Animated.View>

      {/* Línea divisoria */}
      <View style={styles.separator} />
    </View>
  );
}

interface DigitProps {
  value: string;
  height: number;
  bottom?: boolean;
}

function Digit({ value, height, bottom = false }: DigitProps) {
  return (
    <Text
      includeFontPadding={false}
      style={[
        styles.digit,
        {
          height,
          lineHeight: height,
          top: bottom ? -height / 2 : 0,
        },
      ]}
    >
      {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202020",
    borderRadius: 9,
    overflow: "hidden",
  },

  half: {
    position: "absolute",
    left: 0,
    right: 0,
    overflow: "hidden",
    backfaceVisibility: "hidden",
  },

  top: {
    top: 0,
    backgroundColor: "#292929",
  },

  bottom: {
    bottom: 0,
    backgroundColor: "#202020",
  },

  topFlap: {
    top: 0,
    zIndex: 3,
    backgroundColor: "#292929",
  },

  bottomFlap: {
    bottom: 0,
    zIndex: 4,
    backgroundColor: "#202020",
  },

  digit: {
    position: "absolute",
    left: 0,
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#FFFFFF",
    fontSize: 104,
    fontWeight: "300",
    fontVariant: ["tabular-nums"],
  },

  shadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
  },

  separator: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#111111",
    zIndex: 5,
  },
});
