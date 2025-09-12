import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components/native";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, fadeAnim]);

  return (
    <MainContainer>
      <AnimatedSplashImage
        source={require("../assets/images/animated.png")}
        style={{ opacity: fadeAnim }}
      />
      <HeaderTitle>Breathe</HeaderTitle>
    </MainContainer>
  );
}

export const MainContainer = styled.View`
  flex: 1;
  background-color: #282828;
  justify-content: center;
  align-items: center;
`;

export const HeaderIcon = styled.View`
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: rgba(206, 199, 187, 0.25);
  border-radius: 9999px;
  border: 1px solid rgba(206, 199, 187, 0.55);
  margin-bottom: 8px;
  align-self: center;
  width: 58px;
  height: 58px;
`;

export const HeaderTitle = styled.Text`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #cec7bb;
  align-self: center;
`;

const AnimatedSplashImage = styled(Animated.Image)`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;
