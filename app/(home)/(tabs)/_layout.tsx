import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Text } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: "#fff",
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          // title: "Chats",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="comments-o"
              color={focused ? "#3e80fa" : "#aba4a4"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#3e80fa" : "#aba4a4", fontSize: 12 }}
            >
              Chat
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="user" color={focused ? "#3e80fa" : "#aba4a4"} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#3e80fa" : "#aba4a4", fontSize: 12 }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
