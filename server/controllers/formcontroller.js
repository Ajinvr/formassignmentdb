let bycrypt = require("bcrypt")
let saltround = 10
const signupdata = require("../models/formmodel")




// allusers ============================================================================

let currentuser;


const currentuserprofile = (req,res)=>{
  if(currentuser != null || currentuser != undefined){
    res.json({
      currentuser
    })

  }
}

// sign up ===============================================================================

const signup = async (req,res)=>{
    const {name,email,password} = req.body
          let hashpass = await bycrypt.hash(password,saltround)
               let  alluseremail = await signupdata.findOne({email})
                   if (alluseremail) {
                           res.json({
                               postsuccess:false,
                                  emailalreadyexists:true
                            })
                    }else{

                          if (name == undefined || email == undefined || password == undefined ) {
                                  
                            res.json({
                              details:"incomplete"
                            })   

                          } else {
                            currentuser = {name,email}
                            const signupdataset =  await signupdata.create({
                                name,
                                email,
                                password:hashpass
                             })
                             res.json({
                                 currentuser,
                                 postsuccess:true,
                                 details:"complete",
                                 emailalreadyexists:false
                             })
                          }
                         
                  }

    }

    // login=====================================================================================
        const login = async (req,res) => {
    
            const {name,email,password} = req.body
            let alluseremail = await signupdata.findOne({email})
            if (alluseremail != null) {
                let usp = alluseremail.password
                let usn = alluseremail.name
                    let decryptpass = await bycrypt.compare(password,usp)
                        if (decryptpass) {
                          currentuser = {name,email}
                               res.json({
                                    usn,
                                    email,
                                    login:true

                                        })
                        }else{
                           res.json({
                               details:false,
                               login:false,
                               message:"login details invalid"
                    })
                }
            }else{
              res.json({
                user:false,
                message:"user not found"
              })
            }
        }
    

    module.exports = {signup,login,currentuserprofile} 
    

    // send mail function

   