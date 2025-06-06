import { fetchCabins } from "../../../../API/cabins";
import { useFetchData } from "../../../../API/useFetchData";
import { Cabin } from "../../../../utils/types";
import Loader from "../../../../components/Loader";
import CabinItem from "./CabinItem";
import Button from "../../../../components/Button";
import { useCallback } from "react";
import { useSearchParams } from "react-router";

type Props = {
  setIsFormOpened: (isOpened: boolean) => void;
  setCabinForEdit: (cabin: Cabin) => void;
  isFormOpened: boolean;
};

function CabinsMain({ setIsFormOpened, setCabinForEdit }: Props) {
  const infos = ["", "Cabin", "Capacity", "Price", "Discount", ""];

  const [params] = useSearchParams();

  const getCabins = useCallback(() => {
    return fetchCabins(params);
  }, [params]);
  const { data, isLoading } = useFetchData<{
    data: Cabin[];
    count: number | null;
  }>(getCabins);

  const cabins = data?.data ?? [];

  return (
    <div className="section__main">
      <header className="section__main__header">
        {infos.map((info) => {
          return (
            <div key={info} className="info__div">
              {info}
            </div>
          );
        })}
      </header>
      {isLoading ? (
        <Loader />
      ) : (
        <ul>
          {cabins.map((cabin) => {
            return (
              <CabinItem
                key={cabin.id}
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
