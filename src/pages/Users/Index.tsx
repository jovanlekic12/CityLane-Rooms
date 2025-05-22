import { useState } from "react";
import UsersHeader from "./components/header/Index";
import UsersMain from "./components/UsersMain/Index";

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
      </section>
    </main>
  );
}
