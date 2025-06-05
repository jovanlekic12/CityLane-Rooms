import { ReactNode, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { Cabin } from "../utils/types";

type Option = {
  svg: ReactNode;
  text: string;
};

type DialogProps = {
  onClickOutside: () => void;
  options: Option[];
  setIsFormOpened: (isOpened: boolean) => void;
  cabin: Cabin;
  setCabinForEdit: (cabin: Cabin) => void;
};

export const CabinDialog = ({
  onClickOutside,
  options,
  setIsFormOpened,
  setCabinForEdit,
  cabin,
}: DialogProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);

  return (
    <div ref={ref} className="dialog-component">
      {options.map((option) => {
        return (
          <button
            className="dialog__btn"
            onClick={() => {
              option.text === "Edit" && setIsFormOpened(true);
              onClickOutside();
              setCabinForEdit(cabin);
            }}
          >
            {option.svg}
            {option.text}
          </button>
        );
      })}
    </div>
  );
};
