import { client } from "@/libs/client-chat";
import { downloadImage } from "@/libs/download-image";
import { supabase } from "@/libs/supabase";
import { useSessionStore } from "@/store/session-store";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ChannelList, Chat, OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
// import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  const session = useSessionStore((state) => state.session);

  useEffect(() => {
    if (!session) {
      router.push("/sign-in");
    }

    const connectUser = async () => {
      try {
        const { data } = await supabase
          .from("profiles")
          .select("username, website, avatar_url")
          .eq("id", session!.user.id)
          .single();

        if (!data) {
          return console.log("Error");
        }

        const avatarUrl = await downloadImage(data.avatar_url);

        await client.connectUser(
          {
            id: session!.user.id,
            image: avatarUrl,
            username: data.username || undefined,
          },
          client.devToken(session!.user.id)
        );
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log(error);
        }
      }
    };

    connectUser();
  }, [session]);

  return (
    <OverlayProvider>
      <Chat client={client}>
        <ChannelList />
      </Chat>
    </OverlayProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
