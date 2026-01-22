let currentLang = "en";

/* ===== Language ===== */
const i18n = {
  en: {
    dashboard: "Dashboard",
    buySell: "Buy & Sell",
    depositWithdraw: "Deposit & Withdraw",
    transactions: "Transactions",
    profile: "Profile",
    totalBalance: "Total Balance",
    walletActions: "Wallet Actions",
    pay: "Pay",
    receive: "Receive",
    generate: "Generate",
    market: "Market Overview",
    asset: "Asset",
    price: "Price (USD)",
    change: "24h Change",
    trend: "Trend"
  },
  zh: {
    dashboard: "仪表板",
    buySell: "买卖",
    depositWithdraw: "充值 / 提现",
    transactions: "交易记录",
    profile: "个人资料",
    totalBalance: "总余额",
    walletActions: "钱包操作",
    pay: "打款",
    receive: "收款",
    generate: "生成",
    market: "市场概览",
    asset: "资产",
    price: "价格 (美元)",
    change: "24小时变动",
    trend: "走势"
  }
};

function toggleLang() {
  currentLang = currentLang === "en" ? "zh" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = i18n[currentLang][el.dataset.i18n];
  });
}

/* ===== Logout ===== */
function logout() {
  window.location.href = "index.html";
}

/* ===== Link Generator ===== */
function generateLink() {
  const rand = Math.random().toString(36).substring(2, 15);
  document.getElementById("walletLink").value =
    "wallet://" + rand + Date.now();
}

/* ===== Market ===== */
const coins = {
  bitcoin: "BTC",
  ethereum: "ETH",
  binancecoin: "BNB",
  solana: "SOL"
};

let marketCache = [];

async function loadMarket() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd&include_24hr_change=true"
  );
  const data = await res.json();

  marketCache = Object.keys(coins).map(id => ({
    name: coins[id],
    price: data[id].usd,
    change: data[id].usd_24h_change
  }));

  renderMarket(marketCache);
}

function renderMarket(list) {
  const tbody = document.getElementById("market-data");
  tbody.innerHTML = "";

  list.forEach(c => {
    tbody.innerHTML += `
      <tr>
        <td>${c.name}</td>
        <td>$${c.price.toFixed(2)}</td>
        <td class="${c.change >= 0 ? "up" : "down"}">
          ${c.change.toFixed(2)}%
        </td>
        <td>
          <svg viewBox="0 0 100 30">
            <polyline
              points="0,20 20,18 40,22 60,14 80,10 100,6"
              fill="none"
              stroke="gold"
              stroke-width="2"
            />
          </svg>
        </td>
      </tr>
    `;
  });
}

function filterMarket(q) {
  renderMarket(
    marketCache.filter(c =>
      c.name.toLowerCase().includes(q.toLowerCase())
    )
  );
}

loadMarket();
