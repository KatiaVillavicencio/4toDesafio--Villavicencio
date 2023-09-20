import {Router} from  "express"
import ProductManager from "../managers/productManager.js"
import { __dirname } from "../utils.js"

const pmanager=new ProductManager(__dirname+'/database/products.json')

const router=Router()

router.get("/",async(req,res)=>{
  const listaproductos=await pmanager.getProducts({})
  res.render("home",{listaproductos})
})

//http://localhost:8080/realTimeProducts//

router.get("/realtimeproducts",async(req,res)=>{
   res.render("realTimeProducts")
})

export default router