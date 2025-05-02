import { useState } from "react";
import { Cabin } from "../utils/types";
import Button from "./Button"
import { InsertNewCabin } from "../API/cabins";


type FormProps = {
    setIsFormOpened: (isOpened:boolean)=>void;
}

export default function CabinForm({setIsFormOpened}:FormProps) {

    const [newCabin, setNewCabin] = useState<Cabin>({
        id: 0,
        name: '',
        capacity: 0,
        price: 0,
        discount: 0,
        img: '',
        description: '',
      });
      
      function handleSubmit(cabin:Cabin) {
        InsertNewCabin(cabin)
      }
    
      function handleNewCabin(key: string, value: string|number) {
        setNewCabin(prev => ({
          ...prev,
          [key]: value,
        }))};

    return <div className="form__overlay">
        <form className="cabin__form" onSubmit={()=>handleSubmit(newCabin)}>
            <div className="form__div">
                <label className="form__label">Cabin name</label>
                <input onChange={(e)=>handleNewCabin(e.target.name,e.target.value)} type="text" name="name"/>
            </div>
            <div className="form__div">
                <label className="form__label">Maximum capacity
                </label>
                <input onChange={(e)=>handleNewCabin(e.target.name,e.target.value)} type="number" name='capacity'/>
            </div><div className="form__div">
                <label className="form__label">Regular price</label>
                <input onChange={(e)=>handleNewCabin(e.target.name,e.target.value)} type="number" name='price'/>
            </div><div className="form__div">
                <label className="form__label">Discount</label>
                <input onChange={(e)=>handleNewCabin(e.target.name,e.target.value)} type="number" name='discount'/>
            </div><div className="form__div">
                <label className="form__label">Description for website</label>
                <input onChange={(e)=>handleNewCabin(e.target.name,e.target.value)} type="text" />
            </div><div className="form__div">
                <label className="form__label">Cabin photo</label>
                <input onChange={(e)=>handleNewCabin(e.target.name,e.target.value)} type="text" name="photo"/>
            </div>
            <div className="form__buttons__div">
                <Button type="cancel" onClick={()=>{setIsFormOpened(false)}}>Cancel</Button>
                <Button type='submit'>Create new cabin</Button>
            </div>
        </form>
    </div>
}