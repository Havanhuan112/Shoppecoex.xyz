// Kiểm tra nếu đã có danh sách người dùng trong localStorage, nếu chưa thì khởi tạo mảng rỗng
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
}

// Kiểm tra trạng thái đăng nhập
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// Nếu người dùng đã đăng nhập trước đó, hiển thị profile và nút đăng xuất
if (loggedInUser) {
    showProfile(loggedInUser);
} else {
    showAuthButtons();
}

// Hiển thị form Đăng Ký
document.getElementById("register-btn").addEventListener("click", () => {
    document.getElementById("register-form").classList.remove("hidden");
    document.getElementById("login-form").classList.add("hidden");
});

// Hiển thị form Đăng Nhập
document.getElementById("login-btn").addEventListener("click", () => {
    document.getElementById("login-form").classList.remove("hidden");
    document.getElementById("register-form").classList.add("hidden");
});

// Hàm Đăng Ký
function register() {
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (username && password) {
        const users = JSON.parse(localStorage.getItem("users"));
        // Kiểm tra nếu người dùng đã tồn tại
        if (users.some(user => user.username === username)) {
            alert("Tên người dùng đã tồn tại!");
        } else {
            // Thêm người dùng mới vào localStorage
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            document.getElementById("register-form").classList.add("hidden");
            document.getElementById("login-form").classList.remove("hidden");
        }
    } else {
        alert("Vui lòng điền đầy đủ thông tin.");
    }
}

// Hàm Đăng Nhập
function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Đăng nhập thành công!");
        showProfile(user);
    } else {
        alert("Tên người dùng hoặc mật khẩu không đúng.");
    }
}

// Hiển thị Profile và ẩn các nút Đăng Ký, Đăng Nhập
function showProfile(user) {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.add("hidden");
    document.getElementById("auth").classList.add("hidden");
    document.getElementById("profile").classList.remove("hidden");
    document.getElementById("username-display").innerText = `Xin chào, ${user.username}!`;
    document.getElementById("logout-btn").classList.remove("hidden");
}

// Hiển thị các nút Đăng Ký và Đăng Nhập
function showAuthButtons() {
    document.getElementById("auth").classList.remove("hidden");
    document.getElementById("profile").classList.add("hidden");
    document.getElementById("logout-btn").classList.add("hidden");
}

// Đăng Xuất
function logout() {
    localStorage.removeItem("loggedInUser"); // Xóa thông tin đăng nhập
    showAuthButtons();
}
// Hàm đóng form khi nhấn nút "X"
function closeForm(formId) {
    // Tìm form bằng ID và ẩn nó
    const form = document.getElementById(formId);
    if (form) {
        form.classList.add("hidden");
    }
}


// hell member 

// Toggle menu (hiển thị/ẩn)
function toggleMenu() {
    const menu = document.getElementById("menu");
    const overlay = document.getElementById("overlay");
    const isMenuVisible = !menu.classList.contains("hidden");

    if (isMenuVisible) {
        menu.classList.add("hidden");
        overlay.classList.add("hidden");
    } else {
        menu.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }
}

// Mở mục nạp tiền
function openDepositOptions() {
    const depositOptions = document.getElementById("deposit-options");
    depositOptions.classList.remove("hidden");
    document.getElementById("menu").classList.add("hidden");
}

// Mở phần nạp Bank
function openBankDeposit() {
    document.getElementById("bank-deposit").classList.remove("hidden");
    document.getElementById("card-deposit").classList.add("hidden");
}

// Mở phần nạp thẻ cào
function openCardDeposit() {
    document.getElementById("card-deposit").classList.remove("hidden");
    document.getElementById("bank-deposit").classList.add("hidden");
}

// Gửi thông tin nạp thẻ cào
function submitCard() {
    const seri = document.getElementById("seri").value;
    const pin = document.getElementById("pin").value;

    if (seri && pin) {
        alert("Thông tin thẻ cào đã được gửi.");
        // Xử lý gửi dữ liệu nạp thẻ cào tại đây
    } else {
        alert("Vui lòng nhập đầy đủ thông tin thẻ cào.");
    }
}

// Đóng form nạp tiền
function closeDepositOptions() {
    document.getElementById("deposit-options").classList.add("hidden");
}

// Đóng form nạp bank
function closeBankDeposit() {
    document.getElementById("bank-deposit").classList.add("hidden");
}

// Đóng form nạp thẻ cào
function closeCardDeposit() {
    document.getElementById("card-deposit").classList.add("hidden");
}

// Tạo mã nạp ngẫu nhiên
function generateDepositCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 10; i++) { // Mã có độ dài 10 ký tự
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}

// Mở phần nạp Bank và tạo mã nạp
function openBankDeposit() {
    // Hiển thị thông tin nạp bank
    document.getElementById("bank-deposit").classList.remove("hidden");
    document.getElementById("card-deposit").classList.add("hidden");

    // Sinh mã nạp và hiển thị vào phần tử span với id deposit-code
    const depositCode = generateDepositCode();
    document.getElementById("deposit-code").innerText = depositCode;
}
// Hàm sao chép thông tin vào clipboard
function copyToClipboard(text) {
    // Tạo một thẻ textarea tạm thời để sao chép
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);

    // Chọn và sao chép nội dung
    textarea.select();
    document.execCommand("copy");

    // Xóa thẻ textarea sau khi sao chép
    document.body.removeChild(textarea);

    // Thông báo sao chép thành công
    alert("Đã sao chép thông tin vào clipboard!");
}

// Hiển thị form thông báo khi vào trang web
window.onload = function() {
    document.getElementById("welcome-form").style.display = "flex";
}

// Đóng form thông báo
function closeWelcomeForm() {
    document.getElementById("welcome-form").style.display = "none";
}


   // JavaScript để bật/tắt nhạc
        const musicToggle = document.getElementById("music-toggle");
        const musicIcon = document.getElementById("music-icon");
        const musicName = document.getElementById("music-name");
        const backgroundMusic = document.getElementById("background-music");

        let isMusicPlaying = true;

        // Khi người dùng nhấn vào nút bật/tắt nhạc
        musicToggle.addEventListener("click", function() {
            if (isMusicPlaying) {
                backgroundMusic.pause(); // Dừng nhạc
                musicIcon.classList.remove("fa-play"); // Xóa biểu tượng phát
                musicIcon.classList.add("fa-pause"); // Thêm biểu tượng tạm dừng
                musicName.classList.add("hidden"); // Ẩn tên nhạc
            } else {
                backgroundMusic.play(); // Phát nhạc
                musicIcon.classList.remove("fa-pause"); // Xóa biểu tượng tạm dừng
                musicIcon.classList.add("fa-play"); // Thêm biểu tượng phát
                musicName.classList.remove("hidden"); // Hiển thị tên nhạc
            }
            isMusicPlaying = !isMusicPlaying;
        });
    
        function register() {
    // Lấy dữ liệu từ form
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    // Kiểm tra nếu tên người dùng và mật khẩu không rỗng
    if (username && password) {
        // Tạo đối tượng người dùng
        const newUser = {
            username: username,
            password: password
        };

        // Lấy danh sách người dùng từ localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Thêm người dùng mới vào danh sách
        users.push(newUser);

        // Lưu lại danh sách người dùng vào localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Chuyển hướng đến trang ADMIN sau khi đăng ký thành công
        window.location.href = "admin.html";
    } else {
        alert("Vui lòng nhập đầy đủ thông tin!");
    }
}

// Hàm gửi thông tin thẻ cào và chuyển đến trang quản lý
function submitCard() {
    const seri = document.getElementById('seri').value.trim();
    const pin = document.getElementById('pin').value.trim();

    // Kiểm tra nếu người dùng chưa nhập đủ thông tin
    if (!seri || !pin) {
        alert('Vui lòng nhập đầy đủ thông tin thẻ cào!');
        return;
    }

    // Lưu thông tin thẻ cào vào localStorage (hoặc bạn có thể gửi đến server)
    const depositInfo = { seri, pin, date: new Date().toISOString() };
    let deposits = JSON.parse(localStorage.getItem('deposits')) || [];
    deposits.push(depositInfo);
    localStorage.setItem('deposits', JSON.stringify(deposits));

    // Chuyển đến trang quản lý tin nhắn (dành cho ADMIN)
    window.location.href = 'admin-dashboard.html';
}

//particles ios form game đào rơi 
         