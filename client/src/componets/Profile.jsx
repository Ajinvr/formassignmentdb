import React, { useEffect, useState } from 'react'
import "../styles/profile.css"
import axios from 'axios'
import { Link } from 'react-router-dom'



const Profile = () => {

 const [user,setuser] = useState("user")
 const [usermail,setusermail] = useState("user email")


 useEffect(() => {
  const fetchData = async () => {
    try {
      let userdata = await axios.get('https://formassignmentdb.vercel.app/currentuserprofile');
      setuser(userdata.data.currentuser.name)
      setusermail(userdata.data.currentuser.email)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);


  return (
    <div className='main'>
     

        <div className='profilesub'> 
        
           <div className='imgdivmain'> <div className='imgdiv'><img src="https://source.unsplash.com/random/?hills" alt="" /></div></div>

            <h1>{user}</h1>
            <h3>{usermail}</h3>

<div className='btnm'>
<Link className='prolink' to={"/signup"}>sign up</Link>
<Link className='prolink' to={"/login"} >Log in</Link>
</div>
        </div>
    </div>
  )
}

export default Profile