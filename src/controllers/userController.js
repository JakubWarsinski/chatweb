const userService = require('../services/userService');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.registerUser(email, password);
    
    res.status(201).json({ message: 'Utworzono użytkownika', user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const session = await userService.loginUser(email, password);
    
    res.status(200).json({ message: 'Zalogowano', session });
  } catch (error) {
    res.status(400).json({ error });
  }
};