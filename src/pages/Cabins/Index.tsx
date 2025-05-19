import { useState } from "react";
import CabinsMain from "./components/CabinsMain";
import CabinsHeader from "./components/header";
import { createPortal } from "react-dom";
import { Cabin } from "../../utils/types";
import CreateEditCabinHookForm from "../../components/CreateEditCabinHookForms";
import { useNavigate, useSearchParams } from "react-router";

function Cabins() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [cabinForEdit, setCabinForEdit] = useState<Cabin | null>(null);

  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleSortChange = (sort: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (sort) {
      newParams.set("sort", sort);
    } else {
      newParams.delete("sort");
    }
    navigate({ search: newParams.toString() });
  };
  //reuse
  const handleFilterChange = (filter: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (filter) {
      newParams.set("discount", filter);
    } else {
      newParams.delete("discount");
    }
    navigate({ search: newParams.toString() });
  };

  return (
    <main className="main__container">
      <section className="section">
        <CabinsHeader
          handleFilterChange={handleFilterChange}
          handleSortChange={handleSortChange}
        />
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
