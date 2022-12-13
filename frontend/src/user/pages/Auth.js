import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UI-Elements/Card";
import Input from "../../shared/components/Form-Elements/Input";
import Button from "../../shared/components/Form-Elements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../shared/util/Validator";
import Style from "./Auth.module.css";

const Auth = (props) => {
  const [formState, inputChangeHandler] = useForm(
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

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card className={Style["authentication"]}>
      <h2>Login Rerquired</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
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
          LOGIN
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
