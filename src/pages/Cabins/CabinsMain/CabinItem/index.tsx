import Button from "../../../../components/Button";
import { Cabin } from "../../../../utils/types";
import { Dialog } from "../../../../components/Dialog";
import { useState } from "react";
import { IoCopy, IoPencil } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

function CabinItem({ cabin }: { cabin: Cabin }) {
  const [showDialog, setShowDialog] = useState(false);

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
      <img src={cabin.img} alt="cabin photo" className="cabin__img" />
      <div className="cabin__number">{String(cabin.id).padStart(3, "0")}</div>
      <div className="cabin__capacity">Fits up to {cabin.capacity} guests</div>
      <div className="cabin__price">${cabin.price.toFixed(2)}</div>
      {cabin.discount ? (
        <div className="cabin__discount">${cabin.discount.toFixed(2)}</div>
      ) : (
        <div>-</div>
      )}
      <div className="options-btn-div">
        <Button
          type="options"
          onClick={() => {
            setShowDialog(true);
          }}
        >
          0
        </Button>
        {showDialog && (
          <Dialog
            onClickOutside={() => setShowDialog(false)}
            options={options}
          />
        )}
      </div>
    </li>
  );
}
export default CabinItem;
