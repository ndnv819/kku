/*
import fs from 'fs';

import type { RawShopItem } from './scraper';

async function main(): Promise<void> {
  fs.readFile('./scripts/flattened_array.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    try {
      const rawData: RawShopItem[] = JSON.parse(data);
      rawData.forEach((rawData) => {
        console;
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });
}
*/
