const userModel = require('../models/homeModel');

exports.countItems = async () => {
    try {
        const userCount = await userModel.countItems('users') || 0;
        const groupCount = await userModel.countItems('groups') || 0;
        const messageCount = await userModel.countItems('messages') || 0;

        return { userCount, groupCount, messageCount };
    } catch (error) {
        throw error;
    }
};