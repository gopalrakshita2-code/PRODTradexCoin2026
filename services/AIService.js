const AIModel = require('../models/AIModel');

class AIService {
  async updateUserBalanceinAiTrade(AiTradeDuration, userAiEnteredAmount, userOldBalance, afterAITradetUserBalance, dailyROI, userEmail,tradeDurationInDays) {
    const AITradeResult = {
      AiTradeDuration,
      userAiEnteredAmount,
      userOldBalance,
      afterAITradetUserBalance,
      dailyROI,
      tradeDurationInDays
    };

    const updatedUser = await AIModel.updateBalanceAndAiTrade(userEmail, afterAITradetUserBalance, AITradeResult);
    return updatedUser;
  }
   async userAITradeHistory(userEmail) {
    const email = userEmail;
    if (!email) {
      throw new Error('Email is required');
    } 
    const history = await AIModel.userAITradeHistory(email);
    return history;
  }
}

module.exports = new AIService();