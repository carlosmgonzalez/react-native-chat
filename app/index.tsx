import { Redirect } from "expo-router";

export default function InitialPage() {
  return <Redirect href={"/sign-in"} />;
}
