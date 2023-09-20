import {Router} from "express"
import CartManager from "../managers/cartManager.js"
import { __dirname } from "../utils.js"
const manager=new CartManager(__dirname+'/database/carts.json')
const router =Router()

//Get: http://localhost:8080/api/carts

router.get("/carts",async(req,res)=>{
   const carrito=await manager.getCarts()
   res.json({carrito})
})
//http://localhost:8080/api/carts/1

router.get("/carts/:cid",async(req,res)=>{
    const carritofound=await manager.getCartbyId(req.params)
    res.json({status:"success",carritofound})
})

//Post: http://localhost:8080/api/carts

router.post("/carts/", async (req, res) => {
    const newcart = await manager.addCart();
     res.json({ status: "success", newcart });

  });
  
//http://localhost:8080/api/carts/idCarts/products/1

router.post("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
  
    await manager.addProductToCart(cid, pid);
    res.json({ status: "success", message: "Product agregado satisfactoriamente" });
    } catch (error) {
    console.error("Error agregando product:", error);
    res.status(500).json({ status: "error", message: "No se pudo agregar el producto." });
    }
  });
  

export default router