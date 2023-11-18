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

## Git 提交规范参考

- `feat` 增加新的业务功能
- `fix` 修复业务问题/BUG
- `perf` 优化性能
- `style` 更改代码风格, 不影响运行结果
- `refactor` 重构代码
- `revert` 撤销更改
- `test` 测试相关, 不涉及业务代码的更改
- `docs` 文档和注释相关
- `chore` 更新依赖/修改脚手架配置等琐事
- `workflow` 工作流改进
- `ci` 持续集成相关
- `types` 类型定义文件更改
- `wip` 开发中