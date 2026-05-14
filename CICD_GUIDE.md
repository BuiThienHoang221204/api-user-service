# Kiến Thức Tổng Quan về CI/CD và GitHub Actions

## 1. CI/CD là gì?

**CI — Continuous Integration (Tích hợp liên tục)**
Mỗi lần dev push code:
→ hệ thống tự động kiểm tra code.
**Ví dụ:**
- Install dependencies
- Run tests
- Lint
- Build project
- Security scan

**Mục tiêu:** Biết code có lỗi sớm.

**CD — Continuous Delivery / Deployment (Chuyển giao / Triển khai liên tục)**
Sau khi CI pass:
→ tự động deploy lên server.
**Ví dụ:**
- SSH vào EC2
- Pull code mới
- Restart Docker

## 2. Không có CI/CD thì sao?
Developer phải làm tay:
- `git pull`
- `npm install`
- `npm test`
- `npm run build`
- `docker build`
- `docker compose up`

**Hệ quả:** Rất dễ quên step, deploy sai, hoặc gây lỗi production.

## 3. Có CI/CD thì sao?
Khi push code: GitHub tự chạy mọi thứ.

## 4. Luồng CI/CD thực tế
1. Developer push code
2. GitHub Actions trigger
3. Checkout source code
4. Install dependencies
5. Run tests
6. Build application
7. Security scan (Trivy)
8. Code quality scan (SonarCloud)
9. Build Docker image
10. Deploy server
11. Send notification

## 5. GitHub Actions là gì?
[GitHub Actions Documentation](https://docs.github.com/en/actions)
GitHub Actions là hệ thống CI/CD của GitHub. Bạn viết workflow bằng YAML trong thư mục `.github/workflows/deploy.yml`. GitHub sẽ đọc file này và tự động chạy.

## 6. Cấu trúc cơ bản của workflow
Workflow bao gồm các thành phần chính:
- `name`
- `on`
- `jobs`
- `steps`

## 7. Ví dụ workflow tối giản
```yaml
name: My First CI
on:
  push:
    branches:
      - main
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Hello CI/CD"
```

## 8. Giải thích từng phần

### **name**
`name: My First CI`
Tên hiển thị của workflow trên giao diện GitHub.

### **on**
`on: push:`
Quy định khi nào workflow chạy. Các trigger phổ biến:
- `push`
- `pull_request`
- `schedule` (chạy theo lịch)
- `workflow_dispatch` (chạy thủ công)

### **jobs**
`jobs:`
Một workflow có thể có nhiều job chạy song song hoặc tuần tự. Ví dụ: `test`, `build`, `deploy`.

### **runs-on**
`runs-on: ubuntu-latest` (GitHub tạo máy Ubuntu để chạy) 
Hệ điều hành của máy ảo (Runner) mà GitHub cung cấp để thực thi code.
Các runner phổ biến:
- `runs-on: ubuntu-latest`
- `runs-on: windows-latest`
- `runs-on: macos-latest`

### **steps**
`steps:`
Các bước chạy tuần tự bên trong một job.

## 9. uses vs run

### **uses**
Dùng action có sẵn từ cộng đồng hoặc GitHub.
- Ví dụ: `uses: actions/checkout@v4` là dùng action `checkout` phiên bản `v4` để clone source code về runner.
- `uses` thường dùng để gọi các action đã được đóng gói sẵn, giúp tiết kiệm thời gian và công sức.

### **run**
Chạy các dòng lệnh terminal.
- Ví dụ: `run: npm install`

## 10. Workflow NodeJS cơ bản
```yaml
name: Node CI
on:
  push:
    branches:
      - main
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup NodeJS
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

## 11. Luồng hoạt động chi tiết
Push code → GitHub tạo Ubuntu runner → Clone source code → Cài NodeJS → `npm install` → `npm test`.

## 12. Job dependencies (Sự phụ thuộc)
Ví dụ:
`deploy: needs: test`
Nghĩa là job `deploy` chỉ chạy nếu job `test` thành công.

## 13. Ví dụ CI + CD kết hợp
```yaml
name: CI/CD
on:
  push:
    branches:
      - main
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm test

  deploy:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - name: Deploy server
        run: echo "Deploying to production..."
```

## 14. Secrets là gì?
Không bao giờ ghi trực tiếp mật khẩu: `password: abc123`.
Thay vào đó dùng: `${{ secrets.MY_SECRET }}`.
**Cách tạo:** GitHub repository → Settings → Secrets and variables → Actions.

## 15. SSH deploy cơ bản
```yaml
- uses: appleboy/ssh-action@v1.2.0
  with:
    host: ${{ secrets.EC2_HOST }}
    username: ubuntu
    key: ${{ secrets.EC2_SSH_KEY }}
    script: |
      cd app
      git pull
      docker compose up -d
```

## 16. Docker trong CI/CD
CI/CD thường bao gồm: build image → scan image → push image → deploy image.

## 17. Build Docker image
`- run: docker build -t my-app .`

Ví dụ sử dụng Trivy để quét tất cả các cấp độ (từ Low đến Critical):
```yaml
- uses: aquasecurity/trivy-action@master
  with:
    scan-type: 'fs'
    format: 'table'
    severity: 'UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL'
```

## 19. SonarCloud Scan (Kiểm tra chất lượng code)
SonarCloud giúp phân tích "Code Smell", lỗi logic, và lỗ hổng bảo mật trong mã nguồn.
**Cấu hình:**
- Cần file `sonar-project.properties`.
- Cần secret `SONAR_TOKEN`.

```yaml
- name: SonarCloud Scan
  uses: SonarSource/sonarqube-scan-action@v5
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

## 20. Docker Healthcheck (Kiểm tra trạng thái container)
Healthcheck giúp Docker biết container có thực sự đang hoạt động tốt hay không (không chỉ là container đang "running").

**Trong Dockerfile:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:3001/ || exit 1
```

**Trong docker-compose.yml:**
```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3001/"]
  interval: 30s
  timeout: 3s
  retries: 3
```

## 21. Notification (Thông báo)
Ví dụ gửi qua Telegram:
`- uses: appleboy/telegram-action@master`

## 22. Artifact là gì?
Lưu trữ các file sinh ra từ CI (như `dist/`, `coverage/`, file `.jar`).
`- uses: actions/upload-artifact@v4`

## 23. Các trigger phổ biến
- `on: push`: Khi có code mới đưa lên.
- `on: pull_request`: Khi có yêu cầu merge code.
- `on: workflow_dispatch`: Cho phép bấm nút "Run workflow" thủ công trên GitHub UI (Rất hữu ích để test pipeline).

## 24. CI/CD với Docker thực tế
**Luồng chuyên nghiệp:**
Push code ↓ Test ↓ Build Docker image ↓ Trivy scan image ↓ Push image lên registry ↓ EC2 pull image ↓ Deploy.

## 25. Các tool CI/CD phổ biến
| Tool | Mục đích |
| :--- | :--- |
| GitHub Actions | CI/CD tích hợp trực tiếp GitHub |
| GitLab CI | CI/CD của hệ sinh thái GitLab |
| Jenkins | Công cụ CI/CD nguồn mở mạnh mẽ |
| Docker | Đóng gói ứng dụng (Containerization) |
| Kubernetes | Quản lý container (Orchestration) |
| SonarSource | Kiểm tra chất lượng code |
| Trivy | Quét lỗ hổng bảo mật |

## 26. Thứ tự học tập đề xuất
1. Git & GitHub
2. Linux command
3. Docker
4. Docker Compose
5. GitHub Actions cơ bản
6. SSH deploy
7. Trivy
8. Docker Registry
9. Kubernetes
10. Monitoring & Logging

## 27. Điều quan trọng nhất
Đừng học thuộc YAML. Hãy luôn tự hỏi: **"Step này đang tự động hóa việc gì?"**.
Ví dụ: `- run: npm test` thực chất là tự động kiểm tra code thay vì dev phải tự chạy tay mỗi lần code xong.

## 28. Bài tập luyện tập
- **Level 1:** Push → SSH → deploy EC2.
- **Level 2:** Push → install → test → deploy.
- **Level 3:** Push → build Docker → deploy.
- **Level 4:** Push → build image → Trivy scan → deploy.
- **Level 5:** Push → build image → push registry → EC2 pull image.
- **Level 6 (Pro):** Level 5 + Sonar scan + Docker Healthcheck.
