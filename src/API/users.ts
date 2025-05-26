import { supabase } from "../supabase/supabase";
import { newUser } from "../utils/types";

export async function getAllUsers() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) throw error;
  return data.users;
}

export async function inserNewUser({
  userPassword,
  userEmail,
  userFullname,
}: newUser) {
  const { error } = await supabase.auth.signUp({
    email: userEmail,
    password: userPassword,
    options: {
      data: {
        name: userFullname,
      },
    },
  });
  return { error };
}

export async function getUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    console.log(err);
  }
}
