# 玩点啥

随机发现一个好玩的网站。

## 本地开发

```bash
pnpm install
pnpm run dev
```

## Docker 部署

构建镜像：

```bash
docker build -t wandiansha .
```

运行容器：

```bash
docker run --rm -p 8080:80 wandiansha
```

访问：`http://localhost:8080`

## 常规验证

```bash
pnpm run build
pnpm run lint
pnpm run test
```
