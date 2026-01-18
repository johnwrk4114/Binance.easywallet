document.querySelector("button").addEventListener("click", function() {
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (!username || !password) {
        alert("请填写用户名和密码！");
    } else {
        alert("登录成功（这里可以跳转到主页）");
        // 示例：跳转到主页
        // window.location.href = "home.html";
    }
});
