const userModel = require('../models/userModel');

exports.registerUser = async (email, password) => {
    try {
        const user = await userModel.signUp(email, password);
        
        return user;
    } catch (error) {
        throw `Problem podczas rejestracji: ${error}`;
    }
};

exports.loginUser = async (email, password) => {
    try {
        const session = await userModel.signIn(email, password);
        
        return session;
    } catch (error) {
        throw `Problem podczas logowania: ${error}`;
    }
};