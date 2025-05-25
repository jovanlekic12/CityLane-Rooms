import { useFetchData } from "../../../../API/useFetchData";
import { getAllUsers } from "../../../../API/users";
import Button from "../../../../components/Button";
import Loader from "../../../../components/Loader";
import User from "../user/Index";

type Props = {
  setIsFormOpened: (isOpened: boolean) => void;
  isFormOpened: boolean;
};

export default function UsersMain({ setIsFormOpened, isFormOpened }: Props) {
  const infos = ["", "name", "email", "created at"];

  const { data: users, isLoading, error } = useFetchData(getAllUsers);

  return (
    <section className="section__main">
      <header className="users__section__main__header">
        {infos.map((info) => {
          return <div className="info__div">{info}</div>;
        })}
      </header>
      {isLoading && <Loader />}
      <ul>
        {users?.length > 0
          ? users.map((user) => {
              return (
                <User
                  id={user.id}
                  email={user.email}
                  created_at={user.created_at}
                />
              );
            })
          : !isLoading && <p>No users found.</p>}
      </ul>
      <Button
        type="standard"
        onClick={() => {
          setIsFormOpened(true);
        }}
      >
        Add new user
      </Button>
    </section>
  );
}
