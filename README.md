# PetHub

**PetHub — Share Your Desktop Pet.**

PetHub is an open-source desktop pet sharing platform for collecting, publishing, installing, and discovering community-made desktop pets.

Every Pet can be previewed in the gallery, installed with one command, and linked back to its creator or project on GitHub.

```bash
npx @talcon/pethub neonfox
```

By default, the PetHub CLI installs pets into:

```text
~/.codex/pets/<pet-id>/
```

---

## What is PetHub?

PetHub is built around one simple idea:

> Share your desktop pet.

Creators can submit their own pets. Users can browse the gallery, install pets locally, and use them in Codex Pet clients, desktop pet tools, or other creative projects.

PetHub is not just a file repository. It is a community index for desktop pet assets, metadata, authorship, and future pet ecosystems.

---

## Quick Install

Install a Pet into your user-level Codex pets directory:

```bash
npx @talcon/pethub neonfox
```

Default output:

```text
~/.codex/
└─ pets/
   └─ neonfox/
      ├─ pet.json
      ├─ index.png
      └─ spritesheet.webp
```

More examples:

```bash
# Install another Pet
npx @talcon/pethub cozycodercat

# Overwrite existing files
npx @talcon/pethub neonfox --force

# Install to a custom root directory
npx @talcon/pethub neonfox --dir ./my-pets

# List available Pets
npx @talcon/pethub list

# Show Pet manifest info
npx @talcon/pethub info neonfox
```

---

## Project Goal

PetHub aims to become a lightweight, open, and contribution-friendly desktop pet hub.

Its goals are to:

- Help creators share their desktop pets
- Help users discover and install pets quickly
- Provide a simple and consistent package structure for every Pet
- Preserve creator attribution and GitHub links
- Support PetHub Gallery, CLI install, issue-based submissions, and PR-based contributions
- Provide a foundation for future desktop pet managers, marketplaces, and plugin ecosystems

---

## Repository Structure

The recommended minimal structure is:

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

Each Pet lives in its own folder under `pets/`.

`pets.json` is generated automatically from `pets/<pet-id>/pet.json` by GitHub Actions. Do not edit it manually.

---

## Pet File Specification

Each Pet folder should include:

### 1. `index.png`

`index.png` is the primary preview image used by the PetHub gallery.

Recommended specs:

- Format: PNG
- Background: transparent preferred
- Recommended size: 512 × 512 or larger square image
- The Pet should be centered and clearly visible
- No UI frame, text, watermark, logo, border, or background scene
- Keep the image suitable for display on dark backgrounds

### 2. `spritesheet.webp`

`spritesheet.webp` is the complete animation spritesheet for the Pet.

Recommended specs:

- Format: WebP
- Frame size: 192 × 208
- Background: pure chroma key color, for example `#FF00FF`
- Layout: animation states arranged by rows, frames arranged from left to right
- Each frame contains one complete pose
- No text, logos, UI, borders, shadows, glows, speed lines, ground, or detached effects

### 3. `pet.json`

`pet.json` is the manifest file for the Pet.

Minimal example:

```json
{
  "id": "neonfox",
  "displayName": "NeonFox",
  "description": "A cyberpunk fox hacker pet with neon techwear, bright ears, and a tiny wrist deck.",
  "spritesheetPath": "spritesheet.webp"
}
```

Recommended example:

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

Field description:

| Field | Description |
|---|---|
| `id` | Unique Pet ID. Use lowercase letters, numbers, hyphens, or underscores. Must match the folder name |
| `displayName` | Display name of the Pet |
| `description` | Short description of the Pet |
| `spritesheetPath` | Path to the spritesheet file, usually `spritesheet.webp` |
| `previewPath` | Path to the gallery preview image, usually `index.png` |
| `category` | Pet category, such as `Beast`, `Robot`, `Spirit`, `Plant`, `Aquatic`, `Mythic`, or `Other` |
| `species` | Optional species/type label. Default: `desktop.pet` |
| `tags` | Optional search tags |
| `author` | Creator name or GitHub handle |
| `githubUrl` | Optional creator or project GitHub link shown on the Pet card |
| `version` | Pet version |
| `license` | Asset license |
| `accent` | Optional hex color used by the gallery card |

---

## Recommended Naming Convention

Pet IDs should use lowercase letters, numbers, hyphens, or underscores.

Examples:

```text
neonfox
cozy-coder-cat
byte_panda
cyber-rabbit
```

Avoid:

```text
Neon Fox
pet 01
my pet!!!
宠物01
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

## How to Submit a New Pet

The recommended submission method is GitHub Issues.

1. Open a new issue with the **Pet Submission** template.
2. Fill in the Pet information.
3. Upload or link `index.png`, `spritesheet.webp`, and `pet.json`.
4. Add a `githubUrl` if you want the Pet card to link to your GitHub profile or project.
5. Wait for maintainer review.
6. After approval, the Pet can be added through a Pull Request.

Read the full submission guide:

```text
docs/PET_SUBMISSION_GUIDE.md
```

---

## How to Add a New Pet by Pull Request

If you are comfortable with Git, you may also submit a Pull Request directly.

1. Create a new Pet folder under `pets/`.
2. Add `index.png`.
3. Add `spritesheet.webp`.
4. Create `pet.json`.
5. Make sure the `id` in `pet.json` matches the folder name.
6. Submit a Pull Request.

Example:

```text
pets/
└─ neonfox/
   ├─ index.png
   ├─ spritesheet.webp
   └─ pet.json
```

After the PR is merged, GitHub Actions automatically regenerates `pets.json`.

---

## Contribution Requirements

Before submitting a Pet, please make sure:

- The Pet is original, shareable, or properly licensed
- `index.png` can be displayed correctly in the gallery
- `spritesheet.webp` can be opened correctly
- `pet.json` is valid JSON
- The folder name matches the `id` in `pet.json`
- The Pet does not include copyrighted characters, trademarks, logos, or unauthorized assets
- The Pet does not contain offensive, discriminatory, adult, extremist, or illegal content

---

## Usage

The easiest way to install a Pet is:

```bash
npx @talcon/pethub <pet-id>
```

Example:

```bash
npx @talcon/pethub neonfox
```

By default, the CLI installs the Pet into your user-level Codex pets directory:

```text
~/.codex/pets/<pet-id>/
```

A client can then read:

```text
~/.codex/pets/<pet-id>/pet.json
```

and load the corresponding `spritesheet.webp` from the same folder.

You can still download any Pet folder directly from the repository if needed:

```text
pets/<pet-id>/
```

---

## Roadmap

- Desktop PetHub Gallery
- Pet categories and tags
- Pet search
- One-command install with `npx @talcon/pethub <pet-id>`
- Contributor and creator links
- Issue-based pet submissions
- Auto-generated `pets.json` catalog
- More complete animation state specification
- Pet package format
- Desktop pet manager integration

---

## License

Repository code and documentation are licensed under the MIT License by default.

Each Pet asset may declare its own license in `pet.json`. If no license is declared, the default usage is limited to learning, showcase, and non-commercial use.

---

## Community

Share your desktop pet.

Let everyone have their own little companion.
