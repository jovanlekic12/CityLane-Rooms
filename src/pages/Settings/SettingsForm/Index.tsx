import { useForm } from "react-hook-form";
import { SettingsType } from "../../../utils/types";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/supabase";
import FormBlock from "../../../components/FormBlock";

type FormProps = {
  settings?: SettingsType;
};

function SettingsForm({ settings }: FormProps) {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const {} = await supabase
        .from("settings")
        .update(data)
        .eq("id", 0)
        .single();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
        <FormBlock<SettingsType>
          key={field.name}
          name={field.name as keyof SettingsType}
          label={field.label}
          type={field.type}
          value={field.value}
          minMessage={field.minMessage}
          register={register}
          errors={errors}
        />
      ))}
      <Button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Submit settings"}
      </Button>
    </form>
  );
}

export default SettingsForm;
