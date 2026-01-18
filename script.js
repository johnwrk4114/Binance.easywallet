const texts = {
  en: {
    pageTitle: "Virtual Currency Wallet",
    email: "Email",
    password: "Password",
    loginBtn: "Login",
    registerBtn: "Register",
    forgotBtn: "Forgot Password",
    emptyAlert: "Please fill in your email and password!",
    loginSuccess: "Login successful!",
    aboutTitle: "About Binance.easywallet",
    aboutText: `Unlock Financial Freedom, Embrace the On-Chain Future.\n\nCryptocurrencies empower everyone to participate fairly in the economy.\nBinance.easywallet is on a mission to enhance financial autonomy for over 500 million users.\nWe are transforming traditional finance, providing a secure and trusted platform for individuals and institutions to seamlessly access digital assets — trading, staking, custody, payments, and fast, free global transfers.\nWe support on-chain innovation, collaborating with developers and the global community to promote a responsible crypto ecosystem, enabling everyone to benefit from the blockchain revolution.`
  },
  zh: {
    pageTitle: "虚拟货币钱包",
    email: "邮箱",
    password: "密码",
    loginBtn: "登录",
    registerBtn: "注册",
    forgotBtn: "忘记密码",
    emptyAlert: "请填写邮箱和密码！",
    loginSuccess: "登录成功！",
    aboutTitle: "关于 Binance.easywallet",
    aboutText: `解锁财务自由，拥抱链上未来。\n\n加密货币让每个人都能公平参与经济。\nBinance.easywallet 的使命是为超过5亿用户提升财务自主权。\n我们正在改变传统金融，为个人和机构提供安全可靠的平台，实现数字资产的交易、质押、托管、支付以及快速、免费全球转账。\n我们支持链上创新，与开发者和全球社区合作，推动负责任的加密生态，让每个人都能受益于区块链革命。`
  }
};

let currentLang = 'en';

const pageTitle = document.getElementById('pageTitle');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const forgotBtn = document.getElementById('forgotBtn');
const aboutTitle = document.getElementById('aboutTitle');
const aboutText = document.getElementById('aboutText');

function setLanguage(lang){
  currentLang = lang;
  const t = texts[lang];
  pageTitle.textContent = t.pageTitle;
  emailInput.placeholder = t.email;
  passwordInput.placeholder = t.password;
  loginBtn.textContent = t.loginBtn;
  registerBtn.textContent = t.registerBtn;
  forgotBtn.textContent = t.forgotBtn;
  aboutTitle.textContent = t.aboutTitle;
  aboutText.innerHTML = t.aboutText.replace(/\n/g, "<br>");
}

document.querySelectorAll('.language-switch button').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

loginBtn.addEventListener('click', () => {
  const t = texts[currentLang];
  if(!emailInput.value || !passwordInput.value){
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

// 初始化语言
setLanguage(currentLang);
