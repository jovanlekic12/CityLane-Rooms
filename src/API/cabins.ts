import { toast } from "react-toastify";
import { supabase } from "../supabase/supabase";
import { Cabin } from "../utils/types";

export async function fetchCabins(
  params: URLSearchParams,
  firstCabinIndex: number,
  lastCabinIndex: number
): Promise<{ data: Cabin[]; count: number | null }> {
  let query = supabase
    .from("cabins")
    .select("*", { count: "exact" })
    .range(firstCabinIndex, lastCabinIndex);

  const discount = params.get("discount");
  if (discount === "discount") {
    query = query.gt("discount", 0);
  } else if (discount === "no-discount") {
    query = query.eq("discount", 0);
  }

  const sort = params.get("sortBy");
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

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching cabins:", error);
    return { data: [], count: null };
  }

  return { data: data as Cabin[], count };
}

export async function InsertNewCabin(cabin: Cabin) {
  try {
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
  } catch (error) {
    console.log(error);
    toast("Error adding new cabin");
  } finally {
    toast("New cabin successfully added");
  }
}

export async function EditCabin(cabin: Cabin) {
  try {
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
  } catch (error) {
    console.log(error);
    toast(`Error edditing ${cabin.name} cabin`);
  } finally {
    toast(`Cabin ${cabin.name} information successfully edited`);
  }
}
