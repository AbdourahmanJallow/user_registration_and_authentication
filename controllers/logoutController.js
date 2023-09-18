const User = require('../models/User');

const handleLogout = async (req, res) => {
    // clear cookie on client and server side
    const cookies = req?.cookies;
    const refreshToken = cookies.jwt;

    try {
        const user = await User.findOne({ refreshToken }).exec();
        if (!user) {
            res.clearCookie('jwt', {
                httpOnly: true
            });

            res.sendStatus(204);
        }

        user.refreshToken = ''; //delete refresh token
        const result = await user.save();
        console.log(result);
        res.clearCookie('jwt', {
            httpOnly: true
        });

        res.sendStatus(204);
    } catch (err) {
        console.log(err);
    }
};

module.exports = handleLogout;
