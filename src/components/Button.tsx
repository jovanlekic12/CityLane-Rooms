import { PropsWithChildren } from "react";

type ButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  type?: string;
  disabled?: boolean;
};

function Button({
  children,
  onClick,
  type,
  isActive,
  disabled,
}: PropsWithChildren<ButtonProps>) {
  const rootClass = "btn";

  const classes = [
    rootClass,
    type && `${rootClass}-${type}`,
    isActive && `${rootClass}-active`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button disabled={disabled} className={`${classes}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
