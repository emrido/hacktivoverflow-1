const User = require('../models/user');

class UserController {
    static editWatchTag(req, res, next) {
        if (req.body.watch_tag && req.body.watch_tag.length > 0) {
            req.body.watch_tag = req.body.watch_tag.map(tag => tag.replace(/ /g,''))
        }
        User
            .findOneAndUpdate({
                _id: req.authenticatedUser._id
            }, {
                $set: req.body
            }, { new: true })
            .then(user => {
                if (!user) {
                    res
                        .status(404)
                        .json({
                            message: 'User not found'
                        })
                } else {
                    res
                        .status(200)
                        .json({
                            watch_tag: user.watch_tag
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getMyTag(req, res, next) {
        User
            .findOne({
                _id: req.authenticatedUser._id
            }, { watch_tag: 1 })
            .then(user => {
                res
                    .status(200)
                    .json({
                        watch_tag: user.watch_tag
                    })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController;