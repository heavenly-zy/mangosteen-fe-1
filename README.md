# Vue 3 + Typescript + Vite

[![OSCS Status](https://www.oscs1024.com/platform/badge/heavenly-zy/mangosteen-fe-1.svg?size=small)](https://www.oscs1024.com/project/heavenly-zy/mangosteen-fe-1?ref=badge_small)

## 编码规范

### ref 默认值

推荐使用

```tsx
const div = ref<HTMLDivElement>();
```

不推荐使用

```tsx
const div = ref<HTMLDivElement | null>(null);
```

## 开发

```bash
# 克隆项目
git clone https://github.com/heavenly-zy/mangosteen-fe-1.git

# 进入项目目录
cd mangosteen-fe-1

# 安装依赖
pnpm i

# 启动服务
pnpm dev
```

## 预览

```bash
pnpm preview
```

## 打包

```bash
pnpm build
```

## 代码检查

```bash
pnpm lint:prettier
```
