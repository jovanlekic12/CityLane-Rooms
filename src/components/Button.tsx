import { PropsWithChildren } from "react";

type ButtonProps = {
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  type?: string;
};

function Button({
  children,
  onClick,
  type,
  isActive,
  className,
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
    <button className={`${classes} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
