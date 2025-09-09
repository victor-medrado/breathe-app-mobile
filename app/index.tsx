import { Card } from "@/components/Card";
import { breathingTechniques } from "@/data/techniques";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleContent}>Breathe App</Text>
      </View>

      {breathingTechniques.map((technique) => (
        <Card
          key={technique.id}
          id={technique.id}
          title={technique.title}
          description={technique.description}
          icon={technique.icon}
          tags={technique.tags}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
  titleContainer: {
    height: 200,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleContent: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
});
