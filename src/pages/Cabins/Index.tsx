import { useState } from "react";
import CabinsMain from "./components/CabinsMain";
import CabinsHeader from "./components/header";
import { createPortal } from "react-dom";
import { Cabin } from "../../utils/types";
import CreateEditCabinHookForm from "../../components/CreateEditCabinHookForms";

function Cabins() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [cabinForEdit, setCabinForEdit] = useState<Cabin | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <main className="main__container">
      <section className="section">
        <CabinsHeader setCurrentPage={setCurrentPage} />
        <CabinsMain
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setIsFormOpened={setIsFormOpened}
          setCabinForEdit={setCabinForEdit}
          isFormOpened={isFormOpened}
        />
        {isFormOpened &&
          createPortal(
            <CreateEditCabinHookForm
              setIsFormOpened={setIsFormOpened}
              initialData={cabinForEdit}
              setCabinForEdit={setCabinForEdit}
            />,
            document.body
          )}
      </section>
    </main>
  );
}

export default Cabins;
