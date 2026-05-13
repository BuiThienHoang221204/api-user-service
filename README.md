<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.pnpmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/pnpm/v/@nestjs/core.svg" alt="pnpm Version" /></a>
<a href="https://www.pnpmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/pnpm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.pnpmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/pnpm/dm/@nestjs/common.svg" alt="pnpm Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## User Service (Hoàng)

Đây là **User Service** chịu trách nhiệm quản lý thông tin người dùng trong hệ thống Microservices. Service này được xây dựng bằng NestJS và MariaDB.

### 🚀 Tích hợp cho Thành viên khác:
- **Dành cho Hảo (Gateway):** Định tuyến các yêu cầu liên quan đến người dùng về cổng `3001`.
- **Dành cho Duy (Auth Service):** Sử dụng các endpoint bên dưới để kiểm tra thông tin người dùng hoặc lấy thông tin qua email/phone.

---

## API Reference

**Base URL:** `http://localhost:3001` (Không có prefix `/api`)

### 1. Tài liệu đầy đủ (Swagger)
Truy cập: `http://localhost:3001/docs` để xem chi tiết các DTO và test API trực tiếp.

### 2. Các Endpoints chính
| Method | Endpoint | Description | Query Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/users` | Lấy danh sách người dùng | `email`, `phone` (Optional) |
| **GET** | `/users/:id` | Lấy chi tiết theo ID | |
| **POST** | `/users` | Tạo mới người dùng | |
| **PUT** | `/users/:id` | Cập nhật thông tin | |
| **DELETE** | `/users/:id` | Xóa mềm người dùng | |

**Ví dụ tìm kiếm:**
`GET /users?email=hoang@example.com`
`GET /users?phone=0901234567`

---


## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment (AWS EC2 - Step by Step)

Đây là hướng dẫn chi tiết quá trình triển khai thực tế trên AWS EC2 bằng Docker mà Hoàng đã thực hiện.

### Bước 1: Chuẩn bị máy chủ EC2
1. Kết nối SSH vào server:
   ```bash
   ssh -i "users-service-key.pem" ubuntu@13.239.122.251
   ```
2. Cập nhật hệ thống và cài đặt Docker, Git:
   ```bash
   sudo apt update
   sudo apt install -y docker.io docker-compose git
   ```
3. Cấu hình quyền chạy Docker cho user:
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -aG docker ubuntu
   newgrp docker
   ```

### Bước 2: Triển khai mã nguồn
1. Clone dự án từ GitHub:
   ```bash
   git clone https://github.com/BuiThienHoang221204/api-user-service.git
   cd api-user-service
   ```
2. Tạo và cấu hình file môi trường `.env`:
   ```bash
   nano .env
   ```
   *Dán nội dung cấu hình sau vào (lưu ý DB_HOST đặt là tên service db trong docker-compose):*
   ```env
   PORT=3001
   DB_HOST=user-db
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=sapassword
   DB_DATABASE=user_service_db
   ```
   *(Nhấn Ctrl+O -> Enter -> Ctrl+X để lưu và thoát)*

### Bước 3: Khởi chạy ứng dụng
Chạy lệnh sau để build image và khởi động các container:
```bash
docker compose up -d --build
```

### Bước 4: Kiểm tra và Quản lý
- **Xem danh sách container**: `docker ps` (Phải thấy `user-service-app` và `user-service-db` đang Up).
- **Xem logs ứng dụng**: `docker compose logs -f user-service`
- **Dừng ứng dụng**: `docker compose down`

---

## CI/CD với GitHub Actions

Dự án đã được cấu hình tự động hóa quy trình triển khai. Mỗi khi bạn `push` code lên nhánh `main`, GitHub Actions sẽ tự động SSH vào EC2 và cập nhật bản mới nhất.

### 🛠 Cấu hình cần thiết trên GitHub:
Để quy trình này hoạt động, bạn cần vào repo trên GitHub: **Settings > Secrets and variables > Actions** và thêm các biến sau:

1.  `EC2_HOST`: Địa chỉ IP của EC2 (Ví dụ: `13.239.122.251`)
2.  `EC2_USERNAME`: Thường là `ubuntu`
3.  `EC2_SSH_KEY`: Nội dung của file `users-service-key.pem` (Mở file bằng Notepad, copy toàn bộ nội dung bao gồm cả dòng BEGIN và END).

### 🔄 Quy trình tự động:
1.  Bạn code xong và chạy: `git add .`, `git commit -m "...", `git push origin main`.
2.  GitHub Actions sẽ tự kích hoạt (xem trong tab **Actions**).
3.  Nó sẽ tự động:
    - Kết nối vào EC2.
    - Chạy `git pull` để lấy code mới nhất.
    - Chạy `docker compose up -d --build` để cập nhật ứng dụng mà không làm gián đoạn hệ thống.

---


## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
