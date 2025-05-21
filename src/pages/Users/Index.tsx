import { useFetchData } from "../../API/useFetchData";
import { getAllUsers } from "../../API/users";

export default function Users() {
  const { data: users, isLoading, error } = useFetchData(getAllUsers);

  return (
    <main className="main__container">
      <section className="section">
        <h1 className="section__heading">Users list</h1>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading users</p>}

        {users?.length > 0
          ? users.map((user: any) => <p key={user.id}>{user.email}</p>)
          : !isLoading && <p>No users found.</p>}
      </section>
    </main>
  );
}
