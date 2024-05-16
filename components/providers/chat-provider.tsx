import { useEffect, useState } from "react";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { supabase } from "@/libs/supabase";
import { StreamChat } from "stream-chat";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProfileStore } from "@/store/profile-store";

interface Props {
  children: React.ReactNode;
}

export const ChatProvider = ({ children }: Props) => {
  const client = StreamChat.getInstance(
    process.env.EXPO_PUBLIC_GET_STREAM_API_KEY || ""
  );

  const profile = useProfileStore((state) => state.profile);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const connect = async () => {
      try {
        if (!profile?.id) return;

        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(profile.avatar_url);

        await client.connectUser(
          {
            id: profile.id,
            image: data.publicUrl,
            username: profile.username || undefined,
          },
          client.devToken(profile.id)
        );

        setIsReady(true);

        // const channel = client.channel("messaging", {
        //   members: [
        //     "53bc62e5-cff1-4ec8-a95d-ff7431072577",
        //     "dc3dfba5-987f-4231-bd36-abe074fdb8a4",
        //   ],
        //   name: "The Park",
        // });

        // await channel.create();
      } catch (error) {
        console.log(error);
      }
    };

    connect();

    return () => {
      if (isReady) client.disconnectUser();
      setIsReady(false);
    };
  }, [profile?.id]);

  if (!isReady) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size={40} color={"#3e80fa"} />
      </SafeAreaView>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};
