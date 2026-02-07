const axios = require('axios');
const admin = require('../config/firebase/firebase');
const db = admin.firestore();
const dashboardDataCollection = db.collection('dashboardData');

class DashboardData {
  // Transform API response to only include essential fields
  transformDashboardData(rawData) {
    return rawData.map(coin => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image, // MUST HAVE
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      days_7graph: coin.sparkline_in_7d.price
    }));
  }

  async fetchAndStoreDashboardData() {
    const url = process.env.DASHBOARD_URL || 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true';
    const response = await axios.get(url);

    const rawData = response.data;
    console.log("rawData", rawData);
    
    const transformedData = this.transformDashboardData(rawData);
    const now = new Date();

    // Store both raw and transformed data (or just transformed if you prefer)
    await dashboardDataCollection.doc('latest').set({
      data: transformedData,
      updatedAt: now
    });

    return transformedData;
  }

  async getDashboardData() {
    const doc = await dashboardDataCollection.doc('latest').get();

    const now = new Date();
    const TEN_MINUTES = 10 * 60 * 1000;

    if (doc.exists) {
      const stored = doc.data();
      const updatedAt = stored.updatedAt.toDate ? stored.updatedAt.toDate() : new Date(stored.updatedAt);
      const diff = now - updatedAt;

      // If data is fresh (< 10 minutes), return from DB
      if (diff < TEN_MINUTES) {
        return stored.data;
      }
    }

    // Otherwise call external API and update DB
    return this.fetchAndStoreDashboardData();
  }
}

module.exports = new DashboardData();