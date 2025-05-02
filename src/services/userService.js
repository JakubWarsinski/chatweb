const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.registerUser = async (login, email, password, date) => {
    try {
        const existingUser = await userModel.checkExistence(`login.eq.${login},email.eq.${email}`);

        if (existingUser) {
            throw 'Użytkownik o podanym e-mailu, lub loginie już istnieje.';
        }
        
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await userModel.signUpUser({ login, email, password : hashedPassword, created_at : date });

        if (!user) {
            throw 'Nie udało się odnaleźć użytkownika po rejestracji.';
        }

        return user;
    } catch (error) {
        throw error;
    }
};

exports.loginUser = async (email, password) => {
    try {
        const existingUser = await userModel.checkExistence(`email.eq.${email}`);
        
        if (!existingUser) {
            throw 'Podany użytkownik nie istnieje.';
        }

        const user = await userModel.signInUser(existingUser.user_id);

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw 'Podano nieprawidłowy e-mail, lub hasło.';
        }

        delete user.password;

        return user;
    } catch (error) {
        throw error;
    }
};

exports.restoreCode = async (email) => {
    try {
        const user = await userModel.checkExistence(`email.eq.${email}`);

        if (!user) {
            throw 'Podany użytkownik nie istnieje.';
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        return { userId : user.user_id, code }
    } catch(error) {
        throw error;
    }
}

exports.resetPassword = async (userId, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await userModel.updateUser(userId, { password : hashedPassword })

        if (!user) {
            throw 'Błąd podczas aktualizacji hasła';
        }

        return null;
    } catch(error) {
        throw error;
    }
}

exports.friendList = async (userId, last, amount) => {
    try {
        const friends = userModel.updateUser(userId, last, amount);

        if (!friends) {
            throw 'Nie posiadasz ani jednego znajomego na liście';
        }

        return friends;
    } catch(error) {
        throw error;
    }
}