import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

type Profile = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
};

interface State {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

export const useProfileStore = create<State>()((set) => ({
  profile: null,
  setProfile: (data) => {
    set({ profile: data });
  },
}));
