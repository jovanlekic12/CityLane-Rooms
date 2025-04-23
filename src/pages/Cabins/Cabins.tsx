import CabinsMain from "./CabinsMain";
import CabinsHeader from "./header";

function Cabins() {
  return (
    <main className="main__container">
      <section className="section">
        <CabinsHeader />
        <CabinsMain />
      </section>
    </main>
  );
}

export default Cabins;
