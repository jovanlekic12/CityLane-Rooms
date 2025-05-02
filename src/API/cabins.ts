import { supabase } from "../supabase/supabase";
import { Cabin } from "../utils/types";

export async function fetchCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error(error.message);

  return data as Cabin[];
}

export async function InsertNewCabin(cabin:Cabin) {
  const {}  = await supabase
  .from('cabins')
  .insert([
    { id: cabin.id,name: cabin.name, img: cabin.img, capacity:cabin.capacity, price:cabin.price, discount: cabin.discount, description: cabin.description },
  ])
  .select()
}