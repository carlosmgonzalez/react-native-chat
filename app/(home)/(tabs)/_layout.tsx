import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Text, View } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
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
          headerRight: (props) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 15,
                }}
              >
                <Link href={"/(home)/users"}>
                  <FontAwesome name="users" size={20} color="gray" />
                </Link>
              </View>
            );
          },
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
          headerTitle: "Profile",
        }}
      />
    </Tabs>
  );
}
