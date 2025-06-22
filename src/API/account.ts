import { toast } from "react-toastify";
import { supabase } from "../supabase/supabase";

export async function UpdateUser(userEmail: string, userFullName: string) {
  try {
    const {} = await supabase.auth.updateUser({
      email: userEmail,
      data: { FullName: userFullName },
    });
  } catch (err) {
    console.log(err);
  } finally {
    toast("User updated successfully");
  }
}
