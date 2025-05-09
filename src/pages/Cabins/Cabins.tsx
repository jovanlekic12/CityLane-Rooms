import { useState } from "react";
import CabinsMain from "./CabinsMain";
import CabinsHeader from "./header";
import CabinForm from "../../components/CabinForm";
import { createPortal } from "react-dom";
import { Cabin } from "../../utils/types";

function Cabins() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [cabinForEdit, setCabinForEdit] = useState<Cabin | null>(null);
  return (
    <main className="main__container">
      <section className="section">
        <CabinsHeader />
        <CabinsMain
          setIsFormOpened={setIsFormOpened}
          setCabinForEdit={setCabinForEdit}
          isFormOpened={isFormOpened}
        />
        {isFormOpened &&
          createPortal(
            <CabinForm
              setIsFormOpened={setIsFormOpened}
              initialData={cabinForEdit}
            />,
            document.body
          )}
      </section>
    </main>
  );
}

export default Cabins;
