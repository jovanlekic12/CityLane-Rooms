import { supabase } from "../supabase/supabase";

export async function fetchCabins() {
  try {
    const { data: cabins } = await supabase.from("cabins").select("*");
    console.log(cabins);
  } catch (error) {
    console.log(error);
  }
}
