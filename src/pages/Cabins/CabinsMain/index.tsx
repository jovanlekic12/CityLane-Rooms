import { fetchCabins } from "../../../API/cabins";
import { useFetchData } from "../../../API/useFetchData";
import { Cabin } from "../../../utils/types";

function CabinsMain() {
  const infos = ["", "Cabin", "Capacity", "Price", "Discount", ""];

  const { data: cabins, error, isLoading } = useFetchData<Cabin>(fetchCabins);

  console.log(cabins);

  return (
    <div className="section__main">
      <header className="section__main__header">
        {infos.map((info) => {
          return <div className="info__div">{info}</div>;
        })}
      </header>
      <ul className="section__list">
        {cabins.map((cabin) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CabinsMain;
