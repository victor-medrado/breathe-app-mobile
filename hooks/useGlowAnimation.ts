import {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

export function useGlowAnimation(
  glowProgress: SharedValue<number>,
  index: number
) {
  const initialScale = useDerivedValue(() => 1 + index * 0.14);

  const initialOpacity = useDerivedValue(() => 0.5 - index * 0.08);

  const animatedGlowStyle = useAnimatedStyle(() => {
    const scale = initialScale.value + glowProgress.value * 0.24;
    const opacity = initialOpacity.value;

    return {
      transform: [{ scale: scale }],
      opacity: opacity,
    };
  });

  return animatedGlowStyle;
}
