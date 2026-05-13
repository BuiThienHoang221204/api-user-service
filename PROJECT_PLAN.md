# Phân tích và Kế hoạch triển khai User Service (Thành viên: Hoàng)

## 1. Phân tích vấn đề hiện tại
Hệ thống đang được xây dựng theo kiến trúc Microservices với sự phân chia nhiệm vụ rõ ràng:
- **Gateway (Hảo):** Tiếp nhận request, định tuyến.
- **Auth Service (Duy):** Quản lý chứng thực, cấp phát token.
- **Notification Service (Hùng):** Gửi thông báo.
- **User Service (Hoàng):** Quản lý thông tin người dùng.

Vấn đề hiện tại là cần thiết lập nền tảng cho User Service để các service khác có thể tương tác. User Service đóng vai trò là "nguồn sự thật" (Source of Truth) cho dữ liệu người dùng nhưng không chịu trách nhiệm bảo mật (đã có Auth Service lo).

## 2. Giải thích đúng yêu cầu
- **Vai trò:** Xây dựng API quản lý người dùng (CRUD).
- **Công nghệ:** Nest.js, MariaDB, Swagger.
- **Đặc thù:** 
    - Mỗi service dùng DB riêng.
    - Không cần cài đặt logic chứng thực (Authentication/Authorization) bên trong User Service (vì Auth Service và Gateway sẽ đảm nhận).
    - Tập trung vào việc cung cấp dữ liệu nhanh, chính xác.

## 3. Phương án giải quyết
- **Kiến trúc:** Sử dụng kiến trúc Modular của Nest.js.
- **Database:** Sử dụng TypeORM để làm việc với MariaDB.
- **API Documentation:** Tích hợp Swagger ngay từ đầu để Hảo (Gateway) và Duy (Auth) có thể xem tài liệu và test API dễ dàng.
- **Data Transfer Object (DTO):** Định nghĩa rõ ràng các yêu cầu đầu vào/đầu ra.

## 4. Đề xuất ưu tiên
1. **Ưu tiên 1:** Khởi tạo project Nest.js và cấu hình MariaDB + Swagger.
2. **Ưu tiên 2:** Thiết kế Schema Database (Bảng `users`).
3. **Ưu tiên 3:** Xây dựng các API cơ bản: Create, Read (Get by ID), Update.
4. **Ưu tiên 4:** Viết API tìm kiếm/liệt kê người dùng (phục vụ cho Admin hoặc các service khác).

## 5. Các file cần thay đổi/tạo mới
- `src/main.ts`: Cấu hình Swagger và Port.
- `src/app.module.ts`: Kết nối Database.
- `src/users/`: Module chính bao gồm:
    - `users.entity.ts`: Định nghĩa bảng trong MariaDB.
    - `users.controller.ts`: Định nghĩa các endpoint API.
    - `users.service.ts`: Xử lý logic nghiệp vụ.
    - `dto/create-user.dto.ts` & `update-user.dto.ts`: Định nghĩa cấu trúc dữ liệu.

## 6. Cách triển khai cụ thể
1. **Khởi tạo:** `npx -y @nestjs/cli new . --package-manager npm`
2. **Cài đặt thư viện:** `@nestjs/typeorm`, `typeorm`, `mysql2` (cho MariaDB), `@nestjs/swagger`.
3. **Cấu hình DB:** Thiết lập thông số kết nối trong `AppModule`.
4. **Tạo Module Users:** Sử dụng lệnh `nest g resource users` để tạo nhanh khung code.
5. **Định nghĩa Entity:** Tạo các trường cơ bản (id, username, email, full_name, phone, status, created_at, updated_at).
7. **Kiểm thử:** Chạy `npm run start:dev` và truy cập `/docs` để xem Swagger.
8. **Đóng gói:** Cấu hình Docker và Docker Compose để sẵn sàng deploy lên AWS EC2.
