import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<Element | null>,
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    const el = event.target as Node;
    if (
      ref.current &&
      !ref.current.contains(el) &&
      ref.current.parentElement !== el.parentElement
    ) {
      console.log(ref.current.parentElement, el.parentElement);
      console.log("mjau");
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);
};
