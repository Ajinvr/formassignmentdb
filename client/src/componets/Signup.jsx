import React from 'react'
import "../styles/Form.css"
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Form = () => {

  const navigate = useNavigate();

// Err===============================================
const [nameerr, setnameerr] = useState("");
const [emailerr, setemailerr] = useState("");
const [passworderr, setpassworderr] = useState("");
// ====================================================
                 
let value;

// ====================================================
const [namev, setname] = useState(false);
const [emailv, setemail] = useState(false);
const [passwordv, setpassword] = useState(false);
// =====================================================



// Test Regex=========================================================
let emailtest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
let passwordtest = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/
// Test Regex end =========================================================



// Validation ===================================================

function nametes() {
  let name = document.querySelector('#Name')
  if(name.value.length <1){
    setnameerr("This field cannot be blank");
  } else if (name.value.length < 3) {
    setnameerr("Name should be at least 3 letters");
  } else {
    setname(true)
    setnameerr("");
  }
}


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


// submit ===========================================================
function submit(event) {
  // event.preventDefault();
  
  let name = document.querySelector('#Name')
  let email = document.querySelector("#Email")
  let password = document.querySelector("#Password")

  // name
  if(name.value.length <1){
    setnameerr("This field cannot be blank");
  } else if (name.value.length < 3) {
    setnameerr("Name should be at least 3 letters");
  } else {
    setname(true)
    setnameerr("");
  }

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


// sent===========================================================
async function handlesubmit(event) {
  // event.preventDefault()

  if (namev === true && emailv === true && passwordv === true) {

let name = document.querySelector("#Name").value 
let email = document.querySelector("#Email").value
let password = document.querySelector("#Password").value

let formdetails = {
  name,
  email,
  password
}
    try {
      const result = await axios.post('https://formassignmentdb.vercel.app/signup',formdetails)

       if (result.data.emailalreadyexists == true || result.status == 409) {
        setemailerr("Email already exists")
        value = "Email already exists"
        notifyerr(value)
        console.log(value);
       }
      else if (result.status == 200 || 201) {
        success()
        setTimeout(() => {
          navigate('/profile');
        }, 1000);
      }else{
        notifyerr()
      }
    } catch (error) {
      notifyerr("something went wrong try again")
      console.log(error);
    }
  }
}

// end ============================================================



// toast notification===============================================
       const notifyerr =  (valude) => { 
        
        toast.error(`${valude}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
       }

    const success = ()=>{
      toast.success(' Sign up Successfull', {
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

  <h3>Name</h3>
          <input onChange={nametes} type="text" placeholder='Name' name="Name" id="Name" />
                <p className='nameerr'>&nbsp;{nameerr}</p>
  

  <h3>Email</h3>
           <input onChange={emailtes} type="Email" placeholder='Email id' name="Email" id="Email" />
                 <p className='emailerr'>&nbsp;{emailerr}</p>
  

  <h3>Password</h3>
              <input onChange={passwordtes} type="password" placeholder='Password' name="Password" id="Password" />
                     <p className='passworderr'>&nbsp;{passworderr}</p>

  <div className='btnc'><button  onClick={()=>{
     submit()
      handlesubmit()
 
  }} >Sign up</button></div>
           <div className='rc'><p><Link className='link' to="/login">Already have an account</Link></p></div>
</div>

        <ToastContainer />
    </div>
  )
}

export default Form