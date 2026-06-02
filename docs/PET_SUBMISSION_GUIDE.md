# Pet Submission Guide

This guide explains how to submit a new Pet to PetHub through GitHub Issues.

PetHub accepts community-created Codex Pets. A Pet submission should include a preview image, an animation spritesheet, and a manifest file.

---

## Submission Method

Use GitHub Issues to submit a Pet idea or a complete Pet package.

Recommended flow:

1. Open a new issue using the **Pet Submission** template.
2. Fill in all required fields.
3. Upload or link the required assets.
4. Wait for maintainer review.
5. After approval, the Pet can be added to the repository by Pull Request.

If you are comfortable with Git, you may also open a Pull Request directly after creating a submission issue.

---

## Required Folder Structure

Every accepted Pet should eventually follow this structure:

```text
pets/
└─ <pet-id>/
   ├─ index.png
   ├─ spritesheet.webp
   └─ pet.json
```

Example:

```text
pets/
└─ neonfox/
   ├─ index.png
   ├─ spritesheet.webp
   └─ pet.json
```

---

## Required Files

### 1. `index.png`

`index.png` is the primary gallery preview image.

It is used by the PetHub homepage and should present the Pet clearly.

Recommended specs:

- Format: PNG
- Background: transparent preferred
- Recommended size: 512 × 512 or larger square image
- The Pet should be centered and clearly visible
- No UI frame, text, watermark, logo, border, or background scene
- Keep the image suitable for display on dark backgrounds

### 2. `spritesheet.webp`

`spritesheet.webp` is the animation spritesheet used by Pet clients.

Recommended specs:

- Format: WebP
- Frame size: 192 × 208
- Background: pure chroma key color, for example `#FF00FF`
- Layout: animation states arranged by rows, frames arranged from left to right
- Each frame contains one complete pose
- No text, logos, UI, borders, shadows, glows, speed lines, ground, or detached effects

### 3. `pet.json`

`pet.json` is the manifest file for the Pet.

Required fields:

```json
{
  "id": "neonfox",
  "displayName": "NeonFox",
  "description": "A cyberpunk fox hacker pet with neon techwear, bright ears, and a tiny wrist deck.",
  "spritesheetPath": "spritesheet.webp"
}
```

Recommended extended fields:

```json
{
  "id": "neonfox",
  "displayName": "NeonFox",
  "description": "A cyberpunk fox hacker pet with neon techwear, bright ears, and a tiny wrist deck.",
  "spritesheetPath": "spritesheet.webp",
  "previewPath": "index.png",
  "category": "Beast",
  "species": "codex.pet",
  "tags": ["fox", "cyberpunk", "hacker"],
  "author": "@your-github-name",
  "version": "1.0.0",
  "license": "MIT",
  "accent": "#00d992"
}
```

---

## Field Rules

| Field | Required | Rule |
|---|---:|---|
| `id` | Yes | Must match the folder name. Use lowercase kebab-case only. |
| `displayName` | Yes | Human-readable Pet name. |
| `description` | Yes | Short description, preferably under 160 characters. |
| `spritesheetPath` | Yes | Usually `spritesheet.webp`. |
| `previewPath` | Recommended | Usually `index.png`. |
| `category` | Recommended | Example: `Beast`, `Robot`, `Spirit`, `Plant`, `Aquatic`, `Mythic`, `Other`. |
| `species` | Optional | Default: `codex.pet`. |
| `tags` | Recommended | 1–6 lowercase tags. |
| `author` | Recommended | GitHub handle or creator name. |
| `version` | Recommended | Semantic version like `1.0.0`. |
| `license` | Recommended | Asset license. Example: `MIT`, `CC-BY-4.0`, `CC0-1.0`, `Custom`. |
| `accent` | Optional | Hex color used by the gallery card. |

---

## Naming Rules

Pet IDs must use lowercase kebab-case.

Good examples:

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

## Content Requirements

Before submitting, make sure:

- You created the Pet yourself, or you have the right to share it.
- The Pet does not copy copyrighted characters, trademarked mascots, logos, or unauthorized assets.
- The Pet does not contain offensive, discriminatory, adult, extremist, illegal, or hateful content.
- The assets are safe for public open-source distribution.
- The submitted license is clear.
- `pet.json` is valid JSON.
- `id` matches the target folder name.

---

## Review Criteria

A Pet may be accepted when:

- The package structure is complete.
- The preview image displays well in the gallery.
- The spritesheet is usable by a Codex Pet client.
- The manifest is valid and follows the naming rules.
- The Pet has clear authorship and licensing.
- The content is appropriate for an open-source public repository.

A Pet may be rejected or require revision when:

- Required files are missing.
- The asset source or license is unclear.
- The Pet appears to copy protected IP.
- The image quality is too low for the gallery.
- The spritesheet format does not match the expected structure.
- The submission contains unsafe or inappropriate content.

---

## Issue Submission Checklist

When opening a Pet submission issue, include:

- Pet ID
- Display name
- Description
- Category and tags
- Author name or GitHub handle
- License
- `index.png` preview image
- `spritesheet.webp`
- `pet.json` manifest
- Confirmation that you own or can share the assets

---

## Example Issue Summary

```text
Pet ID: neonfox
Display Name: NeonFox
Category: Beast
Tags: fox, cyberpunk, hacker
License: MIT
Files:
- index.png
- spritesheet.webp
- pet.json
```

---

## After Approval

Once a submission is approved, it should be added as:

```text
pets/<pet-id>/index.png
pets/<pet-id>/spritesheet.webp
pets/<pet-id>/pet.json
```

Then the PetHub homepage will automatically read the manifest and display the Pet in the gallery.
