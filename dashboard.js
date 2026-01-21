document.querySelector(".logout-btn").addEventListener("click", () => {
  const confirmLogout = confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    window.location.href = "index.html";
  }
});
