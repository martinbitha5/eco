import { Text } from "react-native";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0066FF",
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="manage"
        options={{
          title: "Gérer",
          tabBarIcon: ({ color }) => <TabIcon name="dollar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <TabIcon name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  name,
  color,
}: {
  name: "home" | "dollar" | "person";
  color: string;
}) {
  const icons: Record<string, string> = {
    home: "🏠",
    dollar: "💲",
    person: "👤",
  };
  return <Text style={{ fontSize: 22 }}>{icons[name] ?? "•"}</Text>;
}
