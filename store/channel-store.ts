import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Channel as ChannelType } from "stream-chat";

interface State {
  channel: ChannelType | null;
  setChannel: (channel: ChannelType) => void;
}

export const useChannelStore = create<State>()((set) => ({
  channel: null,
  setChannel: (channel) => {
    set({ channel });
  },
}));
