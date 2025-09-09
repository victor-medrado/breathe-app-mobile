import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
      <View style={styles.cardContainer}>
        <View>
          {icon && (
            <IconSymbol
              size={24}
              color="#cec7bb"
              name={icon as IconSymbolName}
            />
          )}
          <Text>{title}</Text>
        </View>

        {description && <Text>{description}</Text>}
        {tags && (
          <View>
            {tags.map((tag) => (
              <Text key={tag}>{tag}</Text>
            ))}
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 24,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    backgroundColor: "#fff",
  },
});
