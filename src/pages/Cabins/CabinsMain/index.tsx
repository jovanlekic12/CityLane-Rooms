import { fetchCabins } from "../../../API/cabins";
import { useFetchData } from "../../../API/useFetchData";
import Button from "../../../components/Button";
import { Cabin } from "../../../utils/types";
import { TbDotsVertical } from "react-icons/tb";
import Loader from "../../../components/Loader";

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
            return (
              <li key={cabin.id} className="section__list__item">
                <img src={cabin.img} alt="cabin photo" className="cabin__img" />
                <div className="cabin__number">
                  {String(cabin.id).padStart(3, "0")}
                </div>
                <div className="cabin__capacity">
                  Fits up to {cabin.capacity} guests
                </div>
                <div className="cabin__price">${cabin.price.toFixed(2)}</div>
                {cabin.discount ? (
                  <div className="cabin__discount">
                    ${cabin.discount.toFixed(2)}
                  </div>
                ) : (
                  <div>-</div>
                )}
                <Button type="options">
                  <TbDotsVertical></TbDotsVertical>
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
export default CabinsMain;
