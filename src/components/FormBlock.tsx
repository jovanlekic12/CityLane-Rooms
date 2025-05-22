import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  ValidationRule,
} from "react-hook-form";
import { SettingsType } from "../utils/types";

type FormBlockProps = {
  name: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldErrors>;
  value?: number;
  minMessage?: string;
};

type validationRules = {
  required: string;
};

function FormBlock({
  name,
  label,
  type,
  register,
  errors,
  value,
  minMessage,
}: FormBlockProps) {
  const validationRules: validationRules = {
    required: `${label} is required`,
  };

  return (
    <div className="form__div">
      <label className="form__label">{label}</label>
      <input
        type={type}
        {...register(name, validationRules)}
        className="form__input"
      />
      {errors[name]?.message && (
        <p className="form__err">{errors[name]?.message as string}</p>
      )}
    </div>
  );
}

export default FormBlock;
