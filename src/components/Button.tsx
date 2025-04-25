import { PropsWithChildren } from "react";

type ButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  type?: string;
};

function Button({
  children,
  onClick,
  type,
  isActive,
}: PropsWithChildren<ButtonProps>) {
  const rootClass = "btn";

  const classes = [
    rootClass,
    type && `${rootClass}-${type}`,
    isActive && `${rootClass}-${isActive}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={`${classes}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
