const DashboardData = require('../services/dashboardData');

class UserController {
  async dashboard(req, res, next) {
    try {

      const email = req.body.email;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      const dashboardData = await DashboardData.getDashboardData(email);
      
      res.status(200).json({
        success: true,
        message: 'User dashboard retrieved successfully',
        dashboardData: dashboardData
      });
    } catch (error) {
      next(error);
    }
  }
  async trade(req, res, next) {
    try {
      const email = req.body.email;
    } catch (error) {
      next(error);
    }
  }
  async tradeHistory(req, res, next) {
    try {
      const email = req.body.email;
    } catch (error) {
      next(error);
    }
  } 
}

module.exports = new UserController();