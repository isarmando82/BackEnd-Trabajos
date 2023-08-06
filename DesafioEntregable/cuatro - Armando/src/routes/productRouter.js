import express from 'express';
import multer from 'multer';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();
const productController = new ProductController();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/img/') 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.originalname.split('.').pop(); 
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});

const upload = multer({ storage });

router.get('/', productController.getAllProducts);
router.get('/:pid', productController.getProductById);



router.put('/:pid', productController.updateProduct);
router.delete('/:pid', productController.deleteProduct);


















export default router;

