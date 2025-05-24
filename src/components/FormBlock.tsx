import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";

type FormBlockProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  value?: number;
  minMessage?: string;
  validationError?: string | null;
};

function FormBlock<T extends FieldValues>({
  name,
  label,
  type,
  register,
  errors,
  value,
  minMessage,
}: FormBlockProps<T>) {
  const validationRules = {
    required: `${label} is required`,
    ...(value !== undefined && minMessage
      ? { min: { value, message: minMessage } }
      : {}),
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
        <p className="form__err">{errors[name]!.message as string}</p>
      )}
    </div>
  );
}

export default FormBlock;
