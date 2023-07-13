import { useContext, useState } from "react";
import { MyContext } from "../contexts/MyContext";


function Login() {
  const { loginUser, isLoggedIn } = useContext(MyContext);

  const initialState = {
    userInfo: {
      email: "",
      password: "",
    },
    errorMsg: "",
    successMsg: "",
  };

  const [state, setState] = useState(initialState);

  // On change input value (email & password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  // On Submit Login From
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await loginUser(state.userInfo);
    if (data.success && data.token) {
      setState({
        ...initialState,
      });
      localStorage.setItem("loginToken", data.token);
      await isLoggedIn();
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  // Show Message on Error or Success
  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
  }

  return (
    
        <form onSubmit={submitForm} noValidate>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <input
              
              label="E-mail"
              name="email"
              type="email"
              value={state.userInfo.email}
              onChange={onChangeValue}
            />
            <input
              
              label="Senha"
              name="password"
              type="password"
              value={state.userInfo.password}
              onChange={onChangeValue}
            />
            {errorMsg}
            {successMsg}
            <button type="submit">
              Entrar
            </button>
          </div>
        </form>
       
  );
}

export default Login;
