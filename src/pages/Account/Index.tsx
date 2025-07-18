import { Slide, ToastContainer } from "react-toastify";
import { UserProps } from "../../utils/types";
import UserDataForm from "./components/UserDataForm/Index";

export default function Account({ token }: UserProps) {
  return (
    <main className="main__container">
      <section className="section">
        <div className="section__header">
          <h1 className="section__heading">Update account settings</h1>
        </div>
        <UserDataForm token={token} />
        <ToastContainer
          toastClassName="custom-toast"
          position="top-center"
          progressClassName="custom-progress"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          transition={Slide}
        />
      </section>
    </main>
  );
}
