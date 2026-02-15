const admin = require('../config/firebase/firebase');
const db = admin.firestore();
const dashboardDataCollection = db.collection('users');

class DashboardData {
  async getDashboardData(email) {
    try {
      // Get user data using email
      const snap = await db
        .collection('users')
        .where('email', '==', email)
        .limit(1)
        .get();

      if (snap.empty) {
        throw new Error('User not found');
      }

      const userData = snap.docs[0].data();
      return userData;

    } catch (err) {
      throw err;
    }
  }
}

module.exports = new DashboardData();