import { useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "../supabase/supabase";
import { Cabin } from "../utils/types";
import { EditCabin, InsertNewCabin } from "../API/cabins";

export function useCabinForm(initialData: Cabin | null, onSuccess: () => void) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Cabin>({
    defaultValues: initialData ?? { id: self.crypto.randomUUID() },
  });

  const [img, setImg] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: Cabin) => {
    setLoading(true);
    try {
      if (img) {
        if (initialData) {
          await supabase.storage
            .from("cabin-photos")
            .remove([`cabin-${data.id}.jpg`]);
        }
        await supabase.storage
          .from("cabin-photos")
          .upload(`cabin-${data.id}.jpg`, img);
      }

      if (initialData) {
        await EditCabin(data);
      } else {
        await InsertNewCabin(data);
      }
      onSuccess();
    } catch (error) {
      console.error("Error handling form:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setImg,
    loading,
  };
}
