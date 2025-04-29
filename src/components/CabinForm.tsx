import Button from "./Button";

type FormProps = {
    setIsFormOpened: (isOpen: boolean) => void;
    handleNewCabin: (key:string,value:number|string)=>void;
}


export default function CabinForm({setIsFormOpened,handleNewCabin}:FormProps) {
    return <div className="form__overlay">
        <form className="cabin__form">
            <div className="form__div">
                <label className="form__label">Cabin name</label>
                <input type="text" name="name" onChange={(e)=>handleNewCabin(e.target.name,e.target.value)}/>
            </div>
            <div className="form__div">
                <label className="form__label">Maximum capacity
                </label>
                <input type="text" name='capacity'/>
            </div><div className="form__div">
                <label className="form__label">Regular price</label>
                <input type="text" name='price'/>
            </div><div className="form__div">
                <label className="form__label">Discount</label>
                <input type="text" name='discount'/>
            </div><div className="form__div">
                <label className="form__label">Description for website</label>
                <input type="text" />
            </div><div className="form__div">
                <label className="form__label">Cabin photo</label>
                <input type="text" name="photo"/>
            </div>
            <div className="form__buttons__div">
                <Button type="cancel" onClick={()=>{setIsFormOpened(false)}}>Cancel</Button>
                <Button type='submit'>Create new cabin</Button>
            </div>
        </form>
    </div>
}