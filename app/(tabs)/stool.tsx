import * as schema from "@/db/schema";
import { Button } from "@react-navigation/elements";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { StyleSheet, Text, View } from "react-native";

export default function StoolScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const addEntry = async () => {
    try {
      await drizzleDb.insert(schema.stoolEntries).values({
        timestamp: new Date().toISOString(),
        bristol: 4,
        amount: 3,
        wipe_only: 0,
        blood: "none",
        mucus: "none",
        urgency: "none",
        pain: 0,
        incomplete: 0,
        color: "brown",
        time_spent_minutes: 300,
        notes: "Feeling good",
        image_uri: null,
      } as schema.StoolEntry);
    } catch (e) {
      console.error("Insert error:", e);
    }
  };

  const printEntries = async () => {
    const entries = await drizzleDb.select().from(schema.stoolEntries);
    console.log("Entries:", entries);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stool screen</Text>
      <Button onPress={addEntry}>Press Me</Button>
      <Button onPress={printEntries}>Print entries</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
