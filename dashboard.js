const marketData = [
  { name: "BTC", price: "43,200", change: "+2.1%" },
  { name: "ETH", price: "2,350", change: "-0.6%" },
  { name: "SOL", price: "98.40", change: "+4.8%" }
];

const table = document.getElementById("marketTable");

function renderMarket(data) {
  table.innerHTML = "";
  data.forEach(c => {
    table.innerHTML += `
      <tr>
        <td>${c.name}</td>
        <td>$${c.price}</td>
        <td>${c.change}</td>
        <td>📈</td>
      </tr>
    `;
  });
}

renderMarket(marketData);

/* 中英文切换（基础） */
document.getElementById("langSwitch").onclick = () => {
  alert("Language switched (next step: full i18n)");
};
