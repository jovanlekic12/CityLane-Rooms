import { supabase } from "../supabase/supabase";

export async function UpdateUser(userFullName: string): Promise<void> {
  try {
    const {} = await supabase.auth.updateUser({
      data: { FullName: userFullName },
    });
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateUserPicture(
  img: File | null,
  id: string
): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from("user-photos")
      .remove([`${id}.jpg`]);

    if (error) {
      console.log(error);
    }

    if (img) {
      const {} = await supabase.storage
        .from("user-photos")
        .upload(`${id}.jpg`, img);
    }
  } catch (err) {
    console.log(err);
  }
}
