// Reusable manifest for images stored in /public/uploads.
// Add new files here once and reference via `assets.key` everywhere.

const BASE = "/uploads";

export const assets = {
  jerry: `${BASE}/Jerry.jpg`,
  portrait: `${BASE}/portrait.jpeg`,
  dex360: `${BASE}/dex360.png`,
  contello: `${BASE}/contello.png`,
  basehr: `${BASE}/basehr.png`,
  vocs: `${BASE}/vocs.png`,
  crypto: `${BASE}/crypto.jpg`,
  federated: `${BASE}/federated.png`,
} as const;

export type AssetKey = keyof typeof assets;
