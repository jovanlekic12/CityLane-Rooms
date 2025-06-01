import { supabase } from "../supabase/supabase";
import { Booking } from "../utils/types";

export async function fetchBookings(
  // params: URLSearchParams,
  firstBookingIndex: number,
  lastBookingIndex: number
): Promise<Booking[]> {
  let query = supabase
    .from("bookings")
    .select("*", { count: "exact" })
    .range(firstBookingIndex, lastBookingIndex);

  // const status = params.get("status");
  // if (status === "checked-out") {
  //   query = query.gt("status", 0);
  // } else if (status === "checked-in") {
  //   query = query.eq("checked-in", 0);
  // } else if (status === "unconfirmed") {
  //   query = query.eq("dada", 0);
  // }

  // const sort = params.get("sortBy");
  // switch (sort) {
  //   case "name-asc":
  //     query = query.order("name", { ascending: true });
  //     break;
  //   case "name-desc":
  //     query = query.order("name", { ascending: false });
  //     break;
  //   case "price-asc":
  //     query = query.order("price", { ascending: true });
  //     break;
  //   case "price-desc":
  //     query = query.order("price", { ascending: false });
  //     break;
  //   case "capacity-asc":
  //     query = query.order("capacity", { ascending: true });
  //     break;
  //   case "capacity-desc":
  //     query = query.order("capacity", { ascending: false });
  //     break;
  // }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  return data as Booking[];
}
