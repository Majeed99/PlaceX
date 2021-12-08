import "../styles/SignUp-style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const [UserData, setUserData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  function checkAndSignin() {
    console.log(UserData);
    axios
      .post("/api/users/signIn", UserData)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="page__signup">
      <form
        className="form__signup"
        onSubmit={(e) => {
          e.preventDefault();
          checkAndSignin();
        }}
      >
        <h3 className="form__title"> Sign Up for ANYTHING</h3>
        {errorMessage !== "" ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : null}

        <label>E-mail </label>
        <input
          type="email"
          onChange={(e) => {
            UserData.email = e.target.value;
            setUserData({ ...UserData });
          }}
          required
        />
        <br />

              
        <label>Password </label>
        <input
          type="password"
          onChange={(e) => {
            UserData.password = e.target.value;
            setUserData({ ...UserData });
          }}
          required
        />

        <button className="form__submit" type="submit">
          {" "}
          SIGN UP
        </button>
      </form>
    </div>
  );
}

export default SignIn;
