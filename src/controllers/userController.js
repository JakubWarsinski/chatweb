const userService = require('../services/userService');
const userPaths = require('../utils/userPages');
const date = require('../utils/currentDate');

exports.loginPage = async (req, res) => {
    if (req.session.user) {
        return res.render(userPaths.profile);
    }
    return res.render(userPaths.login);
}

exports.loginHandle = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.loginUser(email, password);

        req.session.user = user;

        return res.redirect('/user/dashboard');
    } catch (error) {
        return res.render(userPaths.login, { error });
    }
};

exports.registerPage = async (req, res) => {
    return res.render(userPaths.register);
}

exports.registerHandle = async (req, res) => { 
    const { login, email, password } = req.body;

    try {
        const user = await userService.registerUser(login, email, password, date.getCurrentFullDatetime());

        req.session.user = user;

        return res.redirect('/user/dashboard');
    } catch (error) {
        return res.render(userPaths.register, { error });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Błąd podczas wylogowywania');
        }

        if (res.locals.user) {
            res.locals.user = null;
        }
  
        res.clearCookie('connect.sid');
  
        res.redirect('/home');
    });
}

exports.forgotPage = (req, res) => {
    return res.render(userPaths.forgot);
}

exports.forgotHandle = async (req, res) => { 
    const { email } = req.body;

    try {
        const { userId, code } = await userService.restoreCode(email)

        req.session.userCode = { code, userId };

        return res.redirect('/user/reset');
    } catch (error) {
        return res.render(userPaths.forgot, { error });
    }
};

exports.resetPage = async (req, res) => {
    if (req.session.userCode) {
        return res.render(userPaths.reset, { code : req.session.userCode.code });
    }

    return res.render(userPaths.forgot, { error : 'Nie istnieje kod uwierzytelniający'});
}

exports.resetHandle = async (req, res) => {
    const { password, code } = req.body;

    try {
        if (!req.session.userCode) {
            throw 'Nie istnieje kod uwierzytelniający';
        }

        const userId = req.session.userCode.userId;
        const originalCode = req.session.userCode.code;

        if (originalCode != code) {
            throw 'Podano nieprawidłowy kod';
        } 
        
        await userService.resetPassword(userId, password);

        return res.redirect('/user/dashboard');
    } catch (error) {
        return res.render(userPaths.reset, { error, code : req.session.userCode.code });
    }
}

exports.dashboardPage = async (req, res) => {
    const userId = req.session.user.user_id;
    const amount = 6;
    
    try {
        const friends = await userService.friendList(userId, 0, amount);

        return res.render(userPaths.dashboard, { friends });
    } catch(error) {
        return res.render(userPaths.dashboard, { error });
    }
}

exports.friendsHandle = async (req, res) => {  
    const userId = req.session.user.user_id;
    const last = parseInt(req.query.last) || 0;
    const amount = 6;

    try {
        const friends = await userService.friendList(userId, last, amount);
        
        res.json(friends);
    } catch (e) {
        res.status(500).json({ error: 'Błąd podczas ładowania znajomych' });
    }
}