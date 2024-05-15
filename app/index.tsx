import { View, Text } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/libs/supabase";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/session-store";

export default function InitialPage() {
  // const [session, setSession] = useState<Session | null>(null);

  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: sessionData } }) => {
      setSession(sessionData);
    });
  }, []);

  return (
    <>
      {session ? (
        <Redirect href={"/(home)/(tabs)"} />
      ) : (
        <Redirect href={"/sign-in"} />
      )}
    </>
  );
}
