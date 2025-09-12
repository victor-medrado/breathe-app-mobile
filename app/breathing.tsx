import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { useGlowAnimation } from "@/hooks/useGlowAnimation";
import { RootState } from "@/store";
import { pause, reset, restart, resume, tick } from "@/store/breathingSlice";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, Vibration } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
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
  const circleScale = useSharedValue(1);
  const textOpacity = useSharedValue(0);
  const textPosition = useSharedValue(10);
  const glowProgress = useSharedValue(0);

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: circleScale.value }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ translateY: textPosition.value }],
    };
  });

  const animatedGlowStyle1 = useGlowAnimation(glowProgress, 1);
  const animatedGlowStyle2 = useGlowAnimation(glowProgress, 2);
  const animatedGlowStyle3 = useGlowAnimation(glowProgress, 3);
  const animatedGlowStyle4 = useGlowAnimation(glowProgress, 4);
  const animatedGlowStyle5 = useGlowAnimation(glowProgress, 5);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => {
      clearInterval(interval);
      Vibration.cancel();
    };
  }, [isRunning, dispatch]);

  useEffect(() => {
    if (!isRunning || !technique) return;

    const current = technique.sequence[currentStep];

    Vibration.vibrate(50);

    let newScale = 1;
    if (current.action === "inhale") {
      newScale = 1.5;
    } else if (current.action === "exhale") {
      newScale = 1;
    } else if (current.action === "hold") {
      newScale = getHoldScale();
    }

    circleScale.value = withTiming(newScale, {
      duration: current.duration * 1000,
    });

    let newGlowProgress = 0;
    if (current.action === "inhale") {
      newGlowProgress = 1;
    } else if (current.action === "exhale") {
      newGlowProgress = 0;
    } else if (current.action === "hold") {
      const prevStep =
        currentStep > 0
          ? technique.sequence[currentStep - 1]
          : technique.sequence[technique.sequence.length - 1];

      newGlowProgress =
        prevStep.action === "inhale" || prevStep.action === "hold" ? 1 : 0;
    }

    glowProgress.value = withTiming(newGlowProgress, {
      duration: current.duration * 1000,
    });

    textOpacity.value = withTiming(1, { duration: 500 });
    textPosition.value = withTiming(0, { duration: 500 });
  }, [currentStep, isRunning, technique]);

  if (!technique) return null;

  const current = technique.sequence[currentStep];
  const remainingTime = technique.sequence[currentStep].duration - stepElapsed;

  const prevStep =
    currentStep > 0
      ? technique.sequence[currentStep - 1]
      : technique.sequence[technique.sequence.length - 1];

  function getHoldScale() {
    if (current.action !== "hold") return 1;
    return prevStep.action === "inhale" ? 1.5 : 1;
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleBack = () => {
    dispatch(reset());
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

        <AnimationContainer>
          <GlowCircle style={animatedGlowStyle1} />
          <GlowCircle style={animatedGlowStyle2} />
          <GlowCircle style={animatedGlowStyle3} />
          <GlowCircle style={animatedGlowStyle4} />
          <GlowCircle style={animatedGlowStyle5} />

          {!isRunning ? (
            <Pressable onPress={() => dispatch(resume())}>
              <AnimatedView>
                <TextContainer>
                  <Label>Iniciar</Label>
                </TextContainer>
              </AnimatedView>
            </Pressable>
          ) : (
            <AnimatedView style={animatedCircleStyle}>
              <TextContainer>
                <Label style={animatedTextStyle}>
                  {translateBreatheAction(current.action).toUpperCase()}
                </Label>
                <Label>{remainingTime}</Label>
              </TextContainer>
            </AnimatedView>
          )}
        </AnimationContainer>

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
              <TextButton>{isRunning ? "Pausar" : "Iniciar"}</TextButton>
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
  margin-bottom: 80px;
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
  margin-top: 80px;
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
`;

export const TextContainer = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: #cec7bb;
`;

export const Label = styled(Animated.Text)`
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

export const AnimationContainer = styled.View`
  position: relative;
  align-self: center;
  width: 200px;
  height: 200px;
`;

export const AnimatedView = styled(Animated.View)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #282828;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

export const GlowCircle = styled(Animated.View)`
  width: 200px;
  height: 200px;
  border-radius: 999px;
  position: absolute;
  background-color: #cec7bb;
`;
