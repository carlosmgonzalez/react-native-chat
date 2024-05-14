import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const useSessionStore = create<State>()(
  persist(
    (set) => ({
      session: null,
      setSession: (data) => {
        set({ session: data });
      },
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
