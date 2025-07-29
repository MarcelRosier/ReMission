import { Link } from "expo-router";
import { Text, View } from "react-native";

import { ThemeToggle } from "@/components/ThemeToggle";
export default function Index() {
  return (
    <View className="flex-1 bg-gray-800 items-center justify-center">
      <Text className="text-xl font-bold text-blue-500 dark:text-blue-400">
        Home screen
      </Text>
      <Link href="/about" className="text-xl underline text-white mt-4">
        Go to About screen
      </Link>
      <ThemeToggle />
    </View>
  );
}
