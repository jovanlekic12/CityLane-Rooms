import { supabase } from "../supabase/supabase";
import { SettingsType } from "../utils/types";

export async function fetchSettings(): Promise<SettingsType> {
  const { data } = await supabase.from("settings").select("*").single();
  return data;
}
