import { fetchCabins } from "../../../API/cabins";
import { useFetchData } from "../../../API/useFetchData";
import Button from "../../../components/Button";
import { Cabin } from "../../../utils/types";
import { TbDotsVertical } from "react-icons/tb";
import Loader from "../../../components/Loader";
import { useState } from "react";
import { Dialog } from "../../../components/Dialog";
import CabinItem from "./CabinItem";

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
    </div>
  );
}
export default CabinsMain;
