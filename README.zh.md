# PetHub

**PetHub** 是一个用于收集、分享和下载 Codex Pet 的开源宠物仓库。

每个 Pet 都是一个独立文件夹，只需要包含两个核心文件：

```text
spritesheet.webp
pet.json
```

用户可以直接下载喜欢的 Pet，也可以将 PetHub 接入自己的 Codex Pet 客户端、桌面宠物工具或其他创意项目中。

---

## 项目目标

PetHub 希望成为一个轻量、开放、易投稿的 Codex Pet 资源库。

它的目标是：

- 收集各种风格的 Codex Pet
- 为每个 Pet 提供统一的文件结构
- 让用户可以快速下载并使用 Pet
- 让创作者可以方便地提交自己的 Pet
- 为未来的 Pet 市场、Pet 管理器或插件生态提供基础规范

---

## 仓库结构

推荐的最小目录结构如下：

```text
pethub/
├─ README.md
└─ pets/
   └─ neonfox/
      ├─ spritesheet.webp
      └─ pet.json
```

每个 Pet 对应 `pets/` 目录下的一个子文件夹。

---

## Pet 文件规范

每个 Pet 文件夹必须包含：

### 1. `spritesheet.webp`

`spriteheet.webp` 是该 Pet 的完整动画精灵图。

建议规范：

- 图片格式：WebP
- 每帧尺寸：192 × 208
- 背景：纯色 chroma key，例如 `#FF00FF`
- 帧排列：按动画状态分行，每行从左到右排列
- 每一格只包含一个完整姿势
- 不包含文字、Logo、UI、边框、阴影、发光、速度线、地面或额外特效

### 2. `pet.json`

`pet.json` 是该 Pet 的基础描述文件。

最小示例：

```json
{
  "id": "neonfox",
  "displayName": "NeonFox",
  "description": "A cyberpunk fox hacker pet with neon techwear, bright ears, and a tiny wrist deck.",
  "spritesheetPath": "spritesheet.webp"
}
```

字段说明：

| 字段 | 说明 |
|---|---|
| `id` | Pet 的唯一 ID，建议使用小写字母、数字和短横线 |
| `displayName` | Pet 的展示名称 |
| `description` | Pet 的简短描述 |
| `spritesheetPath` | spritesheet 文件路径，通常为 `spritesheet.webp` |

---

## 推荐命名规范

Pet ID 建议使用：

```text
lowercase-kebab-case
```

例如：

```text
neonfox
cozy-coder-cat
pixel-panda
cyber-rabbit
```

不建议使用：

```text
Neon Fox
neon_fox
宠物01
my pet!!!
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

## 如何添加一个新的 Pet

1. 在 `pets/` 目录下创建一个新的 Pet 文件夹。
2. 放入 `spritesheet.webp`。
3. 创建 `pet.json`。
4. 确认 `pet.json` 中的 `id` 与文件夹名称一致。
5. 提交 Pull Request。

示例：

```text
pets/
└─ neonfox/
   ├─ spritesheet.webp
   └─ pet.json
```

---

## 投稿要求

提交 Pet 前，请确认：

- Pet 是你原创、可授权分享，或你拥有明确使用权
- `spritesheet.webp` 可以正常打开
- `pet.json` 是合法 JSON
- 文件夹名称与 `pet.json` 中的 `id` 一致
- 不包含侵权角色、商标 Logo 或未经授权的素材
- 不包含攻击性、歧视性、成人、政治极端或违法内容

---

## 使用方式

你可以直接下载某个 Pet 文件夹：

```text
pets/<pet-id>/
```

然后在自己的项目中读取：

```json
{
  "id": "neonfox",
  "displayName": "NeonFox",
  "description": "A cyberpunk fox hacker pet with neon techwear, bright ears, and a tiny wrist deck.",
  "spritesheetPath": "spritesheet.webp"
}
```

客户端只需要根据 `spritesheetPath` 加载对应的 `spritesheet.webp` 即可。

---

## 未来计划

- Pet 预览页面
- 在线 PetHub Gallery
- Pet 分类与标签
- Pet 搜索
- 一键下载
- 贡献者排行榜
- 更完整的动画状态规范
- Pet 打包格式
- Codex Pet 客户端自动安装支持

---

## License

仓库代码与文档默认使用 MIT License。

每个 Pet 的图片素材可以在各自的 `pet.json` 中单独声明授权方式。如果没有额外声明，默认仅用于学习、展示和非商业用途。

---

## Community

欢迎提交你的 Codex Pet。

让每个人都能拥有自己的小宠物。
