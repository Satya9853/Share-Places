import { useState, useContext } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UI-Elements/Card";
import Input from "../../shared/components/Form-Elements/Input";
import Button from "../../shared/components/Form-Elements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/Validator";
import { AuthContext } from "../../shared/context/auth-context";
import Style from "./Auth.module.css";

const Auth = (props) => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputChangeHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({ ...formState.inputs, name: undefined }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
      setFormData({ ...formState.inputs, name: { value: "", isValid: false } }, false);
    }
    setIsLoginMode((prev) => !prev);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <Card className={Style["authentication"]}>
      <h2>Login Rerquired</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="USER NAME"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please Enter a Name"
            onInput={inputChangeHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please Enter a valid email address"
          onInput={inputChangeHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="PASSWORD"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please Enter a valid email password, at least 5 characters"
          onInput={inputChangeHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGN UP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        {isLoginMode ? "SWITCH TO SIGN UP MODE" : "SWITCH TO LOGIN MODE"}
      </Button>
    </Card>
  );
};

export default Auth;