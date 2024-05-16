import { StyleSheet } from "react-native";
import { Account } from "@/components/auth/account";
import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/session-store";
import { router } from "expo-router";

export default function ProfileScreen() {
  const session = useSessionStore((state) => state.session);

  useEffect(() => {
    if (!session) {
      router.push("/sign-in");
    }
  }, [session]);

  return <Account session={session!} />;
}
