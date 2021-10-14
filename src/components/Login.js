import React, { useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../Context/alert/alertcontext";

const Login = () => {
  const host="http://localhost:5000";
  const [credentials, setCredentials] = useState({email:"",password:""});
  const history=useHistory();
  const context = useContext(AlertContext);
  const {showAlert,alert}=context;
  
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }
    const handleSubmit=async (e)=>{
      e.preventDefault();
        const response=await fetch(`${host}/auth/login`,{
          method:'POST',
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
        const json=await response.json();
        console.log(json);
        if(json.success){
          //save the authtoken
          localStorage.setItem('token',json.authtoken);
          showAlert("Logged in successfully","success");
          //redirect to home page
          history.push("/");
        }
        else{
          alert("invalid credentials");
        }
    }
  return (
    <div className="mt-3">
    <div className="my-3">
      <h2 className="my-3">Login to use Notebook app</h2>
      <form onSubmit={handleSubmit}>
        <div className=" mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            minLength={5}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      </div>
    </div>
  );
};

export default Login;
