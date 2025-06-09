import { ReactNode, useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

type Option = {
  svg: ReactNode;
  text: string;
};

type DialogProps = {
  onClickOutside: () => void;
  options?: Option[];
  id: string;
};

export const BookingDialog = ({ onClickOutside, options, id }: DialogProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);

  const navigate = useNavigate();

  function handleOnClick(option: string) {
    if (option === "See details") {
      navigate(`/booking/${id}`);
    }
    if (option === "Check in" || "Check out") {
      navigate(`/booking/${id}`);
    }
    if (option === "Delete booking") {
      toast("mjau");
    }
  }

  return (
    <div ref={ref} className="dialog-component">
      {options &&
        options.map((option) => {
          return (
            <button
              className="dialog__btn"
              onClick={() => {
                handleOnClick(option.text);
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
