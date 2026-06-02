#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, isAbsolute, join, resolve } from 'node:path';

const DEFAULT_OWNER = 'JiChaoSong';
const DEFAULT_REPO = 'PetHub';
const DEFAULT_BRANCH = 'main';
const DEFAULT_INSTALL_DIR = '~/.codex/pets';

function printHelp() {
  console.log(`PetHub CLI

Usage:
  npx @talcon/pethub <pet_id> [options]
  npx @talcon/pethub list
  npx @talcon/pethub info <pet_id>

Examples:
  npx @talcon/pethub neonfox
  npx @talcon/pethub cozycodercat
  npx @talcon/pethub neonfox --dir ~/.codex/pets

Options:
  --dir <path>       Install root directory. Default: ~/.codex/pets
  --force            Overwrite existing files
  --repo <owner/repo> Install from a custom GitHub repo. Default: JiChaoSong/PetHub
  --branch <branch>  Git branch. Default: main
  -h, --help         Show help
`);
}

function parseArgs(argv) {
  const args = [...argv];
  const command = args.shift();
  const options = {
    dir: DEFAULT_INSTALL_DIR,
    force: false,
    repo: `${DEFAULT_OWNER}/${DEFAULT_REPO}`,
    branch: DEFAULT_BRANCH,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--dir') {
      options.dir = args[++i];
    } else if (arg === '--force') {
      options.force = true;
    } else if (arg === '--repo') {
      options.repo = args[++i];
    } else if (arg === '--branch') {
      options.branch = args[++i];
    } else if (arg === '-h' || arg === '--help') {
      options.help = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return { command, options };
}

function resolveInstallRoot(dir) {
  if (!dir || dir === DEFAULT_INSTALL_DIR) {
    return join(homedir(), '.codex', 'pets');
  }

  if (dir === '~') return homedir();
  if (dir.startsWith('~/')) return join(homedir(), dir.slice(2));
  if (isAbsolute(dir)) return dir;

  return resolve(process.cwd(), dir);
}

function getRawBase(options) {
  const [owner, repo] = String(options.repo).split('/');
  if (!owner || !repo) {
    throw new Error('--repo must use owner/repo format, for example JiChaoSong/PetHub');
  }
  return `https://raw.githubusercontent.com/${owner}/${repo}/${options.branch}`;
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

async function fetchBytes(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function loadCatalog(options) {
  const rawBase = getRawBase(options);
  return fetchJson(`${rawBase}/pets.json`);
}

function normalizePet(raw, petId) {
  const id = raw.id || petId;
  const basePath = raw.basePath || `pets/${id}/`;
  return {
    ...raw,
    id,
    displayName: raw.displayName || raw.name || id,
    description: raw.description || raw.desc || '',
    basePath,
    previewPath: raw.previewPath || raw.thumbnailPath || raw.iconPath || 'index.png',
    spritesheetPath: raw.spritesheetPath || 'spritesheet.webp',
  };
}

async function loadPetManifest(options, petId) {
  const rawBase = getRawBase(options);

  try {
    const catalog = await loadCatalog(options);
    const pet = catalog.pets?.find((item) => item.id === petId);
    if (pet) return normalizePet(pet, petId);
  } catch (error) {
    // Catalog is convenient, but the CLI can still install directly from pets/<id>/pet.json.
  }

  const manifestUrl = `${rawBase}/pets/${encodeURIComponent(petId)}/pet.json`;
  const manifest = await fetchJson(manifestUrl);
  return normalizePet(manifest, petId);
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function writeFileSafe(path, bytes, force) {
  if (existsSync(path) && !force) {
    throw new Error(`${path} already exists. Use --force to overwrite.`);
  }
  ensureDir(dirname(path));
  writeFileSync(path, bytes);
}

async function installPet(options, petId) {
  if (!petId || petId === 'help' || options.help) {
    printHelp();
    return;
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(petId)) {
    throw new Error('pet_id must use lowercase kebab-case, for example neonfox or cozy-coder-cat');
  }

  const rawBase = getRawBase(options);
  const pet = await loadPetManifest(options, petId);
  const installRoot = resolveInstallRoot(options.dir);
  const petDir = join(installRoot, pet.id);

  const files = [
    { name: 'pet.json', source: `${rawBase}/${pet.basePath}pet.json` },
    { name: pet.previewPath || 'index.png', source: `${rawBase}/${pet.basePath}${pet.previewPath || 'index.png'}` },
    { name: pet.spritesheetPath || 'spritesheet.webp', source: `${rawBase}/${pet.basePath}${pet.spritesheetPath || 'spritesheet.webp'}` },
  ];

  console.log(`Installing ${pet.displayName} (${pet.id})...`);
  console.log(`Target: ${petDir}`);

  ensureDir(petDir);

  for (const file of files) {
    const bytes = await fetchBytes(file.source);
    const target = join(petDir, file.name);
    writeFileSafe(target, bytes, options.force);
    console.log(`✓ ${file.name}`);
  }

  console.log(`\nInstalled ${pet.displayName} to ${petDir}`);
}

async function listPets(options) {
  const catalog = await loadCatalog(options);
  const pets = [...(catalog.pets || [])].sort((a, b) => a.id.localeCompare(b.id));

  if (!pets.length) {
    console.log('No pets found.');
    return;
  }

  for (const pet of pets) {
    console.log(`${pet.id}\t${pet.displayName || pet.id}`);
  }
}

async function showPetInfo(options, petId) {
  if (!petId) throw new Error('Missing pet_id. Example: npx @talcon/pethub info neonfox');
  const pet = await loadPetManifest(options, petId);
  console.log(JSON.stringify(pet, null, 2));
}

async function main() {
  const { command, options } = parseArgs(process.argv.slice(2));

  if (!command || command === '-h' || command === '--help' || options.help) {
    printHelp();
    return;
  }

  if (command === 'list') {
    await listPets(options);
    return;
  }

  if (command === 'info') {
    const args = process.argv.slice(2);
    const petId = args.find((arg, index) => index > 0 && !args[index - 1].startsWith('--') && !arg.startsWith('--'));
    await showPetInfo(options, petId);
    return;
  }

  await installPet(options, command);
}

main().catch((error) => {
  console.error(`\nPetHub error: ${error.message}`);
  process.exitCode = 1;
});
