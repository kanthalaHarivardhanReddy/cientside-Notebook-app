import React,{useState,useContext} from 'react'
import {useHistory} from 'react-router-dom';
import AlertContext from "../Context/alert/alertcontext";
const SignUp = () => {
    const host="http://localhost:5000";
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    const history=useHistory();
    const context=useContext(AlertContext);
    const {showAlert}=context;

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch(`${host}/auth/createuser`,{
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        });
        const json=await response.json();
        console.log(json);
        if(json.success){
          //save authtoken
          localStorage.setItem('token',json.authtoken);
          showAlert("Account created Successfully","success");
          //redirect to home page
          history.push('/');
        }
        else{
          alert("Invalid details");
        }
    }
  return (
    <div className="container my-3">
    <div className="my-3">
      <h2 className="my-3">SignUp to use Notebook app</h2>
      <form onSubmit={handleSubmit}>
      <div className=" mb-3">
          <label htmlFor="email" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            minLength={5}
            onChange={onChange}
          />
        </div>
        <button disabled={(credentials.password===credentials.cpassword)?false:true} type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
      </div>
    </div>
  );
};

export default SignUp
