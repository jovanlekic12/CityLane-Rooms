import { supabase } from "../supabase/supabase";
import { StatisticsType } from "../utils/types";

export async function fetchGeneralStatistics(
  dateRange: string
): Promise<StatisticsType[]> {
  const { data } = await supabase
    .from("general-statistics")
    .select("*")
    .eq("date_range", dateRange);
  return data ?? [];
}

export async function fetchCabinsStatistics(
  dateRange: string
): Promise<StatisticsType[]> {
  const { data } = await supabase
    .from("cabins-statistics")
    .select("name,value")
    .eq("date_range", dateRange);
  return data ?? [];
}
