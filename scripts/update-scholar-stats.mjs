import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const AUTHOR_ID = process.env.SCHOLAR_AUTHOR_ID || 'UCOOmcEAAAAJ';
const OUTPUT_PATH = process.env.SCHOLAR_STATS_PATH || 'data/scholar-stats.json';
const SERPAPI_KEY = process.env.SERPAPI_KEY;

if (!SERPAPI_KEY) {
  throw new Error('SERPAPI_KEY is required to update Google Scholar stats.');
}

const params = new URLSearchParams({
  engine: 'google_scholar_author',
  author_id: AUTHOR_ID,
  api_key: SERPAPI_KEY,
  hl: 'en',
});

const response = await fetch(`https://serpapi.com/search.json?${params}`);
if (!response.ok) {
  throw new Error(`SerpAPI request failed: ${response.status} ${response.statusText}`);
}

const result = await response.json();
if (result.error) {
  throw new Error(`SerpAPI error: ${result.error}`);
}

const table = result.cited_by?.table || [];
const readMetric = (...keys) => {
  for (const key of keys) {
    const row = table.find(item => item[key]);
    const value = row?.[key]?.all;
    if (typeof value === 'number') return value;
  }
  return null;
};

let existing = {};
try {
  existing = JSON.parse(await readFile(OUTPUT_PATH, 'utf8'));
} catch {
  existing = {};
}

const stats = {
  source: 'Google Scholar',
  profileUrl: `https://scholar.google.com/citations?user=${AUTHOR_ID}&hl=en`,
  authorId: AUTHOR_ID,
  citations: readMetric('citations'),
  hIndex: readMetric('h_index', 'indice_h'),
  i10Index: readMetric('i10_index', 'indice_i10'),
  updatedAt: new Date().toISOString(),
};

if (stats.citations === null && stats.hIndex === null && stats.i10Index === null) {
  throw new Error('No citation metrics found in SerpAPI response.');
}

await mkdir(dirname(OUTPUT_PATH), { recursive: true });
await writeFile(OUTPUT_PATH, `${JSON.stringify({ ...existing, ...stats }, null, 2)}\n`);

console.log(`Updated ${OUTPUT_PATH}`);
