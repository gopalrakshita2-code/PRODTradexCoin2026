const authService = require('../services/authService');

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const result = await authService.register(email, password, name);
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }


  async resetPassword(req, res, next) {
  try {
    const { email, password, confirmPassword } = req.body;
    const result = await authService.resetPassword(email, password, confirmPassword);
    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
}
}

module.exports = new AuthController();