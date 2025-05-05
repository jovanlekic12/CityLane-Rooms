import { useState } from "react";
import CabinsMain from "./CabinsMain";
import CabinsHeader from "./header";
import CabinForm from "../../components/CabinForm";
import { createPortal } from "react-dom";
import { Cabin } from "../../utils/types";
import { InsertNewCabin } from "../../API/cabins";

function Cabins() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [newCabin, setNewCabin] = useState<Cabin>({
    id: 0,
    name: "",
    capacity: 0,
    price: 0,
    discount: 0,
    img: "",
    description: "",
  });

  function handleSubmit(cabin: Cabin, event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    InsertNewCabin(cabin);
  }

  function handleNewCabin(key: string, value: string | number) {
    setNewCabin((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(newCabin);
  }
  return (
    <main className="main__container">
      <section className="section">
        <CabinsHeader />
        <CabinsMain setIsFormOpened={setIsFormOpened} />
        {isFormOpened &&
          createPortal(
            <CabinForm
              newCabin={newCabin}
              setIsFormOpened={setIsFormOpened}
              handleNewCabin={handleNewCabin}
              handleSubmit={handleSubmit}
            />,
            document.body
          )}
      </section>
    </main>
  );
}

export default Cabins;
