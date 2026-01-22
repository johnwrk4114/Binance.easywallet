// ===== Logout =====
function logout() {
  window.location.href = "index.html";
}

// ===== Market Data (CoinGecko Public API) =====
const COINS = {
  bitcoin: "BTC",
  ethereum: "ETH",
  binancecoin: "BNB",
  solana: "SOL"
};

async function loadMarket() {
  const tbody = document.getElementById("market-data");

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price" +
      "?ids=bitcoin,ethereum,binancecoin,solana" +
      "&vs_currencies=usd" +
      "&include_24hr_change=true"
    );

    const data = await response.json();
    tbody.innerHTML = "";

    for (const id in COINS) {
      const price = data[id].usd.toFixed(2);
      const change = data[id].usd_24h_change.toFixed(2);
      const cls = change >= 0 ? "up" : "down";

      tbody.innerHTML += `
        <tr>
          <td>${COINS[id]}</td>
          <td>$${price}</td>
          <td class="${cls}">${change}%</td>
        </tr>
      `;
    }
  } catch (err) {
    tbody.innerHTML =
      "<tr><td colspan='3'>Failed to load market data</td></tr>";
  }
}

loadMarket();
setInterval(loadMarket, 30000); // refresh every 30s
