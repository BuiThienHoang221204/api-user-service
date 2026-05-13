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

## Deployment (AWS EC2)

### Docker Deployment (Recommended)

This project includes a `Dockerfile` and `docker-compose.yml` for easy containerized deployment.

1. Install Docker and Docker Compose on your EC2 instance.
2. Clone the repository.
3. Run the following command:
```bash
docker-compose up -d --build
```
This will start cả User Service và MariaDB container.


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
