const express = require('express');
const router = express.Router();
const user_ctr = require('../controller/user')
const cart_ctr = require('../controller/cart');
const products_ctr = require('../controller/products');
const JWT = require('../middlewares/Jwt');
const upload = require('../middlewares/upload');

//// còn phân quyền up ,load anh, voi sủa cái cart
router.route('/signUp').post(user_ctr.sendMail); //ok
router.get(`/confirm/${user_ctr.mailToken}`, user_ctr.signUp_success);//oke
router.route('/signin').post(user_ctr.signIn);//oke
router.post('/changePassword', user_ctr.changePassword);
router.post('/addProductToCart/:id', JWT.verifiToken, cart_ctr.AddtoCart);//tạm oke nhưng chưa lấy được giá của 1 sản phẩm
router.get('/showCart', cart_ctr.showCart);// oke

router.route('/products')
    .get(products_ctr.GetAllProducts)//oke
router.route('/createProduct')
    .post(JWT.verifiToken, products_ctr.CreateProduct);//oke

router.route('/products/:id')
    .get(products_ctr.getProduct)//oke
    .delete(JWT.verifiToken, products_ctr.DeleteProduct)//oke
    .patch(JWT.verifiToken, upload.upload_img, products_ctr.updateProduct);//oke

module.exports = router;
