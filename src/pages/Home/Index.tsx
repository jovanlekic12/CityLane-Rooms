import { useState } from "react";
import HomeHeader from "./components/header/Index";
import HomeMain from "./components/main/Index";

export default function Home() {
  const [activeBtn, setActiveBtn] = useState<string>("7 days");

  return (
    <main className="main__container">
      <section className="section">
        <HomeHeader activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
        <HomeMain dateRange={activeBtn} />
      </section>
    </main>
  );
}
