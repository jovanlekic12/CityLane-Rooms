import { fetchCabins } from "../../../../API/cabins";
import { useFetchData } from "../../../../API/useFetchData";
import { Cabin } from "../../../../utils/types";
import Loader from "../../../../components/Loader";
import CabinItem from "./CabinItem";
import Button from "../../../../components/Button";
import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { cabinsPerPage } from "../../../../utils/constants";
import Pagination from "../../../../components/Pagination";

type Props = {
  setIsFormOpened: (isOpened: boolean) => void;
  setCabinForEdit: (cabin: Cabin) => void;
  isFormOpened: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

function CabinsMain({
  setIsFormOpened,
  setCabinForEdit,
  currentPage,
  setCurrentPage,
}: Props) {
  const infos = ["", "Cabin", "Capacity", "Price", "Discount", ""];
  const lastCabinIndex = currentPage * cabinsPerPage;
  const firstCabinIndex = lastCabinIndex - cabinsPerPage;
  const [params] = useSearchParams();

  const getCabins = useCallback(() => {
    return fetchCabins(params, firstCabinIndex, lastCabinIndex);
  }, [params, currentPage]);
  const { data, isLoading } = useFetchData<{
    data: Cabin[];
    count: number | null;
  }>(getCabins);

  const cabins = data?.data ?? [];
  const totalCount = data?.count ?? 0;
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
      {totalCount > cabinsPerPage && (
        <Pagination
          firstIndex={firstCabinIndex}
          lastIndex={lastCabinIndex}
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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
