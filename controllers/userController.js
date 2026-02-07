const DashboardData = require('../services/dashboardData');

class UserController {
  async dashboard(req, res, next) {
    try {
      const dashboardData = await DashboardData.getDashboardData();
      res.status(200).json({
        success: true,
        message: 'User dashboard successfully',
        dashboardData: dashboardData
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();