// Log out
function logout() {
  window.location.href = "index.html";
}

// Real-time market data (CoinGecko)
const coins = {
  bitcoin: "BTC",
  ethereum: "ETH",
  solana: "SOL",
  binancecoin: "BNB"
};

async function loadMarket() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true"
    );
    const data = await res.json();

    const tbody = document.getElementById("market-data");
    tbody.innerHTML = "";

    for (const id in coins) {
      const price = data[id].usd.toFixed(2);
      const change = data[id].usd_24h_change.toFixed(2);
      const cls = change >= 0 ? "up" : "down";

      tbody.innerHTML += `
        <tr>
          <td>${coins[id]}</td>
          <td>$${price}</td>
          <td class="${cls}">${change}%</td>
        </tr>
      `;
    }
  } catch (e) {
    document.getElementById("market-data").innerHTML =
      "<tr><td colspan='3'>Failed to load market data</td></tr>";
  }
}

loadMarket();
setInterval(loadMarket, 30000); // refresh every 30s
