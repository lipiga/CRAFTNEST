const isAuth = (req, res, next) => {
    if (res.session.isAuth) {
        next()
    } else {
        res.redirect('api/user/login')
    }
}

export default isAuth