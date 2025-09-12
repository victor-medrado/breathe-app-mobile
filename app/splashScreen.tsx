import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import styled from "styled-components/native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <MainContainer>
      <HeaderIcon>
        <IconSymbol name="wind" color="#cec7bb" />
      </HeaderIcon>
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
