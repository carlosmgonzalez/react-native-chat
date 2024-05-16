import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { User } from "@/app/(home)/users";
import { supabase } from "@/libs/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useChatContext } from "stream-chat-expo";
import { useSessionStore } from "@/store/session-store";
import { router } from "expo-router";

export const UserListItem = ({ user }: { user: User }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const session = useSessionStore((state) => state.session);

  useEffect(() => {
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(user.avatar_url);

    setAvatarUrl(data.publicUrl);
  }, []);

  const { client } = useChatContext();

  const onPress = async () => {
    const channel = client.channel("messaging", {
      members: [session?.user.id!, user.id],
      name: user.full_name,
    });

    await channel.watch();
    router.replace(`/(home)/channel/${channel.cid}`);
  };

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: "white",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View>
        {avatarUrl && <Image source={{ uri: avatarUrl }} />}
        <Text style={{ fontWeight: "600" }}>{user.full_name}</Text>
      </View>
      <Pressable
        onPress={onPress}
        // style={{ borderWidth: 1, borderRadius: 5, padding: 3 }}
      >
        <FontAwesome name="send-o" size={25} color="#3e80fa" />
      </Pressable>
    </View>
  );
};
