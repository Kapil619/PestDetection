import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Main from "./src/navigation/Main";
import { ActivityIndicator, View } from "react-native";
import { useEffect, useState } from "react";
import { AuthChanged } from "./src/utils/firebaseMethods";
import { User } from "@firebase/auth";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"green"} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Main user={user} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
