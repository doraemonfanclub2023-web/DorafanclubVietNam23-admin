// =========================
// DANH SÁCH TÀI KHOẢN
// =========================

const accounts = [
    {
        username: "BQT001",
        password: "admin123",
        name: "Nguyễn Tuấn Khải",
        role: "Ban Quản Trị"
    },
    {
        username: "ADMIN001",
        password: "admin123",
        name: "Nguyễn Thị Thảo Nhi",
        role: "Admin"
    }
];

// =========================
// ĐĂNG NHẬP
// =========================

function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = accounts.find(account =>
        account.username === username &&
        account.password === password
    );

    if (user) {

        localStorage.setItem("currentUser", JSON.stringify(user));

        window.location.href = "dashboard.html";

    } else {

        document.getElementById("error").style.display = "block";

    }

}

// =========================
// KIỂM TRA ĐĂNG NHẬP
// =========================

function checkLogin() {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        window.location.href = "index.html";
    }

    return user;

}

// =========================
// HIỂN THỊ THÔNG TIN
// =========================

function loadDashboard() {

    const user = checkLogin();

    const name = document.getElementById("userName");

    if (name) {
        name.innerHTML =
            user.name +
            " (" +
            user.role +
            ")";
    }

}

// =========================
// ĐĂNG XUẤT
// =========================

function logout() {

    if (confirm("Bạn có chắc muốn đăng xuất?")) {

        localStorage.removeItem("currentUser");

        window.location.href = "index.html";

    }

}
