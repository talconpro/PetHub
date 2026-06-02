# PetHub

**PetHub — 分享你的桌宠。**

PetHub 是一个开源桌宠分享平台，用于收集、发布、安装和发现社区创作的桌面宠物。

每个 Pet 都可以在 Gallery 中预览，也可以通过一条命令安装到本地，并可以链接到作者或项目的 GitHub。

```bash
npx @talcon/pethub neonfox
```

默认安装目录：

```text
~/.codex/pets/<pet-id>/
```

---

## PetHub 是什么？

PetHub 的核心理念很简单：

> 分享你的桌宠。

创作者可以提交自己的桌宠；用户可以浏览 Gallery、安装喜欢的 Pet，并在 Codex Pet 客户端、桌面宠物工具或其他创意项目中使用。

PetHub 不只是一个文件仓库，而是一个面向桌宠资产、元数据、作者信息和未来桌宠生态的社区索引。

---

## 快速安装

安装一个 Pet 到用户级 Codex pets 目录：

```bash
npx @talcon/pethub neonfox
```

默认输出：

```text
~/.codex/
└─ pets/
   └─ neonfox/
      ├─ pet.json
      ├─ index.png
      └─ spritesheet.webp
```

更多示例：

```bash
# 安装另一个 Pet
npx @talcon/pethub cozycodercat

# 覆盖已有文件
npx @talcon/pethub neonfox --force

# 安装到自定义目录
npx @talcon/pethub neonfox --dir ./my-pets

# 查看可用 Pet
npx @talcon/pethub list

# 查看某个 Pet 的 manifest 信息
npx @talcon/pethub info neonfox
```

---

## 项目目标

PetHub 希望成为一个轻量、开放、易投稿的桌宠分享平台。

它的目标是：

- 帮助创作者分享自己的桌宠
- 帮助用户快速发现和安装桌宠
- 为每个 Pet 提供简单统一的包结构
- 保留作者署名和 GitHub 链接
- 支持 Gallery 浏览、CLI 安装、Issue 投稿和 PR 贡献
- 为未来桌宠管理器、桌宠市场和插件生态提供基础规范

---

## 仓库结构

推荐的最小目录结构如下：

```text
pethub/
├─ README.md
├─ index.html
├─ pets.json
└─ pets/
   └─ neonfox/
      ├─ index.png
      ├─ spritesheet.webp
      └─ pet.json
```

每个 Pet 对应 `pets/` 目录下的一个子文件夹。

`pets.json` 会由 GitHub Actions 根据 `pets/<pet-id>/pet.json` 自动生成，不需要手动维护。

---

## Pet 文件规范

每个 Pet 文件夹建议包含：

### 1. `index.png`

`index.png` 是 PetHub Gallery 使用的主预览图。

建议规范：

- 图片格式：PNG
- 背景：优先透明背景
- 推荐尺寸：512 × 512 或更大的正方形图片
- Pet 居中且清晰可见
- 不包含 UI 边框、文字、水印、Logo 或复杂背景
- 适合在暗色背景上展示

### 2. `spritesheet.webp`

`spritesheet.webp` 是该 Pet 的完整动画精灵图。

建议规范：

- 图片格式：WebP
- 每帧尺寸：192 × 208
- 背景：纯色 chroma key，例如 `#FF00FF`
- 帧排列：按动画状态分行，每行从左到右排列
- 每一格只包含一个完整姿势
- 不包含文字、Logo、UI、边框、阴影、发光、速度线、地面或额外特效

### 3. `pet.json`

`pet.json` 是该 Pet 的 manifest 描述文件。

最小示例：

```json
{
  "id": "neonfox",
  "displayName": "NeonFox",
  "description": "A cyberpunk fox hacker pet with neon techwear, bright ears, and a tiny wrist deck.",
  "spritesheetPath": "spritesheet.webp"
}
```

推荐示例：

```json
{
  "id": "neonfox",
  "displayName": "NeonFox",
  "description": "A cyberpunk fox hacker pet with neon techwear, bright ears, and a tiny wrist deck.",
  "spritesheetPath": "spritesheet.webp",
  "previewPath": "index.png",
  "category": "Beast",
  "species": "desktop.pet",
  "tags": ["fox", "cyberpunk", "hacker"],
  "author": "@your-github-name",
  "githubUrl": "https://github.com/your-name",
  "version": "1.0.0",
  "license": "MIT",
  "accent": "#00d992"
}
```

字段说明：

| 字段 | 说明 |
|---|---|
| `id` | Pet 的唯一 ID，支持小写字母、数字、短横线和下划线，必须与文件夹名称一致 |
| `displayName` | Pet 的展示名称 |
| `description` | Pet 的简短描述 |
| `spritesheetPath` | spritesheet 文件路径，通常为 `spritesheet.webp` |
| `previewPath` | Gallery 预览图路径，通常为 `index.png` |
| `category` | Pet 分类，例如 `Beast`、`Robot`、`Spirit`、`Plant`、`Aquatic`、`Mythic`、`Other` |
| `species` | 可选类型标签，默认 `desktop.pet` |
| `tags` | 搜索标签 |
| `author` | 作者名称或 GitHub handle |
| `githubUrl` | 作者或项目 GitHub 链接，会展示在 Pet 卡片上 |
| `version` | Pet 版本 |
| `license` | 素材授权 |
| `accent` | Gallery 卡片使用的强调色 |

---

## 推荐命名规范

Pet ID 建议使用小写字母、数字、短横线或下划线。

例如：

```text
neonfox
cozy-coder-cat
byte_panda
cyber-rabbit
```

不建议使用：

```text
Neon Fox
pet 01
my pet!!!
宠物01
```

---

## 推荐动画状态

PetHub 当前不强制要求固定动画状态，但推荐按照以下状态制作：

| 状态 | 说明 |
|---|---|
| `idle` | 待机、呼吸、眨眼 |
| `running` | 工作中、处理中、执行任务 |
| `running-left` | 向左移动 |
| `running-right` | 向右移动 |
| `waiting` | 等待、询问、期待 |
| `review` | 检查、审阅、思考 |
| `waving` | 打招呼 |
| `jumping` | 跳跃 |
| `failed` | 失败、错误、沮丧 |

---

## 如何提交一个新的 Pet

推荐通过 GitHub Issues 投稿。

1. 使用 **Pet Submission** 模板创建 Issue。
2. 填写 Pet 信息。
3. 上传或链接 `index.png`、`spritesheet.webp` 和 `pet.json`。
4. 如果希望卡片跳转到你的主页或项目，可以填写 `githubUrl`。
5. 等待维护者审核。
6. 审核通过后，通过 Pull Request 合入仓库。

完整投稿规范见：

```text
docs/PET_SUBMISSION_GUIDE.md
```

---

## 通过 Pull Request 添加 Pet

如果你熟悉 Git，也可以直接提交 Pull Request。

1. 在 `pets/` 目录下创建一个新的 Pet 文件夹。
2. 放入 `index.png`。
3. 放入 `spritesheet.webp`。
4. 创建 `pet.json`。
5. 确认 `pet.json` 中的 `id` 与文件夹名称一致。
6. 提交 Pull Request。

示例：

```text
pets/
└─ neonfox/
   ├─ index.png
   ├─ spritesheet.webp
   └─ pet.json
```

PR 合并后，GitHub Actions 会自动重新生成 `pets.json`。

---

## 投稿要求

提交 Pet 前，请确认：

- Pet 是你原创、可授权分享，或你拥有明确使用权
- `index.png` 可以在 Gallery 中正常展示
- `spritesheet.webp` 可以正常打开
- `pet.json` 是合法 JSON
- 文件夹名称与 `pet.json` 中的 `id` 一致
- 不包含侵权角色、商标 Logo 或未经授权的素材
- 不包含攻击性、歧视性、成人、极端或违法内容

---

## 使用方式

最简单的安装方式：

```bash
npx @talcon/pethub <pet-id>
```

例如：

```bash
npx @talcon/pethub neonfox
```

默认会安装到：

```text
~/.codex/pets/<pet-id>/
```

客户端可以读取：

```text
~/.codex/pets/<pet-id>/pet.json
```

并从同一目录加载 `spritesheet.webp`。

你也可以直接下载仓库中的任意 Pet 文件夹：

```text
pets/<pet-id>/
```

---

## 未来计划

- 桌宠 Gallery 页面
- Pet 分类与标签
- Pet 搜索
- 通过 `npx @talcon/pethub <pet-id>` 一键安装
- 贡献者和创作者链接
- 基于 Issue 的 Pet 投稿流程
- 自动生成 `pets.json` catalog
- 更完整的动画状态规范
- Pet 打包格式
- 桌宠管理器集成

---

## License

仓库代码与文档默认使用 MIT License。

每个 Pet 的图片素材可以在各自的 `pet.json` 中单独声明授权方式。如果没有额外声明，默认仅用于学习、展示和非商业用途。

---

## Community

分享你的桌宠。

让每个人都能拥有自己的小伙伴。
