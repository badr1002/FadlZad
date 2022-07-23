const userModel = require('../db/models/user.model')
const activationCodeModel = require('../db/models/activationCode')
const bcrypt = require('bcryptjs');
const hepler = require('../helpers/sendMail');
const moment = require("moment")



class User {

    static register = async (req, res) => {
        try {
            const checkEmail = await userModel.findOne({ email: req.body.email })
            if (checkEmail) throw new Error('this email is already exist!')
            const checkMobile = await userModel.findOne({ mobile: req.body.mobile })
            if (checkMobile) throw new Error('this mobile is used before!')
            const user = new userModel(req.body);
            await user.save();
            res.status(200).send({
                apiStatus: true,
                data: {}
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message
            });
        }
    }
    static generateActivationCode = async (user) => {
        try {
            user.activeKey = user._id.toString()
            //    let creationDate = moment().utc().format('YYYY-MM-DD hh:mm:ss A Z')
            //   const _activationCode = new activationCodeModel({ code: user.activeKey, email: user.email, creationDate })
            //  await _activationCode.save()
            await hepler.sendMailToActiveAcoount(user.activeKey, user.email)
        } catch (err) {
            console.log(err);
        }
    }
    static login = async (req, res) => {
        try {
            const user = await userModel.findUser(req.body.email, req.body.password);
            // const activationCode = await activationCodeModel.findOne({ email: user.email });
            if (!user.activate) {
                // if (!activationCode) {
                //     await this.generateActivationCode(user)
                // }
                await this.generateActivationCode(user)
                // let creationDate = new Date(activationCode.toObject().creationDate).getHours()
                // let currentDate = new Date(moment().utc().format('YYYY-MM-DD hh:mm:ss A Z')).getHours()
                // if (!currentDate - creationDate > 3) {
                //     await activationCodeModel.deleteOne(activationCode)
                //     await this.generateActivationCode(user)
                // }
            }
            else if (!user.status) {
                throw new Error("Your account is blocked Please, contact with us to reenable it!")
            }
            await user.save();
            let token = await user.generateToken()
            let _user = user.toObject()
            delete _user.password

            delete _user.activeKeye
            delete _user.tokens
            res.status(200).send({
                apiStatus: true,
                msg: "loged in successfully",
                data: { _user, token }
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "login faild!",
                data: e.message
            });
        }
    }

    static activateUser = async (req, res) => {
        try {
            const user = await userModel.findOne({ activeKey: req.params.key, activate: false });
            if (!user) return res.status(400).redirect(process.env.url);
            user.activeKey = "";
            user.activate = true;
            await user.save();
            res.status(200).redirect(process.env.url)
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "activation faild!",
                data: e.message
            });
        }
    }

    static logout = async (req, res) => {
        try {
            const user = req.user
            user.tokens.splice(req.headers.authorization.replace('bearer ', ''), 1)
            await user.save();
            res.status(200).send({
                apiStatus: true,
                msg: "loged out successfully",
                data: {}
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "logout faild!",
                data: e.message
            });
        }
    }

    static logoutAll = async (req, res) => {
        try {
            req.user.tokens = []
            req.user.macs = []
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                msg: "logedAll out successfully",
                data: {}
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "logoutAll faild!",
                data: e.message
            });
        }
    }

    static me = async (req, res) => {
        let _user = req.user.toObject()
        delete _user.password

        delete _user.activeKeye
        delete _user.tokens
        res.status(200).send({
            apiStatus: true,
            data: _user,
            message: "data fetched"
        })
    }

    static getUserByid = async (req, res) => {
        try {
            const user = await userModel.findOne({ _id: req.params.id });
            if (!user) throw new Error('user not found')
            let _user = user.toObject()
            delete _user.password

            delete _user.activeKeye
            delete _user.tokens
            res.status(200).send({
                apiStatus: true,
                data: _user,
                message: "data fetched"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "get user by id faild!",
                data: e.message
            });
        }
    }
    static getAllUsers = async (req, res) => {
        try {
            const users = await userModel.find();
            if (!users) throw new Error('users not found')
            let _users = users.map(a => {
                let user = a.toObject()
                delete user.password
                delete user.activeKeye
                delete user.tokens
                return user
            })

            res.status(200).send({
                apiStatus: true,
                data: _users,
                message: "data fetched"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "get all users faild!",
                data: e.message
            });
        }
    }

    static editProfile = async (req, res) => {
        let allowUpdate = ['name', 'mobile', 'oldPassword', "gender", 'password', 'address', 'country', 'about']
        const updates = Object.keys(req.body)
        let isAvailable = updates.every(u => allowUpdate.includes(u))
        if (!isAvailable) {
            res.status(500).send({
                apiStatus: false,
                msg: "not avaliable!",
                data: {}
            });
            return;
        }

        try {
            const data = req.body;
            const user = await userModel.findById(req.user._id)
            if (!user) throw new Error('user not found')
            else if (data.oldPassword && data.password) {
                const valid = await bcrypt.compare(data.oldPassword, user.password)
                if (!valid) throw new Error('invalid password!')
                if (data.oldPassword == data.password) throw new Error("Enter a new password")
                user.password = data.password
            }
            user.name = data.name
            user.mobile = data.mobile
            user.address = data.address
            user.country = data.country
            user.gender = data.gender
            user.about = data.about

            await user.save()
            let _user = user.toObject()
            delete _user.password

            delete _user.activeKeye
            delete _user.tokens
            res.status(200).send({
                apiStatus: true,
                msg: "updaeted successfully",
                data: { _user }
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "updaeted faild!",
                data: e.message
            });
        }
    }

    static editProfileImage = async (req, res) => {
        try {
            const user = await userModel.findById(req.user._id)
            if (!user) throw new Error('user not found')
            user.image = req.body.link
            await user.save()
            let _user = user.toObject()
            delete _user.password

            delete _user.activeKeye
            delete _user.tokens
            res.status(200).send({
                apiStatus: true,
                msg: "Profile image updated successfully",
                data: { _user }
            })
        } catch (err) {
            res.status(504).send({
                apiStatus: true,
                msg: "updated Profile image  faild",
                data: err.message
            })
        }
    }

    static deleteProfileImage = async (req, res) => {
        try {
            const user = await userModel.findById(req.user._id)
            if (!user) throw new Error('user not found')
            user.image = null
            await user.save()
            let _user = user.toObject()
            delete _user.password

            delete _user.activeKeye
            delete _user.tokens
            res.status(200).send({
                apiStatus: true,
                msg: "deleted successfully",
                data: {_user}
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "updaeted faild!",
                data: e.message
            });
        }
    }
    static enableUser = async (req, res) => {
        try {
            const user = await userModel.findById(req.body.id);
            if (!user) throw new Error("user not found!");
            user.status = true;
            user.updatedAt = Date.now();
            await user.save();
            res.status(200).send({
                apiStatus: true,
                msg: "Enabled user successfully",
                data: {},
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "Enabled user faild!",
                data: e.message,
            });
        }
    };

    static disableUser = async (req, res) => {
        try {
            const user = await userModel.findById(req.body.id);
            if (!user) throw new Error("user not found!");
            user.status = false;
            user.updatedAt = Date.now();
            await user.save();
            res.status(200).send({
                apiStatus: true,
                msg: "Disabled user successfully",
                data: {},
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "Disabled user faild!",
                data: e.message,
            });
        }
    };

    static getPassword = async (req, res) => {
        try {
            const user = await userModel.findOne({ email: req.body.email })
            if (!user) throw new Error('email not found!')
            await hepler.sendMailerToSetNewPassword(user._id.toString(), req.body.email)
            res.status(200).send({
                apiStatus: true,
                msg: "check your email",
                data: {}
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "updaeted faild!",
                data: e.message
            });
        }
    }

    static checkCode = async (req, res) => {
        try {
            const user = await userModel.findOne({ _id: req.body.code })
            if (!user) throw new Error('user not found!')
            let token = await user.generateToken();

            res.status(200).send({
                apiStatus: true,
                msg: "check your email",
                data: { token }
            });
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "invalid code!",
                data: e.message
            });
        }
    }

    static setPassword = async (req, res) => {
        try {
            const user = await userModel.findById(req.user._id)
            if (!user) throw new Error('user not found!')
            const valid = await bcrypt.compare(req.body.password, user.password)
            if (valid) throw new Error('User deffirant password!')
            user.password = req.body.password
            user.save();
            let _user = user.toObject()
            delete _user.password

            delete _user.activeKeye
            delete _user.tokens
            res.status(200).send({
                apiStatus: true,
                msg: "password updated successfully",
                data: { _user }
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "updaeted faild!",
                data: e.message
            });
        }
    }

}

module.exports = User;
