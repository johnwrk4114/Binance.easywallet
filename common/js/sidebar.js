// 侧边栏自动激活逻辑
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    let pageName = 'dashboard';
    
    if (path.includes('.html')) {
        pageName = path.split('/').pop().replace('.html', '');
        pageName = pageName.split('#')[0].split('?')[0];
    }
    
    console.log('当前页面:', pageName);
    
    // 页面到导航ID的映射 (必须和HTML中的id一致)
    const pageToNavId = {
        'dashboard': 'nav-dashboard',
        'transactions': 'nav-transactions',
        'deposit-withdraw': 'nav-deposit',
        'profile': 'nav-profile',
        'inbox': 'nav-inbox',
        'account': 'nav-account'
    };
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavId = pageToNavId[pageName];
    if (activeNavId) {
        const navElement = document.getElementById(activeNavId);
        if (navElement) {
            navElement.classList.add('active');
        }
    }
});
