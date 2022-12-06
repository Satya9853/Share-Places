import { useCallback, useReducer } from "react";

import Input from "../../shared/components/Form-Elements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/Validator";
import Button from "../../shared/components/Form-Elements/Button";
import Style from "./NewPlace.module.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return { ...state, inputs: { ...state.inputs, [action.inputId]: { value: action.value, isValid: action.isValid } }, isValid: formIsValid };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    isValid: false,
  });

  const inputChangeHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", value: value, inputId: id, isValid: isValid });
  }, []);

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to backend
  };

  return (
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
  );
};

export default NewPlace;
