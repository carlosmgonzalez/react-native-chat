import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { useChannelStore } from "@/store/channel-store";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChannelScreen() {
  const channel = useChannelStore((state) => state.channel);
  const setChannel = useChannelStore((state) => state.setChannel);

  const { cid } = useLocalSearchParams<{ cid: string }>();
  const { client } = useChatContext();

  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid });
      setChannel(channels[0]);
    };

    fetchChannel();
  }, [cid]);

  if (!channel) {
    return <ActivityIndicator />;
  }

  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Channel",
        }}
      />
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </View>
  );
}
