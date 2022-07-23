const express = require('express');
const router = express.Router();
const UserControlles = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const upload = require('../helpers/uploadFiles');

router.post('/register', UserControlles.register)
router.post('/login', UserControlles.login)
router.get('/active/:key', UserControlles.activateUser)

router.post('/forgetPassword', UserControlles.getPassword)
router.post('/check/code', UserControlles.checkCode)
router.patch('/set/password', auth, UserControlles.setPassword)


router.get('/me', auth, UserControlles.me)
router.get('/all', auth, UserControlles.getAllUsers)
router.get('/getUserByid/:id', UserControlles.getUserByid)
router.get('/dashboard', auth, UserControlles.me)

router.delete('/logout', auth, UserControlles.logout)
router.delete('/logoutAll', auth, UserControlles.logoutAll)
router.patch("/enableUser", auth, UserControlles.enableUser);
router.patch("/disableUser", auth, UserControlles.disableUser);
router.patch('/edit', auth, UserControlles.editProfile)
router.post('/profileImage', auth, UserControlles.editProfileImage);
router.delete('/deleteProfileImage', auth, UserControlles.deleteProfileImage)

module.exports = router;