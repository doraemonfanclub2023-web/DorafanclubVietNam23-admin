// =========================
// DANH SÁCH TÀI KHOẢN GỐC
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

// ====================================================
// KHỞI TẠO DỮ LIỆU MẶC ĐỊNH TRÊN LOCALSTORAGE (NẾU CHƯA CÓ)
// ====================================================
if (!localStorage.getItem("memberList")) {
    const defaultMembers = [
        { id: 1, name: "Nguyễn Tuấn Khải", role: "Ban Quản Trị" },
        { id: 2, name: "Nguyễn Thị Thảo Nhi", role: "Admin" },
        { id: 3, name: "Khánh Duy", role: "Admin" }
    ];
    localStorage.setItem("memberList", JSON.stringify(defaultMembers));
}

if (!localStorage.getItem("adminList")) {
    const defaultAdmins = [
        { id: "BQT001", name: "Nguyễn Tuấn Khải", role: "Ban Quản Trị" },
        { id: "ADMIN001", name: "Khánh Duy", role: "Admin" }
    ];
    localStorage.setItem("adminList", JSON.stringify(defaultAdmins));
}

if (!localStorage.getItem("noticeList")) {
    const defaultNotices = [
        { id: 1, title: "Mini Game tháng 8 sắp khởi tranh", date: "02/07/2026" },
        { id: 2, title: "Tuyển thêm Admin duyệt bài Fanpage", date: "30/06/2026" },
        { id: 3, title: "Thông báo kế hoạch Offline Fanclub tại TP.HCM", date: "25/06/2026" }
    ];
    localStorage.setItem("noticeList", JSON.stringify(defaultNotices));
}

if (!localStorage.getItem("gameList")) {
    const defaultGames = [
        { id: 1, name: "Đố vui Doraemon nhận móc khóa acrylic", status: "Đang diễn ra" },
        { id: 2, name: "Nhanh tay lẹ mắt: Đuổi hình bắt chữ cùng Nobita", status: "Đang diễn ra" },
        { id: 3, name: "Góc sáng tạo: Chế ảnh cùng bảo bối tương lai", status: "Đang diễn ra" }
    ];
    localStorage.setItem("gameList", JSON.stringify(defaultGames));
}

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

// ==========================================
// HIỂN THỊ THÔNG TIN & KÍCH HOẠT DASHBOARD
// ==========================================
function loadDashboard() {
    const user = checkLogin();
    const name = document.getElementById("userName");

    if (name) {
        name.innerHTML = user.name + " (" + user.role + ")";
    }

    // Tự động hiển thị Trang Chủ ngay khi load xong Dashboard
    showPage('home');
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

// ====================================================
// CHỨC NĂNG CHUYỂN ĐỔI NỘI DUNG SPA (SHOW PAGE ĐỘNG)
// ====================================================
function showPage(page) {
    let html = "";

    // Đọc dữ liệu cập nhật mới nhất từ LocalStorage
    const members = JSON.parse(localStorage.getItem("memberList")) || [];
    const admins = JSON.parse(localStorage.getItem("adminList")) || [];
    const notices = JSON.parse(localStorage.getItem("noticeList")) || [];
    const games = JSON.parse(localStorage.getItem("gameList")) || [];

    switch(page) {
        // --- TRANG CHỦ ---
        case "home":
            html = `
                <h2>Tổng quan</h2>
                <br>
                <div class="cards">
                    <div class="card" style="cursor:pointer;" onclick="showPage('members')">
                        <h3>👥 Thành viên</h3>
                        <h1>${members.length}</h1>
                    </div>
                    <div class="card" style="cursor:pointer;" onclick="showPage('admins')">
                        <h3>🛡️ Admin</h3>
                        <h1>${admins.length}</h1>
                    </div>
                    <div class="card" style="cursor:pointer;" onclick="showPage('notice')">
                        <h3>📢 Thông báo</h3>
                        <h1>${notices.length}</h1>
                    </div>
                    <div class="card" style="cursor:pointer;" onclick="showPage('game')">
                        <h3>🎁 Mini Game</h3>
                        <h1>${games.length}</h1>
                    </div>
                </div>

                <div class="activity">
                    <h3>📋 Hoạt động hệ thống</h3>
                    <ul>
                        <li>Hệ thống vận hành ổn định trên nền tảng LocalStorage.</li>
                        <li>Cập nhật số liệu thời gian thực (Real-time).</li>
                        <li>Đã đồng bộ hóa dữ liệu nội bộ Dora Fanclub Việt Nam.</li>
                    </ul>
                </div>
            `;
            break;

        // --- TRANG THÀNH VIÊN ---
        case "members":
            let memberRows = "";
            members.forEach((m, index) => {
                memberRows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${m.name}</td>
                        <td>${m.role}</td>
                        <td><button onclick="deleteMember(${m.id})" style="background:#d32f2f; color:#fff; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;">Xóa</button></td>
                    </tr>`;
            });
            html = `
                <h2>👥 Quản lý Thành viên</h2><br>
                <div style="background:#fff; padding:15px; border-radius:8px; margin-bottom:20px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                    <h3 style="font-size:16px; color:#0d47a1;">+ Thêm Thành Viên Mới</h3><br>
                    <input type="text" id="newMemName" placeholder="Nhập họ tên..." style="padding:8px; width:220px; margin-right:10px; border:1px solid #ccc; border-radius:4px;">
                    <select id="newMemRole" style="padding:8px; margin-right:10px; border:1px solid #ccc; border-radius:4px;">
                        <option value="Thành viên">Thành viên</option>
                        <option value="Admin">Admin</option>
                        <option value="Ban Quản Trị">Ban Quản Trị</option>
                    </select>
                    <button onclick="addMember()" style="background:#1976d2; color:#fff; border:none; padding:8px 15px; border-radius:4px; cursor:pointer;">Thêm</button>
                </div>
                <table class="table">
                    <tr><th>STT</th><th>Họ tên</th><th>Vai trò</th><th>Hành động</th></tr>
                    ${memberRows ? memberRows : '<tr><td colspan="4" style="text-align:center;">Chưa có thành viên nào</td></tr>'}
                </table>`;
            break;

        // --- TRANG QUẢN LÝ ADMIN ---
        case "admins":
            let adminRows = "";
            admins.forEach((a) => {
                adminRows += `
                    <tr>
                        <td>${a.id}</td>
                        <td>${a.name}</td>
                        <td>${a.role}</td>
                        <td><button onclick="deleteAdmin('${a.id}')" style="background:#d32f2f; color:#fff; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;">Xóa</button></td>
                    </tr>`;
            });
            html = `
                <h2>🛡️ Quản lý Admin</h2><br>
                <div style="background:#fff; padding:15px; border-radius:8px; margin-bottom:20px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                    <h3 style="font-size:16px; color:#0d47a1;">+ Thêm Quản Trị Viên</h3><br>
                    <input type="text" id="newAdminId" placeholder="Mã TK (VD: ADMIN002)..." style="padding:8px; width:180px; margin-right:10px; border:1px solid #ccc; border-radius:4px;">
                    <input type="text" id="newAdminName" placeholder="Nhập tên Admin..." style="padding:8px; width:200px; margin-right:10px; border:1px solid #ccc; border-radius:4px;">
                    <select id="newAdminRole" style="padding:8px; margin-right:10px; border:1px solid #ccc; border-radius:4px;">
                        <option value="Admin">Admin</option>
                        <option value="Ban Quản Trị">Ban Quản Trị</option>
                    </select>
                    <button onclick="addAdmin()" style="background:#1976d2; color:#fff; border:none; padding:8px 15px; border-radius:4px; cursor:pointer;">Thêm</button>
                </div>
                <table class="table">
                    <tr><th>Tài khoản</th><th>Tên Quản Trị</th><th>Quyền hạn</th><th>Hành động</th></tr>
                    ${adminRows}
                </table>`;
            break;

        // --- TRANG THÔNG BÁO ---
        case "notice":
            let noticeRows = "";
            notices.forEach((n, index) => {
                noticeRows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${n.title}</td>
                        <td>${n.date}</td>
                        <td><button onclick="deleteNotice(${n.id})" style="background:#d32f2f; color:#fff; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;">Xóa</button></td>
                    </tr>`;
            });
            html = `
                <h2>📢 Quản lý Thông báo Fanclub</h2><br>
                <div style="background:#fff; padding:15px; border-radius:8px; margin-bottom:20px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                    <h3 style="font-size:16px; color:#0d47a1;">+ Đăng thông báo mới</h3><br>
                    <input type="text" id="newNoticeTitle" placeholder="Nhập tiêu đề thông báo..." style="padding:8px; width:65%; margin-right:10px; border:1px solid #ccc; border-radius:4px;">
                    <button onclick="addNotice()" style="background:#1976d2; color:#fff; border:none; padding:8px 15px; border-radius:4px; cursor:pointer;">Đăng bài</button>
                </div>
                <table class="table">
                    <tr><th>STT</th><th>Tiêu đề thông báo</th><th>Ngày đăng</th><th>Hành động</th></tr>
                    ${noticeRows ? noticeRows : '<tr><td colspan="4" style="text-align:center;">Không có thông báo nào</td></tr>'}
                </table>`;
            break;

        // --- TRANG MINI GAME ---
        case "game":
            let gameRows = "";
            games.forEach((g, index) => {
                gameRows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td><b>${g.name}</b></td>
                        <td><span style="background:#e8f5e9; color:#2e7d32; padding:3px 8px; border-radius:12px; font-size:12px;">${g.status}</span></td>
                        <td><button onclick="deleteGame(${g.id})" style="background:#d32f2f; color:#fff; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;">Xóa</button></td>
                    </tr>`;
            });
            html = `
                <h2>🎁 Quản lý Hoạt động Mini Game</h2><br>
                <div style="background:#fff; padding:15px; border-radius:8px; margin-bottom:20px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                    <h3 style="font-size:16px; color:#0d47a1;">+ Tạo Hoạt động/Mini Game Mới</h3><br>
                    <input type="text" id="newGameName" placeholder="Tên mini game hoặc sự kiện..." style="padding:8px; width:65%; margin-right:10px; border:1px solid #ccc; border-radius:4px;">
                    <button onclick="addGame()" style="background:#1976d2; color:#fff; border:none; padding:8px 15px; border-radius:4px; cursor:pointer;">Tạo ngay</button>
                </div>
                <table class="table">
                    <tr><th>STT</th><th>Tên Sự Kiện / Mini Game</th><th>Trạng thái</th><th>Hành động</th></tr>
                    ${gameRows ? gameRows : '<tr><td colspan="4" style="text-align:center;">Hiện chưa tổ chức game nào</td></tr>'}
                </table>`;
            break;

        // --- TRANG CÀI ĐẶT ---
        case "setting":
            html = `
                <h2>⚙️ Cài đặt hệ thống</h2>
                <br>
                <p>Phiên bản Dashboard: <b>1.5 (Local Dynamic SPA)</b></p>
                <p>Bản quyền thuộc về: <b>Dora Fanclub Việt Nam</b></p>
            `;
            break;
    }

    document.getElementById("pageContent").innerHTML = html;
}

// ====================================================
// XỬ LÝ LOGIC CRUD (THÊM / XÓA) CHO TỪNG DANH MỤC
// ====================================================

// --- LOGIC THÀNH VIÊN ---
function addMember() {
    const name = document.getElementById("newMemName").value.trim();
    const role = document.getElementById("newMemRole").value;
    if (!name) { alert("Vui lòng nhập tên thành viên!"); return; }
    let members = JSON.parse(localStorage.getItem("memberList")) || [];
    members.push({ id: Date.now(), name: name, role: role });
    localStorage.setItem("memberList", JSON.stringify(members));
    showPage("members");
}
function deleteMember(id) {
    if (confirm("Bạn có chắc muốn xóa thành viên này?")) {
        let members = JSON.parse(localStorage.getItem("memberList")) || [];
        members = members.filter(m => m.id !== id);
        localStorage.setItem("memberList", JSON.stringify(members));
        showPage("members");
    }
}

// --- LOGIC ADMIN ---
function addAdmin() {
    const id = document.getElementById("newAdminId").value.trim().toUpperCase();
    const name = document.getElementById("newAdminName").value.trim();
    const role = document.getElementById("newAdminRole").value;
    if (!id || !name) { alert("Vui lòng nhập đầy đủ Mã TK và Tên Admin!"); return; }
    let admins = JSON.parse(localStorage.getItem("adminList")) || [];
    if (admins.some(a => a.id === id)) { alert("Mã tài khoản này đã tồn tại!"); return; }
    admins.push({ id: id, name: name, role: role });
    localStorage.setItem("adminList", JSON.stringify(admins));
    showPage("admins");
}
function deleteAdmin(id) {
    if (confirm("Bạn có chắc muốn gỡ quyền Admin này không?")) {
        let admins = JSON.parse(localStorage.getItem("adminList")) || [];
        admins = admins.filter(a => a.id !== id);
        localStorage.setItem("adminList", JSON.stringify(admins));
        showPage("admins");
    }
}

// --- LOGIC THÔNG BÁO ---
function addNotice() {
    const title = document.getElementById("newNoticeTitle").value.trim();
    if (!title) { alert("Vui lòng nhập tiêu đề thông báo!"); return; }
    let notices = JSON.parse(localStorage.getItem("noticeList")) || [];
    const today = new Date();
    const dateStr = today.getDate().toString().padStart(2, '0') + '/' + (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getFullYear();
    notices.unshift({ id: Date.now(), title: title, date: dateStr });
    localStorage.setItem("noticeList", JSON.stringify(notices));
    showPage("notice");
}
function deleteNotice(id) {
    if (confirm("Bạn có chắc muốn xóa thông báo này?")) {
        let notices = JSON.parse(localStorage.getItem("noticeList")) || [];
        notices = notices.filter(n => n.id !== id);
        localStorage.setItem("noticeList", JSON.stringify(notices));
        showPage("notice");
    }
}

// --- LOGIC MINI GAME ---
function addGame() {
    const name = document.getElementById("newGameName").value.trim();
    if (!name) { alert("Vui lòng nhập tên Mini Game!"); return; }
    let games = JSON.parse(localStorage.getItem("gameList")) || [];
    games.push({ id: Date.now(), name: name, status: "Đang diễn ra" });
    localStorage.setItem("gameList", JSON.stringify(games));
    showPage("game");
}
function deleteGame(id) {
    if (confirm("Bạn có chắc muốn xóa Mini Game này?")) {
        let games = JSON.parse(localStorage.getItem("gameList")) || [];
        games = games.filter(g => g.id !== id);
        localStorage.setItem("gameList", JSON.stringify(games));
        showPage("game");
    }
}
