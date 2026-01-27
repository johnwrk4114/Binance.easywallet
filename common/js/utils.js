// 只封装2-3个每个页面都可能用到的函数
window.Utils = {
    showToast: function(message, type = 'info') {
        // ... 你现有的showToast代码，确保在所有页面都能弹出通知 ...
    },
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }
};
