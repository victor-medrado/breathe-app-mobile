import { Card } from "@/components/Card";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { breathingTechniques } from "@/data/techniques";
import { setTechnique } from "@/store/breathingSlice";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePress = (id: string) => {
    const selectedTechnique = breathingTechniques.find(
      (tech) => tech.id === id
    );

    if (selectedTechnique) {
      dispatch(setTechnique(selectedTechnique));
      router.push({
        pathname: "/breathing",
        params: { id: selectedTechnique.id },
      });
    }
  };

  return (
    <MainContainer>
      <Container>
        <View>
          <HeaderAppName>
            <IconSymbol name="wind" color="#cec7bb" />
            <AppNameText>Breathe</AppNameText>
          </HeaderAppName>

          <HeaderTitle>Respiração Guiada</HeaderTitle>
          <HeaderParagraph>
            Técnicas de respiração para relaxamento, foco e bem-estar
          </HeaderParagraph>
        </View>
        <Grid>
          {breathingTechniques.map((technique) => (
            <Card
              key={technique.id}
              title={technique.title}
              description={technique.description}
              icon={technique.icon}
              tags={technique.tags}
              onPress={() => handlePress(technique.id)}
            />
          ))}
        </Grid>
      </Container>
    </MainContainer>
  );
}

export const MainContainer = styled.ScrollView`
  height: 100%;
  background-color: #282828;
`;

export const Container = styled.View`
  padding: 60px 32px;
  gap: 32px;
  max-width: 560px;
  align-self: center;
`;

export const HeaderAppName = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: rgba(206, 199, 187, 0.25);
  border-radius: 9999px;
  border-width: 1px;
  border-color: rgba(206, 199, 187, 0.55);
  margin-bottom: 16px;
  align-self: center;
`;

export const AppNameText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #cec7bb;
`;

export const Grid = styled.View`
  gap: 24px;
`;

export const HeaderTitle = styled.Text`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
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
