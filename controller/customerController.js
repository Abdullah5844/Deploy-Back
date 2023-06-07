import Customer from "../models/customerModel.js"
import jwt from "jsonwebtoken"


export async function signin (req,res){
    
    let {username,password} = req.body;
    Customer.findOne({username:username}).then(founduser=>{
        if(!founduser){
            res.status(404).send({"Messege":"User does not exist"})
            console.log(res.status)
        }else{
            if(password=founduser.password){
                let token = jwt.sign({
                    id:founduser._id,
                    address:founduser.address,
                },process.env.SECRET_KEY,{expiresIn:'21h'})
                res.status(200).send({user:founduser,"token":token})}
                else{
                    res.status(400).send({"Messege":"Password not match"})
                }
        }
    }).catch(e=>{
        res.status(500).send({e:e})
    })
}
