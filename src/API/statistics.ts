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
