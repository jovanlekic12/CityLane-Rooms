import { useState } from "react";
import CabinsMain from "./CabinsMain";
import CabinsHeader from "./header";
import CabinForm from "../../components/CabinForm";
import { createPortal } from "react-dom";

function Cabins() {
  const [isFormOpened, setIsFormOpened] = useState(false);

  return (
    <main className="main__container">
      <section className="section">
        <CabinsHeader />
        <CabinsMain setIsFormOpened={setIsFormOpened} />
        {isFormOpened &&
          createPortal(
            <CabinForm setIsFormOpened={setIsFormOpened} />,
            document.body
          )}
      </section>
    </main>
  );
}

export default Cabins;
