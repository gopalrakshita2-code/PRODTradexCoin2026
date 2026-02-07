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

  async googleLogin(req, res){
      try {
        const user = await authService.googleLogin(req.body);

        return res.status(200).json({
          success: true,
          user,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
  };
}

module.exports = new AuthController();