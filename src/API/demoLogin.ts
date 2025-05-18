import { AuthResponse } from "@supabase/supabase-js";
import { supabase } from "../supabase/supabase";

type LogInProps = {
  userEmail: string;
  userPassword: string;
};

export async function logInUser({
  userEmail,
  userPassword,
}: LogInProps): Promise<AuthResponse> {
  const response = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  });

  return response;
}
