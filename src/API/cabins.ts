import { supabase } from "../supabase/supabase";
import { Cabin } from "../utils/types";

export async function fetchCabins(params: URLSearchParams): Promise<Cabin[]> {
  let query = supabase.from("cabins").select("*");

  const discount = params.get("discount");
  if (discount === "discount") {
    query = query.gt("discount", 0);
  } else if (discount === "no-discount") {
    query = query.eq("discount", 0);
  }

  const sort = params.get("sort");
  console.log(sort);
  switch (sort) {
    case "name-asc":
      query = query.order("name", { ascending: true });
      break;
    case "name-desc":
      query = query.order("name", { ascending: false });
      break;
    case "price-asc":
      query = query.order("price", { ascending: true });
      break;
    case "price-desc":
      query = query.order("price", { ascending: false });
      break;
    case "capacity-asc":
      query = query.order("capacity", { ascending: true });
      break;
    case "capacity-desc":
      query = query.order("capacity", { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching cabins:", error);
    return [];
  }

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
