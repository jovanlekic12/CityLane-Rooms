import { supabase } from "../supabase/supabase";

export async function getAllUsers() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) throw error;
  return data.users;
}
