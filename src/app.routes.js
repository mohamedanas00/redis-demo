import router from "./modules/user/user.routes.js"




const initApp =(express , app)=>{
    app.use(express.json())
    app.use('/user', router)
    app.use('/*',(req,res,next)=>{
        return res.json({message:"In_validRouting"})
    })
}


export default initApp