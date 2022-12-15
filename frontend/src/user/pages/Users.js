import { Fragment, useEffect, useState } from "react";

import UsersList from "../components/Users-List";
import ErrorModal from "../../shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState(undefined);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/v1/users");
        const responseData = await response.json();

        if (!response.ok) throw new Error(responseData.message);

        setLoadedUsers(responseData.users);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message || "Something went wrong, please try again later");
      }
    };
    sendRequest();
  }, []);

  const errorHandling = () => {
    setError(null);
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={errorHandling} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </Fragment>
  );
};

export default Users;
