import { Router } from 'express';
import { getProductsPipelineController, getProductByIdController, postAddProductController, putUpdateProductController, deleteProductController } from '../controllers/products.controller.js';
const router = Router();

/*ROUTER QUE MANEJA LOS PRODUCTOS
Se llama desde /api/products
*/
//GET
router.get('/', getProductsPipelineController);
router.get('/:pid', getProductByIdController);

//POST
router.post('/', postAddProductController);

//PUT
router.put('/:pid', putUpdateProductController);

//DELETE
router.delete('/:pid', deleteProductController);


export default router;