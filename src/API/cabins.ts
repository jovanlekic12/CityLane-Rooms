import { supabase } from "../supabase/supabase";
import { Cabin } from "../utils/types";

export async function fetchCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error(error.message);

  return data as Cabin[];
}
