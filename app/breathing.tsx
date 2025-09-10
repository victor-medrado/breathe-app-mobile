import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { RootState } from "@/store";
import { pause, restart, resume } from "@/store/breathingSlice";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

export default function BreathingScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    technique,
    elapsedTime,
    cycleCount,
    isRunning,
    currentStep,
    stepElapsed,
  } = useSelector((state: RootState) => state.breathing);

  if (!technique) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleBack = () => {
    router.push("/");
  };

  const translateBreatheAction = (key: "inhale" | "hold" | "exhale") => {
    const actions: Record<typeof key, string> = {
      inhale: "inspire",
      hold: "segure",
      exhale: "expire",
    };
    return actions[key];
  };

  const current = technique.sequence[currentStep];
  const remainingTime = technique.sequence[currentStep].duration - stepElapsed;

  return (
    <MainContainer>
      <Container>
        <Header>
          <HeaderIcon>
            <IconSymbol
              name={technique.icon as IconSymbolName}
              color="#cec7bb"
            />
          </HeaderIcon>
          <HeaderTitle>{technique.title}</HeaderTitle>
          <HeaderParagraph>{technique.description}</HeaderParagraph>
        </Header>

        <TextContainer>
          <Label>{translateBreatheAction(current.action).toUpperCase()}</Label>
          <Label>{remainingTime}</Label>
        </TextContainer>

        <CounterContainer>
          <Counter>
            <CounterText>{formatTime(elapsedTime)}</CounterText>
            <CounterLabel>Tempo</CounterLabel>
          </Counter>

          <Counter>
            <CounterText>{cycleCount}</CounterText>
            <CounterLabel>Ciclos</CounterLabel>
          </Counter>
        </CounterContainer>

        <ButtonContainer>
          <Pressable
            onPress={() => (isRunning ? dispatch(pause()) : dispatch(resume()))}
          >
            <StyledButton>
              <IconSymbol name={isRunning ? "pause" : "play"} color="#282828" />
              <TextButton>{isRunning ? "Pausar" : "Retomar"}</TextButton>
            </StyledButton>
          </Pressable>

          <Pressable onPress={() => dispatch(restart())}>
            <StyledButton>
              <IconSymbol name="arrow.counterclockwise" color="#282828" />
              <TextButton>Reiniciar</TextButton>
            </StyledButton>
          </Pressable>

          <Pressable onPress={handleBack}>
            <StyledButton>
              <IconSymbol name="chevron.left" color="#282828" />
              <TextButton>Voltar</TextButton>
            </StyledButton>
          </Pressable>
        </ButtonContainer>
      </Container>
    </MainContainer>
  );
}

export const MainContainer = styled.ScrollView`
  height: 100%;
  background-color: #282828;
`;

export const Container = styled.View`
  margin: 0 auto;
  padding: 32px 16px;
  gap: 20px;
  background-color: #282828;
`;

export const Header = styled.View`
  margin-bottom: 160px;
`;

export const HeaderIcon = styled.View`
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: rgba(206, 199, 187, 0.25);
  border-radius: 9999px;
  border: 1px solid rgba(206, 199, 187, 0.55);
  margin-bottom: 16px;
  align-self: center;
  width: 58px;
  height: 58px;
`;

export const HeaderTitle = styled.Text`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 8px;
  color: #cec7bb;
  align-self: center;
`;

export const HeaderParagraph = styled.Text`
  font-size: 16px;
  color: #cec7bb;
  text-align: center;
  max-width: 280px;
  align-self: center;
`;

export const CounterContainer = styled.View`
  margin-top: 160px;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

export const Counter = styled.View`
  align-self: center;
`;

export const CounterText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #cec7bb;
  align-self: center;
`;

export const CounterLabel = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: #cec7bb;
`;

export const ButtonContainer = styled.View`
  gap: 8px;
  margin-top: 32px;
`;

export const TextContainer = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: #cec7bb;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: #cec7bb;
`;

export const StyledButton = styled.View`
  background-color: #cec7bb;
  border-radius: 8px;
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  color: #282828;
`;
