import { supabase } from "./supabase";

export const downloadImage = async (path: string) => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);

    if (error) {
      throw error;
    }

    const fr = new FileReader();
    fr.readAsDataURL(data);
    fr.onload = () => {
      return fr.result;
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error downloading image: ", error.message);
    }
  }
};
