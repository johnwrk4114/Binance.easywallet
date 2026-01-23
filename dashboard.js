// Dashboard JavaScript - Simplified and Optimized

// DOM Elements
const elements = {
    generateWalletLink: document.getElementById('generateWalletLink'),
    walletLinkDisplay: document.getElementById('walletLinkDisplay'),
    copyWalletLink: document.getElementById('copyWalletLink'),
    marketSearch: document.getElementById('marketSearch'),
    marketTableBody: document.getElementById('marketTableBody'),
    lastUpdated: document.getElementById('lastUpdated'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    languageButtons: document.querySelectorAll('.lang-btn'),
    logoutBtn: document.querySelector('.logout-btn')
};

// Mock market data
const mockMarketData = [
    { asset: 'Bitcoin', symbol: 'BTC', price: 45231.50, change: 2.34, marketCap: '886.2B', volume: '32.5B' },
    { asset: 'Ethereum', symbol: 'ETH', price: 2415.75, change: 1.56, marketCap: '290.1B', volume: '18.2B' },
    { asset: 'Cardano', symbol: 'ADA', price: 0.48, change: -0.23, marketCap: '16.8B', volume: '0.8B' },
    { asset: 'Solana', symbol: 'SOL', price: 102.30, change: 5.67, marketCap: '44.2B', volume: '3.2B' },
    { asset: 'Polkadot', symbol: 'DOT', price: 6.75, change: 0.89, marketCap: '8.7B', volume: '0.4B' },
    { asset: 'Chainlink', symbol: 'LINK', price: 14.20, change: -1.25, marketCap: '8.3B', volume: '0.5B' },
    { asset: 'Litecoin', symbol: 'LTC', price: 68.90, change: 0.45, marketCap: '5.1B', volume: '0.3B' },
    { asset: 'Ripple', symbol: 'XRP', price: 0.52, change: -0.12, marketCap: '28.4B', volume: '1.2B' },
    { asset: 'Dogecoin', symbol: 'DOGE', price: 0.078, change: 3.45, marketCap: '11.2B', volume: '0.9B' },
    { asset: 'Polygon', symbol: 'MATIC', price: 0.78, change: 1.23, marketCap: '7.2B', volume: '0.4B' }
];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initialized');
    
    // Initialize all modules
    initWalletActions();
    initMarketData();
    initUIInteractions();
    initLanguageSwitcher();
    
    // Update timestamp
    updateLastUpdated();
});

// Wallet Actions
function initWalletActions() {
    if (!elements.generateWalletLink) return;
    
    elements.generateWalletLink.addEventListener('click', function() {
        // Generate random wallet address
        const walletAddress = generateWalletAddress();
        elements.walletLinkDisplay.textContent = walletAddress;
        elements.walletLinkDisplay.style.color = '#10b981';
        
        showToast('Wallet address generated successfully!', 'success');
    });
    
    if (elements.copyWalletLink) {
        elements.copyWalletLink.addEventListener('click', function() {
            const text = elements.walletLinkDisplay.textContent;
            if (text && !text.includes('Click')) {
                navigator.clipboard.writeText(text)
                    .then(() => showToast('Address copied to clipboard!', 'success'))
                    .catch(() => showToast('Failed to copy address', 'error'));
            }
        });
    }
}

// Generate random wallet address
function generateWalletAddress() {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
}

// Market Data
function initMarketData() {
    if (!elements.marketTableBody) return;
    
    // Clear loading row
    elements.marketTableBody.innerHTML = '';
    
    // Populate table with mock data
    mockMarketData.forEach(coin => {
        const row = document.createElement('tr');
        const changeClass = coin.change >= 0 ? 'positive' : 'negative';
        const changeIcon = coin.change >= 0 ? '▲' : '▼';
        
        // Create mini trend chart
        const trendPoints = Array.from({length: 7}, () => Math.random() * 100);
        const maxVal = Math.max(...trendPoints);
        const minVal = Math.min(...trendPoints);
        const normalizedPoints = trendPoints.map(p => 
            Math.round(((p - minVal) / (maxVal - minVal)) * 20)
        );
        
        const trendSvg = `<svg width="80" height="24" viewBox="0 0 80 24">
            <polyline points="${normalizedPoints.map((p, i) => `${i * 10},${24 - p}`).join(' ')}" 
                     fill="none" stroke="${coin.change >= 0 ? '#10b981' : '#ef4444'}" 
                     stroke-width="2" />
        </svg>`;
        
        row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #0ea5e9, #3b82f6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                        ${coin.symbol.charAt(0)}
                    </div>
                    <div>
                        <div style="font-weight: 600;">${coin.asset}</div>
                        <div style="color: #64748b; font-size: 12px;">${coin.symbol}</div>
                    </div>
                </div>
            </td>
            <td style="font-weight: 600;">$${coin.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
            <td class="${changeClass}" style="font-weight: 600;">
                ${changeIcon} ${Math.abs(coin.change).toFixed(2)}%
            </td>
            <td>${coin.marketCap}</td>
            <td>${coin.volume}</td>
            <td>${trendSvg}</td>
            <td>
                <button class="btn-icon" style="padding: 6px 12px; font-size: 12px;" onclick="viewAssetDetails('${coin.symbol}')">
                    <i class="fas fa-chart-line"></i> View
                </button>
            </td>
        `;
        
        elements.marketTableBody.appendChild(row);
    });
}

// UI Interactions
function initUIInteractions() {
    // Sidebar toggle for mobile
    if (elements.sidebarToggle) {
        elements.sidebarToggle.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('active');
        });
    }
    
    // Logout button
    if (elements.logoutBtn) {
        elements.logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                showToast('Logging out...', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }
    
    // Market search
    if (elements.marketSearch) {
        elements.marketSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#marketTableBody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
    
    // Sort table columns
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', function() {
            const sortType = this.dataset.sort;
            showToast(`Sorting by ${sortType}...`, 'info');
        });
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            showToast(`Filter applied: ${this.textContent}`, 'info');
        });
    });
}

// Language Switcher
function initLanguageSwitcher() {
    if (!elements.languageButtons.length) return;
    
    elements.languageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            
            // Update active button
            elements.languageButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Simple language switch (in a real app, this would load translations)
            if (lang === 'cn') {
                showToast('切换到中文', 'info');
                updateChineseText();
            } else {
                showToast('Switched to English', 'info');
                updateEnglishText();
            }
        });
    });
}

// Update text to Chinese
function updateChineseText() {
    const translations = {
        'Wallet Dashboard': '钱包仪表板',
        'Welcome back! Here\'s your financial overview': '欢迎回来！这是您的财务概览',
        'Total Balance': '总余额',
        'Wallet Actions': '钱包操作',
        'Send, receive or manage your funds': '发送、接收或管理资金',
        'Market Overview': '市场概览',
        'Recent Activity': '最近活动'
    };
    
    Object.keys(translations).forEach(key => {
        const elements = document.querySelectorAll(`:contains("${key}")`);
        elements.forEach(el => {
            if (el.textContent.trim() === key) {
                el.textContent = translations[key];
            }
        });
    });
}

// Update text to English
function updateEnglishText() {
    // Refresh page to reset to English
    location.reload();
}

// Update last updated timestamp
function updateLastUpdated() {
    if (!elements.lastUpdated) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    elements.lastUpdated.textContent = `Updated at ${timeString}`;
    
    // Auto-update every 30 seconds
    setTimeout(updateLastUpdated, 30000);
}

// Toast notification system
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const icon = type === 'success' ? '✅' : 
                 type === 'error' ? '❌' : 
                 type === 'warning' ? '⚠️' : 'ℹ️';
    
    toast.innerHTML = `
        <span style="font-size: 18px;">${icon}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// View asset details
function viewAssetDetails(symbol) {
    showToast(`Opening details for ${symbol}...`, 'info');
    // In Phase 1, this would open a modal or new page
}

// Auto-refresh market data (simulated)
setInterval(() => {
    // Simulate price updates
    mockMarketData.forEach(coin => {
        const change = (Math.random() - 0.5) * 2;
        coin.price += coin.price * (change / 100);
        coin.change = change;
    });
    
    // Update display
    if (document.querySelector('.market-table')) {
        initMarketData();
        updateLastUpdated();
    }
}, 30000); // Every 30 seconds

// Add CSS for any dynamically created elements
const style = document.createElement('style');
style.textContent = `
    .market-table tr {
        transition: background-color 0.3s ease;
    }
    
    .market-table tr:hover {
        background-color: rgba(255, 255, 255, 0.03);
    }
    
    @media (max-width: 768px) {
        .market-table {
            font-size: 14px;
        }
        
        .market-table th, 
        .market-table td {
            padding: 12px 8px;
        }
    }
`;
document.head.appendChild(style);
