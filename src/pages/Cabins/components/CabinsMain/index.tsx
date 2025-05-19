import { fetchCabins } from "../../../../API/cabins";
import { useFetchData } from "../../../../API/useFetchData";
import { Cabin } from "../../../../utils/types";
import Loader from "../../../../components/Loader";
import CabinItem from "./CabinItem";
import Button from "../../../../components/Button";
import { useCallback } from "react";

type Props = {
  setIsFormOpened: (isOpened: boolean) => void;
  setCabinForEdit: (cabin: Cabin) => void;
  isFormOpened: boolean;
  params: URLSearchParams;
};

function CabinsMain({
  setIsFormOpened,
  setCabinForEdit,
  isFormOpened,
  params,
}: Props) {
  const infos = ["", "Cabin", "Capacity", "Price", "Discount", ""];

  const getCabins = useCallback(() => {
    return fetchCabins(params);
  }, [params]);
  const { data: cabins, isLoading } = useFetchData<Cabin>(
    getCabins,
    isFormOpened
  );

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
            return (
              <CabinItem
                cabin={cabin}
                setIsFormOpened={setIsFormOpened}
                setCabinForEdit={setCabinForEdit}
              />
            );
          })}
        </ul>
      )}
      <Button
        type="standard"
        onClick={() => {
          setIsFormOpened(true);
        }}
      >
        Add new cabin
      </Button>
    </div>
  );
}
export default CabinsMain;
