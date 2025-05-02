const homePages = require('../utils/homePages');
const homeService = require('../services/homeService');

exports.homePage = async (req, res) => {
    try {
        const { userCount, groupCount, messageCount } = await homeService.countItems();

        return res.render(homePages.home, { userCount, groupCount, messageCount });
    } catch (error) {
        return res.render(homePages.home, { error });
    }
}