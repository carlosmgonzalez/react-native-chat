import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface State {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const useSessionStore = create<State>()((set) => ({
  session: null,
  setSession: (data) => {
    set({ session: data });
  },
}));
