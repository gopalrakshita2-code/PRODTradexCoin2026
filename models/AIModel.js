const admin = require('../config/firebase/firebase');

const db = admin.firestore();
const usersCollection = db.collection('users');

class AIModel {
  static async updateBalanceAndAiTrade(userEmail, afterAITradeUserBalance, AITradeResult) {
    const user = await usersCollection.where('email', '==', userEmail).get();
    if (user.empty) {
      throw new Error('User not found');
    }
    const userDoc = user.docs[0];
    const docRef = usersCollection.doc(userDoc.id);
    const currentHistory = userDoc.data().aiTradeHistory || [];
    const newHistory = [...currentHistory, AITradeResult];

    await docRef.update({
      balance: afterAITradeUserBalance,
      aiTradeHistory: newHistory,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const updated = await docRef.get();
    return { id: updated.id, ...updated.data() };
  }

  static async userAITradeHistory(userEmail) {
    const user = await usersCollection.where('email', '==', userEmail).get();
    if (user.empty) {
      throw new Error('User not found');
    }
    const userDoc = user.docs[0];
    const data = userDoc.data();
    return data.aiTradeHistory || [];
  }
}

module.exports = AIModel;