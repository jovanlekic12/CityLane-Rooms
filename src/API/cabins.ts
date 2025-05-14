import { supabase } from "../supabase/supabase";
import { Cabin } from "../utils/types";

export async function fetchCabins(params: URLSearchParams): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  // const query = supabase.from("cabins").select("*");
  console.log(params.get("discount"));
  if (error) throw new Error(error.message);

  return data as Cabin[];
}

export async function InsertNewCabin(cabin: Cabin) {
  const {} = await supabase
    .from("cabins")
    .insert([
      {
        id: cabin.id,
        name: cabin.name,
        capacity: cabin.capacity,
        price: cabin.price,
        discount: cabin.discount,
        description: cabin.description,
      },
    ])
    .select();
}

export async function EditCabin(cabin: Cabin) {
  const {} = await supabase
    .from("cabins")
    .update([
      {
        name: cabin.name,
        capacity: cabin.capacity,
        price: cabin.price,
        discount: cabin.discount,
        description: cabin.description,
      },
    ])
    .eq("id", cabin.id)
    .select();
}
