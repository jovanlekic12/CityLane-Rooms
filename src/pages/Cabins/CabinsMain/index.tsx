import { fetchCabins } from "../../../API/cabins";
import { useFetchData } from "../../../API/useFetchData";
import { Cabin } from "../../../utils/types";
import Loader from "../../../components/Loader";
import CabinItem from "./CabinItem";
import Button from "../../../components/Button";

function CabinsMain() {
  const infos = ["", "Cabin", "Capacity", "Price", "Discount", ""];
  const { data: cabins, isLoading } = useFetchData<Cabin>(fetchCabins);

  console.log(cabins);
  return (
    <div className="section__main">
      <header className="section__main__header">
        {infos.map((info) => {
          return <div className="info__div">{info}</div>;
        })}
      </header>
      {isLoading ? (
        <Loader />
      ) : (
        <ul>
          {cabins.map((cabin) => {
            return <CabinItem cabin={cabin} />;
          })}
        </ul>
      )}
      <Button type="standard">Add new cabin</Button>
    </div>
  );
}
export default CabinsMain;
