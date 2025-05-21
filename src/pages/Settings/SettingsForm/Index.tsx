import { useForm } from "react-hook-form";
import { SettingsType } from "../../../utils/types";
import Button from "../../../components/Button";
import { useEffect } from "react";
import { supabase } from "../../../supabase/supabase";
import FormBlock from "../../../components/FormBlock";

type FormProps = {
  settings?: SettingsType;
};

function SettingsForm({ settings }: FormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsType>({
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

  const fields = [
    {
      name: "minimumNights",
      label: "Minimum nights/bookings",
      type: "number",
      value: 1,
      minMessage: "Minimum number of nights is 1",
    },
    {
      name: "maximumNights",
      label: "Maximum nights/bookings",
      type: "number",
      value: 1,
      minMessage: "Minimum number of nights is 1",
    },
    {
      name: "maximumGuests",
      label: "Maximum guests/bookings",
      type: "number",
      value: 1,
      minMessage: "Minimum number of guest is 1",
    },
    {
      name: "breakfastPrice",
      label: "Breakfast price",
      type: "number",
      value: 10,
      minMessage: "Minimum price is 10$",
    },
  ];

  return (
    <form className="settings__form" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <FormBlock
          key={field.name}
          {...field}
          register={register}
          errors={errors}
        />
      ))}
      <Button type="submit">Submit settings</Button>
    </form>
  );
}

export default SettingsForm;
