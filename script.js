const texts = {
    en: {
        pageTitle: "Virtual Currency Wallet",
        email: "Email",
        password: "Password",
        loginBtn: "Login",
        registerBtn: "Register",
        forgotBtn: "Forgot Password",
        emptyAlert: "Please fill in your email and password!",
        loginSuccess: "Login successful!"
    },
    zh: {
        pageTitle: "虚拟货币钱包",
        email: "邮箱",
        password: "密码",
        loginBtn: "登录",
        registerBtn: "注册",
        forgotBtn: "忘记密码",
        emptyAlert: "请填写邮箱和密码！",
        loginSuccess: "登录成功！"
    }
};

let currentLang = 'en';
const pageTitle = document.getElementById('pageTitle');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const forgotBtn = document.getElementById('forgotBtn');
const enBtn = document.getElementById('enBtn');
const zhBtn = document.getElementById('zhBtn');

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

enBtn.addEventListener('click', () => setLanguage('en'));
zhBtn.addEventListener('click', () => setLanguage('zh'));

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

registerBtn.addEventListener('click', () => {
    const t = texts[currentLang];
    alert(`${t.registerBtn} clicked!`);
});

forgotBtn.addEventListener('click', () => {
    const t = texts[currentLang];
    alert(`${t.forgotBtn} clicked!`);
});

setLanguage(currentLang);
