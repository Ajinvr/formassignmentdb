import React, { useState } from 'react'
import "../styles/Form.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();

  let value;
  // Err===============================================
const [emailerr, setemailerr] = useState("");
const [passworderr, setpassworderr] = useState("");
// ====================================================
 

// ====================================================
const [emailv, setemail] = useState(false);
const [passwordv, setpassword] = useState(false);
// =====================================================


// Test Regex=========================================================
let emailtest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
let passwordtest = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/
// Test Regex end =========================================================



// submit============================================================

function submit(event) {
  // event.preventDefault();
  
 
  let email = document.querySelector("#Email")
  let password = document.querySelector("#Password")


// email
  if(email.value.length <1){
    setemailerr("This field cannot be blank");
  } else if (!emailtest.test(email.value)) {
    setemailerr("Enter a valid email");
  } else {
    setemail(true)
    setemailerr("");
  }
  
// password
  if(password.value.length <1){
    setpassworderr("This field cannot be blank");
  } else if (!passwordtest.test(password.value)) {
    setpassworderr("Password not strong");
  } else {
    setpassword(true)
    setpassworderr("");
  }

}

// Validation ===================================================

function emailtes() {
  let email = document.querySelector("#Email")
  
  if(email.value.length <1){
    setemailerr("This field cannot be blank");
  } else if (!emailtest.test(email.value)) {
    setemailerr("Enter a valid email");
  } else {
    setemail(true)
    setemailerr("");
  }
}


function passwordtes() {
  let password = document.querySelector("#Password")
  if(password.value.length <1){
    setpassworderr("This field cannot be blank");
  } else if (!passwordtest.test(password.value)) {
    setpassworderr("Password not strong");
  } else {
    setpassword(true)
    setpassworderr("");
  }
}

// Validation End ===================================================


// fech data=========================================================

async function login() {
       let email = document.querySelector("#Email").value;
      let password = document.querySelector("#Password").value;
if (emailv === true && passwordv === true) {
    try {
           const result = await axios.post('https://formassignmentdb.vercel.app/login',{password,email})
       if (result.data.user == false) {
        usernotfound()
       }
        else if (result.data.login === true ) {
          success()
          setTimeout(() => {
            navigate('/profile');
          }, 1000);
            
          }

      else{
           notfound()     
          }
 
       } 

    catch (error) {
           notifyerr()
      }

  }
}
  
 // toast notification===============================================
 
 const notifyerr = (error) => {
  toast.error('something went wrong try again', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
 }


 const notfound = (error) => {
  toast.error('Email and password does not match',{
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
 }

 const usernotfound = (error) => {
  toast.error('user not found',{
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
 }

 const success = ()=>{
  toast.success('login Successful', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}
// end==============================================================


  return (
    <div className='maindiv'>
    <div className='anm'></div>

<div className='form'>
<h3>Email</h3>
      <input onChange={()=>{
        emailtes()
      }} type="Email" placeholder='Email id' name="" id="Email" />
            <p>&nbsp;{emailerr}</p>

<h3>Password</h3>
         <input onChange={passwordtes} type="password" placeholder='Password' name="" id="Password" />
                <p>&nbsp;{passworderr}</p>
                <br />
<div className='btnc'><button onClick={()=>{
  submit()
  login()
}} >Log in</button></div>
 <div className='rc'><p><Link className='link' to="/signup">Don't have an account</Link></p></div>
</div>

<ToastContainer/>
</div>
  )
}

export default Login