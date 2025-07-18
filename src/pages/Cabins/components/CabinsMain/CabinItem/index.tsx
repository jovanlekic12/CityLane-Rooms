import Button from "../../../../../components/Button";
import { Cabin } from "../../../../../utils/types";
import { useState } from "react";
import { CabinDialog } from "../../../../../components/CabinDialog";
import { IoCopy, IoPencil } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import useIsSmallScreen from "../../../../../hooks/useIsSmallScreen";

type CabinItemProps = {
  setIsFormOpened: (isOpened: boolean) => void;
  setCabinForEdit: (cabin: Cabin) => void;
  cabin: Cabin;
};

function CabinItem({
  cabin,
  setIsFormOpened,
  setCabinForEdit,
}: CabinItemProps) {
  const [showDialog, setShowDialog] = useState(false);
  const isSmallScreen = useIsSmallScreen(581);
  const options = [
    {
      text: "Duplicate",
      svg: <IoCopy />,
    },
    {
      text: "Edit",
      svg: <IoPencil />,
    },
    {
      text: "Delete",
      svg: <TiDelete />,
    },
  ];

  return (
    <li key={cabin.id} className="section__list__item">
      <img
        src={`https://ufcfeqrveeyzpruffbba.supabase.co/storage/v1/object/public/cabin-photos//cabin-${cabin.id}.jpg`}
        alt="cabin photo"
        className="cabin__img"
      />
      <div className="cabin__number">{cabin.name}</div>
      <div className="cabin__capacity">Fits up to {cabin.capacity} guests</div>
      <div className="cabin__price">${cabin.price.toFixed(2)}</div>
      {cabin.discount > 0 ? (
        <div className="cabin__discount">-${cabin.discount.toFixed(2)}</div>
      ) : (
        <div className="cabin__nodiscount">no discount</div>
      )}
      <div className="options-btn-div">
        <Button
          type="options"
          onClick={() => {
            setShowDialog(true);
          }}
        >
          {isSmallScreen ? "⋯" : "⋮"}
        </Button>
        {showDialog && (
          <CabinDialog
            onClickOutside={() => setShowDialog(false)}
            options={options}
            setIsFormOpened={setIsFormOpened}
            setCabinForEdit={setCabinForEdit}
            cabin={cabin}
          />
        )}
      </div>
    </li>
  );
}
export default CabinItem;
