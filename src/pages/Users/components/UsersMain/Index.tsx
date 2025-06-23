import { useSearchParams } from "react-router";
import { useFetchData } from "../../../../API/useFetchData";
import { getAllUsers } from "../../../../API/users";
import Button from "../../../../components/Button";
import Loader from "../../../../components/Loader";
import { useCallback } from "react";
import UserListItem from "../user/Index";
import { User } from "@supabase/supabase-js";

type Props = {
  setIsFormOpened: (isOpened: boolean) => void;
  isFormOpened: boolean;
};

export default function UsersMain({ setIsFormOpened }: Props) {
  const infos = ["", "name", "email", "created at"];

  const [params] = useSearchParams();

  const getUsers = useCallback(() => {
    return getAllUsers(params);
  }, [params]);
  const { data, isLoading } = useFetchData<{
    data: User[];
    count: number | null;
  }>(getUsers);

  const users = data?.data ?? [];

  return (
    <section className="section__main">
      <header className="users__section__main__header">
        {infos.map((info) => {
          return (
            <div key={info} className="info__div">
              {info}
            </div>
          );
        })}
      </header>
      {isLoading && <Loader />}
      <ul>
        {users?.length > 0
          ? users.map((user) => {
              return (
                <UserListItem
                  key={user.id}
                  id={user.id}
                  email={user.email}
                  created_at={user.created_at}
                  name={user.user_metadata.FullName}
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
