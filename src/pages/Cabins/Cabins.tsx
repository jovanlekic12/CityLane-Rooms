import { useState } from "react";
import CabinsMain from "./CabinsMain";
import CabinsHeader from "./header";
import { createPortal } from "react-dom";
import { Cabin } from "../../utils/types";
import CreateEditCabinHookForm from "../../components/CreateEditCabinHookForms";
import { useNavigate, useSearchParams } from "react-router";

function Cabins() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [cabinForEdit, setCabinForEdit] = useState<Cabin | null>(null);

  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleFilterChange = (filter: string) => {
    params.set("discount", filter);
    navigate({ search: params.toString() });
  };

  return (
    <main className="main__container">
      <section className="section">
        <CabinsHeader handleFilterChange={handleFilterChange} />
        <CabinsMain
          params={params}
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
