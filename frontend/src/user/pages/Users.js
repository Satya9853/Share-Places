import UsersList from "../components/Users-List";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Satya Bhusan Prusty",
      image: "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
