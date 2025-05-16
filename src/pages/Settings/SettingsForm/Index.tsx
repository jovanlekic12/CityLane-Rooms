import { useForm } from "react-hook-form";
import { SettingsType } from "../../../utils/types";
import Button from "../../../components/Button";
import { useEffect } from "react";
import { supabase } from "../../../supabase/supabase";

type FormProps = {
  settings?: SettingsType;
};

function SettingsForm({ settings }: FormProps) {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: settings,
  });
  useEffect(() => {
    reset(settings);
  }, [settings, reset]);

  async function onSubmit(data: SettingsType) {
    const { error } = await supabase
      .from("settings")
      .update(data)
      .eq("id", 0)
      .single();
    if (error) throw error;
  }

  return (
    <form
      className="settings__form"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <div className="form__div">
        <label className="form__label">Minimum nights/bookings</label>
        <input
          type="number"
          {...register("minimumNights", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum number of nights is 1",
            },
          })}
        />
        {errors.minimumNights && (
          <p className="form__err">{errors.minimumNights.message}</p>
        )}
      </div>
      <div className="form__div">
        <label className="form__label">Maximum nights/bookings</label>
        <input
          type="number"
          {...register("maximumNights", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum number of nights is 1",
            },
          })}
        />
        {errors.maximumNights && (
          <p className="form__err">{errors.maximumNights.message}</p>
        )}
      </div>
      <div className="form__div">
        <label className="form__label">Maximum guests/bookings</label>
        <input
          type="number"
          {...register("maximumGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum number of guest is 1",
            },
          })}
        />
        {errors.maximumGuests && (
          <p className="form__err">{errors.maximumGuests.message}</p>
        )}
      </div>
      <div className="form__div">
        <label className="form__label">Breakfast price</label>
        <input
          type="number"
          {...register("breakfastPrice", {
            required: "This field is required",
            min: {
              value: 10,
              message: "Minimum price is 10$",
            },
          })}
        />
        {errors.breakfastPrice && (
          <p className="form__err">{errors.breakfastPrice.message}</p>
        )}
      </div>
      <Button type="submit">Submit settings</Button>
    </form>
  );
}

export default SettingsForm;
