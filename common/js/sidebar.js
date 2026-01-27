// 唯一任务：根据当前页面文件名，高亮侧边栏对应菜单
document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取当前页面名称，如 'dashboard.html' -> 'dashboard'
    const path = window.location.pathname;
    let pageName = 'dashboard'; // 默认
    if (path.includes('.html')) {
        pageName = path.split('/').pop().replace('.html', '');
    }
    // 2. 定义页面与菜单ID的对应关系 (菜单ID在你的HTML里)
    const pageToNavId = {
        'dashboard': 'nav-dashboard',
        'transactions': 'nav-transactions',
        'deposit-withdraw': 'nav-deposit',
        'profile': 'nav-profile',
        'inbox': 'nav-inbox',
        'account': 'nav-account'
    };
    // 3. 移除所有激活状态，然后激活当前的
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const activeNavId = pageToNavId[pageName];
    if (activeNavId) {
        const element = document.getElementById(activeNavId);
        if (element) element.classList.add('active');
    }
});
