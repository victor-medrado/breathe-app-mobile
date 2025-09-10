import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { IconSymbol, IconSymbolName } from "./ui/IconSymbol";

interface ICardProps {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  tags?: string[];
}

export function Card({ id, title, description, icon, tags }: ICardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/breathing",
      params: { id: id },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <CardContainer>
        <CardHeader>
          {icon && (
            <IconWrapper>
              <IconSymbol
                size={24}
                color="#cec7bb"
                name={icon as IconSymbolName}
              />
            </IconWrapper>
          )}
          <Title>{title}</Title>
        </CardHeader>

        {description && <Description>{description}</Description>}
        {tags && (
          <TagsWrapper>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagsWrapper>
        )}
      </CardContainer>
    </Pressable>
  );
}

export const CardContainer = styled.View`
  gap: 16px;
  padding: 24px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
`;

export const CardHeader = styled.View`
  gap: 12px;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  max-width: 200px;
  font-weight: 600;
  color: #282828;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const TagsWrapper = styled.View`
  gap: 8px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Tag = styled.Text`
  font-size: 12px;
  font-weight: 600;
  background: #cec7bb;
  color: #282828;
  padding: 4px 8px;
  border-radius: 8px;
`;

export const IconWrapper = styled.View`
  background-color: #282828;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  text-align: center;
`;
