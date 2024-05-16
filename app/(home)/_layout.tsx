import { ChatProvider } from "@/components/providers/chat-provider";
import { useSessionStore } from "@/store/session-store";
import { Redirect, Stack, router } from "expo-router";

export default function LayoutHome() {
  const session = useSessionStore((state) => state.session);

  if (!session?.user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <ChatProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ChatProvider>
  );
}
