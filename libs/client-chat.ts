import { StreamChat } from "stream-chat";

export const client = StreamChat.getInstance(
  process.env.EXPO_PUBLIC_GET_STREAM_API_KEY || ""
);
