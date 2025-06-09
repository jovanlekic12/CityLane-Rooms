import { isFuture, isPast, isToday } from "date-fns";
import { supabase } from "../supabase/supabase";
import { Booking } from "../utils/types";
import { bookings } from "../data/data-bookings";
import { cabins } from "../data/data-cabins";
import { subtractDates } from "../utils/helpers";
import { pricePerBreakfast } from "../utils/constants";
import { toast } from "react-toastify";
export async function fetchBookings(
  params: URLSearchParams,
  firstBookingIndex: number,
  lastBookingIndex: number
): Promise<{ data: Booking[]; count: number | null }> {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", { count: "exact" })
    .range(firstBookingIndex, lastBookingIndex);

  const status = params.get("status");
  if (status === "checked-out") {
    query = query.eq("status", "Checked out");
  } else if (status === "checked-in") {
    query = query.eq("status", "Checked in");
  } else if (status === "unconfirmed") {
    query = query.eq("status", "Unconfirmed");
  }

  const sort = params.get("sortBy");
  switch (sort) {
    case "startDate-asc":
      query = query.order("startDate", { ascending: true });
      break;
    case "StartDate-desc":
      query = query.order("startDate", { ascending: false });
      break;
    case "totalPrice-asc":
      query = query.order("totalPrice", { ascending: true });
      break;
    case "totalPrice-desc":
      query = query.order("totalPrice", { ascending: false });
      break;
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching bookings:", error);
    return { data: [], count: null };
  }

  return { data: data as Booking[], count };
}

export const createBookings = async () => {
  try {
    const finalBookings = bookings.map((booking) => {
      const cabin = cabins.at(booking.cabinId - 1);
      if (!cabin) return;
      const numNights = subtractDates(booking.endDate, booking.startDate);
      const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
      const extrasPrice = booking.hasBreakfast
        ? numNights * pricePerBreakfast * booking.numGuests
        : 0;
      const totalPrice = cabinPrice + extrasPrice;

      let status;
      if (
        isPast(new Date(booking.endDate)) &&
        !isToday(new Date(booking.endDate))
      )
        status = "Checked out";
      if (
        isFuture(new Date(booking.startDate)) ||
        isToday(new Date(booking.startDate))
      )
        status = "Unconfirmed";
      if (
        (isFuture(new Date(booking.endDate)) ||
          isToday(new Date(booking.endDate))) &&
        isPast(new Date(booking.startDate)) &&
        !isToday(new Date(booking.startDate))
      )
        status = "Checked in";

      return {
        ...booking,
        numNights,
        cabinPrice,
        extrasPrice,
        totalPrice,
        status,
      };
    });

    const { error } = await supabase.from("bookings").insert(finalBookings);
    if (error) console.error(error.message);
  } catch (error) {
    console.error(error);
  }
};

export async function fetchSingleBooking(
  id: string | undefined
): Promise<Booking | undefined> {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*,cabins(name),guests(fullName,email,countryFlag,nationalID)")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return undefined;
    }

    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export async function deleteSingleBooking(id: string) {
  try {
    const {} = await supabase.from("bookings").delete().eq("id", id);
  } catch (error) {
    console.log(error);
  } finally {
    toast("Booking succesfully deleted");
  }
}

export async function updateBookingStatus(id: string, newStatus: string) {
  try {
    const {} = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", id);
  } catch (error) {
    console.log(error);
  } finally {
    toast(
      newStatus === "Checked in"
        ? "Booking succesfully checked in ✔"
        : "Booking succesfully checked out ✔"
    );
  }
}
