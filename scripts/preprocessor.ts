import fs from 'fs';
import { chromium } from 'playwright';

import type { RawShopItem } from './scraper';

async function main(): Promise<void> {
  fs.readFile('./scripts/flattened_array.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    try {
      const rawData = JSON.parse(data) as RawShopItem[];
      rawData.forEach(async (raw) => {
        const browser = await chromium.launch({
          headless: true,
          timeout: 300000,
        });
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(
          `https://m.search.naver.com/search.naver?sm=tab_hty.top&ssc=tab.m_blog.all&query=${raw.name} 대형견`,
          {
            timeout: 20000,
          },
        );

        await page.waitForSelector(
          'ul.lst_view._fe_view_infinite_scroll_append_target li',
          {
            timeout: 20000,
          },
        );

        const firstLiElement = await page.$(
          'ul.lst_view._fe_view_infinite_scroll_append_target li',
        );
        if (firstLiElement) {
          const titleText = await firstLiElement.$eval(
            'div.title_area',
            (element) => (element as HTMLElement).innerText,
          );
          const descriptionText = await firstLiElement.$eval(
            'div.dsc_area',
            (element) => (element as HTMLElement).innerText,
          );
        }
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });
}

main().catch(console.error);
