const sendToken = (user, statusCode, res) => {
    const token = user.jwtToken()
    const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60* 1000),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    }
    res.status(statusCode).cookie('user', token, option).json({
        success: true,
        token,
    })
}
module.exports = sendToken
