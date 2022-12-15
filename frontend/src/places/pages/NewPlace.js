import { Fragment } from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Input from "../../shared/components/Form-Elements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/Validator";
import Button from "../../shared/components/Form-Elements/Button";
import ErrorModal from "../../shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import Style from "./PlaceForm.module.css";

const NewPlace = () => {
  const [formState, inputChangeHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    const URL = "http://localhost:5000/api/v1/places";

    const placeData = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      address: formState.inputs.address.value,
      creator: "6399fb4409e7d57602198279",
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(placeData),
    };
    try {
      const responseData = await sendRequest(URL, options.method, options.body, options.headers);
      console.log(responseData);
      // redirect user to different page
      history.push("/");
    } catch (error) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <form className={Style["place-form"]} onSubmit={placeSubmitHandler}>
        <Input
          id="title"
          element="input"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputChangeHandler}
        />

        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputChangeHandler}
        />

        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputChangeHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </Fragment>
  );
};

export default NewPlace;
