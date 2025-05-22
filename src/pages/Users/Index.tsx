import { useState } from "react";
import UsersHeader from "./components/header/Index";
import UsersMain from "./components/UsersMain/Index";
import { createPortal } from "react-dom";
import CreateUserForm from "./components/form/Index";

export default function Users() {
  const [isFormOpened, setIsFormOpened] = useState(false);

  return (
    <main className="main__container">
      <section className="section">
        <UsersHeader />
        <UsersMain
          setIsFormOpened={setIsFormOpened}
          isFormOpened={isFormOpened}
        />
        {isFormOpened &&
          createPortal(
            <CreateUserForm setIsFormOpened={setIsFormOpened} />,
            document.body
          )}
      </section>
    </main>
  );
}
