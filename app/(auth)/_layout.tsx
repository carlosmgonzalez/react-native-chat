import { View, Text } from "react-native";
import React from "react";
import { Redirect, Slot } from "expo-router";
import { useSessionStore } from "@/store/session-store";

export default function LayoutAuth() {
  const session = useSessionStore((state) => state.session);

  if (session?.user) {
    return <Redirect href="/(home)" />;
  }

  return <Slot />;
}
