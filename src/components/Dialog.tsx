import { ReactNode, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

type Option = {
  svg: ReactNode;
  text: string;
};

type DialogProps = {
  onClickOutside: () => void;
  options: Option[];
};

export const Dialog = ({ onClickOutside, options }: DialogProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);

  return (
    <div ref={ref} className="dialog-component">
      {options.map((option) => {
        return (
          <button className="dialog__btn">
            {option.svg}
            {option.text}
          </button>
        );
      })}
    </div>
  );
};
