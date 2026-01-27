// API服务封装
const API_CONFIG = {
    baseURL: 'https://api.coingecko.com/api/v3',
    endpoints: { marketData: '/coins/markets' }
};

// 获取市场数据
async function getMarketData(params = {}) {
    const defaultParams = {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h'
    };
    
    const queryParams = { ...defaultParams, ...params };
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.marketData}?${queryString}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`API请求失败: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('获取市场数据失败:', error);
        return getFallbackMarketData();
    }
}

// 模拟市场数据 (API失败时使用)
function getFallbackMarketData() {
    const basePrices = {
        bitcoin: 89464.16, ethereum: 3250.45, tether: 1.00,
        cardano: 0.68, solana: 185.75, ripple: 0.62
    };
    
    return Object.entries(basePrices).map(([id, price]) => {
        const change = (Math.random() - 0.5) * 0.05;
        return {
            id, symbol: id.substring(0, 3), name: id.charAt(0).toUpperCase() + id.slice(1),
            current_price: price * (1 + change), price_change_percentage_24h: change * 100,
            market_cap: price * (Math.random() * 1e9 + 1e8),
            total_volume: price * (Math.random() * 1e8 + 1e7)
        };
    });
}

// 导出API函数
window.API = { getMarketData, getFallbackMarketData };
