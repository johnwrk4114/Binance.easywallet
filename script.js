// 语言文本
const texts = {
    en: {
        pageTitle: "Bitcoin Wallet Login",
        email: "Email",
        password: "Password",
        loginBtn: "Login",
        registerBtn: "Register",
        forgotBtn: "Forgot Password",
        emptyAlert: "Please fill in your email and password!",
        loginSuccess: "Login successful!"
    },
    zh: {
        pageTitle: "比特币钱包 登录",
        email: "邮箱",
        password: "密码",
        loginBtn: "登录",
        registerBtn: "注册",
        forgotBtn: "忘记密码",
        emptyAlert: "请填写邮箱和密码！",
        loginSuccess: "登录成功！"
    }
};

// 默认语言
let currentLang = 'en';

// 元素
const pageTitle = document.getElementById('pageTitle');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const forgotBtn = document.getElementById('forgotBtn');
const enBtn = document.getElementById('enBtn');
const zhBtn = document.getElementById('zhBtn');

// 切换语言函数
function setLanguage(lang){
    currentLang = lang;
    const t = texts[lang];
    pageTitle.textContent = t.pageTitle;
    emailInput.placeholder = t.email;
    passwordInput.placeholder = t.password;
    loginBtn.textContent = t.loginBtn;
    registerBtn.textContent = t.registerBtn;
    forgotBtn.textContent = t.forgotBtn;
}

// 点击语言按钮
enBtn.addEventListener('click', () => setLanguage('en'));
zhBtn.addEventListener('click', () => setLanguage('zh'));

// 登录按钮
loginBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const t = texts[currentLang];

    if(!email || !password){
        alert(t.emptyAlert);
    } else {
        alert(t.loginSuccess);
    }
});

// 注册按钮
registerBtn.addEventListener('click', () => {
    const t = texts[currentLang];
    alert(`${t.registerBtn} clicked!`);
});

// 忘记密码按钮
forgotBtn.addEventListener('click', () => {
    const t = texts[currentLang];
    alert(`${t.forgotBtn} clicked!`);
});

// 初始化语言
setLanguage(currentLang);
