import { useChannelStore } from "@/store/channel-store";
import { useSessionStore } from "@/store/session-store";
import { router } from "expo-router";
import { ChannelList } from "stream-chat-expo";

export default function ChatScreen() {
  const setChannel = useChannelStore((state) => state.setChannel);
  const session = useSessionStore((state) => state.session);

  return (
    <ChannelList
      filters={{ members: { $in: [session?.user.id!] } }}
      onSelect={(channel) => {
        setChannel(channel);
        router.push(`/(home)/channel/${channel.cid}`);
      }}
    />
  );
}
