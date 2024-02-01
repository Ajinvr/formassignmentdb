const express = require("express")
const app = express()
const router = express.Router()
const formcontroller = require("../controllers/formcontroller")


router.route("/signup").post(formcontroller.signup).get((req,res)=>{res.json({apiworking:"working"})})
router.route("/login").post(formcontroller.login).get((req,res)=>{res.json({apiworking:"working"})})
router.route("/currentuserprofile").get(formcontroller.currentuserprofile)



module.exports = router