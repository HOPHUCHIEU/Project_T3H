// Kiểm tra và tạo collection users nếu chưa tồn tại
if (!db.users) {
    db.createCollection("users");
}

// Tạo tài khoản admin
const admin = {
    username: "admin",
    email: "admin@example.com",
    password: "$2a$10$vDetQnF/509WlWo0ZgdbF.O1K001YRwlkqDUN5M78BwFr5ZvscCY2", // mật khẩu đã được hash
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
};

// Tạo tài khoản user thông thường
const user = {
    username: "user",
    email: "user@example.com",
    password: "$2a$10$vDetQnF/509WlWo0ZgdbF.O1K001YRwlkqDUN5M78BwFr5ZvscCY2", // mật khẩu đã được hash
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date()
};

// Kiểm tra xem admin đã tồn tại chưa
const existingAdmin = db.users.findOne({ email: admin.email });
if (!existingAdmin) {
    db.users.insertOne(admin);
    print("Đã tạo tài khoản admin thành công!");
} else {
    print("Tài khoản admin đã tồn tại!");
}

// Kiểm tra xem user đã tồn tại chưa
const existingUser = db.users.findOne({ email: user.email });
if (!existingUser) {
    db.users.insertOne(user);
    print("Đã tạo tài khoản user thành công!");
} else {
    print("Tài khoản user đã tồn tại!");
}

// Tạo index cho email để đảm bảo duy nhất
db.users.createIndex({ "email": 1 }, { unique: true });

// In ra danh sách users để kiểm tra
print("\nDanh sách users trong database:");
db.users.find().forEach(printjson);
