import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { supabase } from "@/libs/supabase";
import { useSessionStore } from "@/store/session-store";
import { UserListItem } from "@/components/user-list-item";

export interface User {
  id: string;
  full_name: string;
  avatar_url: string;
}

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const session = useSessionStore((state) => state.session);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .neq("id", session?.user.id);
      if (error) return console.log(error);
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Users" }} />
      <FlatList
        data={users}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => <UserListItem user={item} />}
      />
    </>
  );
}
