import { User } from "@supabase/supabase-js";
import { supabase } from "../supabase/supabase";
import { newUser } from "../utils/types";

export async function getAllUsers(params: URLSearchParams): Promise<User[]> {
  try {
    const { data: listResponse, error: listError } =
      await supabase.auth.admin.listUsers();

    if (listError) {
      console.error("Error listing users:", listError);
      return [];
    }

    let users: User[] = listResponse.users;
    const sort = params.get("sortBy");

    if (sort === "name-asc") {
      users = users.sort((a, b) => {
        const nameA = (a.user_metadata?.fullName || "").toLowerCase();
        const nameB = (b.user_metadata?.fullName || "").toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else if (sort === "name-desc") {
      users = users.sort((a, b) => {
        const nameA = (a.user_metadata?.fullName || "").toLowerCase();
        const nameB = (b.user_metadata?.fullName || "").toLowerCase();
        return nameB.localeCompare(nameA);
      });
    } else if (sort === "created-asc") {
      users = users.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else if (sort === "created-desc") {
      users = users.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    return users;
  } catch (err) {
    console.error("Unexpected error fetching users:", err);
    return [];
  }
}

export async function inserNewUser({
  userPassword,
  userEmail,
  userFullname,
}: newUser) {
  const { data, error } = await supabase.auth.signUp({
    email: userEmail,
    password: userPassword,
    options: {
      data: {
        fullName: userFullname,
      },
    },
  });
  return {
    user: data?.user ?? null,
    error,
  };
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
