# PetHub

**PetHub** is an open-source pet repository for collecting, sharing, and downloading Codex Pets.

Each Pet is stored in its own folder and only needs two core files:

```text
spritesheet.webp
pet.json
```

Users can download their favorite Pets directly, or integrate PetHub into Codex Pet clients, desktop pet tools, or other creative projects.

---

## Project Goal

PetHub aims to become a lightweight, open, and contribution-friendly Codex Pet resource hub.

Its goals are to:

- Collect Codex Pets in different visual styles
- Provide a simple and consistent file structure for every Pet
- Let users download and use Pets quickly
- Make it easy for creators to submit their own Pets
- Provide a foundation for future Pet marketplaces, Pet managers, or plugin ecosystems

---

## Repository Structure

The recommended minimal structure is:

```text
pethub/
├─ README.md
└─ pets/
   └─ neonfox/
      ├─ spritesheet.webp
      └─ pet.json
```

Each Pet lives in its own folder under `pets/`.

---

## Pet File Specification

Each Pet folder must include:

### 1. `spritesheet.webp`

`spriteheet.webp` is the complete animation spritesheet for the Pet.

Recommended specs:

- Format: WebP
- Frame size: 192 × 208
- Background: pure chroma key color, for example `#FF00FF`
- Layout: animation states arranged by rows, frames arranged from left to right
- Each frame contains one complete pose
- No text, logos, UI, borders, shadows, glows, speed lines, ground, or detached effects

### 2. `pet.json`

`pet.json` is the basic manifest file for the Pet.

Minimal example:

```json
{
  "id": "neonfox",
  "displayName": "NeonFox",
  "description": "A cyberpunk fox hacker pet with neon techwear, bright ears, and a tiny wrist deck.",
  "spritesheetPath": "spritesheet.webp"
}
```

Field description:

| Field | Description |
|---|---|
| `id` | Unique Pet ID. Use lowercase letters, numbers, and hyphens |
| `displayName` | Display name of the Pet |
| `description` | Short description of the Pet |
| `spritesheetPath` | Path to the spritesheet file, usually `spritesheet.webp` |

---

## Recommended Naming Convention

Pet IDs should use:

```text
lowercase-kebab-case
```

Examples:

```text
neonfox
cozy-coder-cat
pixel-panda
cyber-rabbit
```

Avoid:

```text
Neon Fox
neon_fox
pet 01
my pet!!!
```

---

## Recommended Animation States

PetHub does not require a fixed animation state list at the moment, but the following states are recommended:

| State | Description |
|---|---|
| `idle` | Idle, breathing, blinking |
| `running` | Working, processing, executing a task |
| `running-left` | Moving left |
| `running-right` | Moving right |
| `waiting` | Waiting, asking, expecting |
| `review` | Inspecting, reviewing, thinking |
| `waving` | Greeting |
| `jumping` | Jumping |
| `failed` | Failed, error, disappointed |

---

## How to Add a New Pet

1. Create a new Pet folder under `pets/`.
2. Add `spritesheet.webp`.
3. Create `pet.json`.
4. Make sure the `id` in `pet.json` matches the folder name.
5. Submit a Pull Request.

Example:

```text
pets/
└─ neonfox/
   ├─ spritesheet.webp
   └─ pet.json
```

---

## Contribution Requirements

Before submitting a Pet, please make sure:

- The Pet is original, shareable, or properly licensed
- `spritesheet.webp` can be opened correctly
- `pet.json` is valid JSON
- The folder name matches the `id` in `pet.json`
- The Pet does not include copyrighted characters, trademarks, logos, or unauthorized assets
- The Pet does not contain offensive, discriminatory, adult, extremist, or illegal content

---

## Usage

You can directly download any Pet folder:

```text
pets/<pet-id>/
```

Then load its manifest in your own project:

```json
{
  "id": "neonfox",
  "displayName": "NeonFox",
  "description": "A cyberpunk fox hacker pet with neon techwear, bright ears, and a tiny wrist deck.",
  "spritesheetPath": "spritesheet.webp"
}
```

A client only needs to read `spritesheetPath` and load the corresponding `spritesheet.webp`.

---

## Roadmap

- Pet preview page
- Online PetHub Gallery
- Pet categories and tags
- Pet search
- One-click download
- Contributor leaderboard
- More complete animation state specification
- Pet package format
- Auto-install support for Codex Pet clients

---

## License

Repository code and documentation are licensed under the MIT License by default.

Each Pet asset may declare its own license in `pet.json`. If no license is declared, the default usage is limited to learning, showcase, and non-commercial use.

---

## Community

Codex Pet submissions are welcome.

Let everyone have their own little companion.
