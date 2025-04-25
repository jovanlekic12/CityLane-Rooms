import { useRef } from "react";
import { useClickOutside } from "../utils/helpers";

type DialogProps = {
  onClickOutside: () => void;
  text: string;
};

export const Dialog = ({ onClickOutside, text }: DialogProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);

  return (
    <div ref={ref} className="dialog-component">
      {text}
    </div>
  );
};
