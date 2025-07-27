import * as schema from "@/db/schema";
import { Button } from "@react-navigation/elements";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const truncateDB = async () => {
    try {
      await drizzleDb.delete(schema.stoolEntries);
      console.log("Database truncated successfully");
    } catch (e) {
      console.error("Error truncating database:", e);
    }
  };

  const resetDb = async () => {
    try {
      // This is a placeholder for the actual reset logic
      db.execSync("");
      console.log("Resetting database...");
      db.execSync("DROP TABLE stool_entries");
      console.log("Database reset successfully");
    } catch (e) {
      console.error("Error resetting database:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
      <Button onPress={truncateDB}>Truncate DB</Button>
      <Button onPress={resetDb}>Reset DB</Button>
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
