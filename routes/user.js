import express from 'express';
const router=express.Router();
import { userRegister,getUsers,delelteUser,getEdituser,userSearch,editUser,exportCsv,getOneUser } from '../controller/userController.js';
import { imageMiddleware } from '../middleware/multer.js';


router.post('/register',imageMiddleware.single('profile'),userRegister);
router.get('/user',getUsers)
router.delete('/deleteuser',delelteUser)
router.get('/getEdituser',getEdituser);
router.get('/search',userSearch);
router.post('/edit/:userId',imageMiddleware.single('profile'),editUser);
router.get('/export/csv',exportCsv)
router.get('/getOneuser',getOneUser)


export default router