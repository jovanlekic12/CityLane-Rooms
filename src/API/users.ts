import { User } from "@supabase/supabase-js";
import { supabase } from "../supabase/supabase";
import { newUser } from "../utils/types";

export async function getAllUsers(
  params: URLSearchParams
): Promise<{ data: User[]; count: number | null }> {
  try {
    const { data: listResponse, error: listError } =
      await supabase.auth.admin.listUsers();

    if (listError) {
      console.error("Error listing users:", listError);
      return { data: [], count: null };
    }

    let users: User[] = listResponse.users;
    const sort = params.get("sortBy");
    const count = users.length;
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

    return { data: users as User[], count };
  } catch (err) {
    console.error("Unexpected error fetching users:", err);
    return { data: [], count: null };
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
