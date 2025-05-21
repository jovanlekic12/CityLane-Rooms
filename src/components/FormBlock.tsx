import { FieldErrors, UseFormRegister } from "react-hook-form";

type FormBlockProps = {
  name: string;
  label: string;
  type: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  value?: number;
  minMessage?: string;
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
  const validationRules: any = {
    required: `${label} is required`,
  };

  if (value !== undefined && minMessage) {
    validationRules.min = {
      value,
      message: minMessage,
    };
  }

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
