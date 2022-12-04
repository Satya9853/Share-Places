import Style from "./Users-List.module.css";
import UsersItem from "./Users-Item";

const UsersList = (props) => {
  //! if no user is found then we simply return a message
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    );
  }

  //* if there is even one user then we render the list of user using our UsersItem Component
  const listOfUsers = props.items.map((user) => {
    return <UsersItem key={user.id} id={user.id} image={user.image} name={user.name} placeCount={user.places} />;
  });

  return <ul className="users-list">{listOfUsers}</ul>;
};

export default UsersList;
