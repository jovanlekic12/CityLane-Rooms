import { supabase } from "../supabase/supabase";

export async function fetchCabins() {
  try {
    let { data: cabins, error } = await supabase.from("cabins").select("*");
    console.log(cabins);
  } catch (error) {
    console.log(error);
  }
}
