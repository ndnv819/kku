/* eslint-disable @typescript-eslint/no-unsafe-return */
import fs from 'fs';
import { chromium } from 'playwright';

export interface RawMenuItem {
  name: string;
  price: string;
}

export interface RawReviewItem {
  postLink: string;
  postTitle: string;
  postContentSnippet: string;
}

export interface RawShopItem {
  id: string;
  latitude: string;
  longitude: string;
  openingTime: string;
  name: string;
  category: string;
  address: string;
  tel: string;
  memo: string;
  menuList: RawMenuItem[];
  reviewList: RawReviewItem[];
  introduction: string;
  canParking: boolean;
  instagramLink: string;
  youtubeLink: string;
  blogLink: string;
  kakaoLink: string;
  imageUrls: string[];
}

async function scrapeAdditionalData(
  itemId: string,
  latitude: string,
  longitude: string,
): Promise<RawShopItem> {
  const browser = await chromium.launch({ headless: true, timeout: 300000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`https://m.place.naver.com/restaurant/${itemId}/home`, {
      timeout: 300000,
    });

    // 플레이스의 상세정보에 진입 후 상호명이 나오는지 기다려야함
    await page.waitForSelector('span.Fc1rA', { timeout: 300000 });
    // 영업시간을 알기위해 영업시간 섹션 클릭
    if ((await page.$('a.gKP9i')) !== null) {
      await page.click('a.gKP9i');
    }

    const openingTime: string = await page
      .$$eval('a.gKP9i .w9QyJ', (spans) =>
        (spans as HTMLElement[])
          .map((span) => span.innerText)
          .join('\n')
          .replace('접기', '')
          .replace('영업 중', ''),
      )
      .catch(() => `영업시간을 찾지 못했습니다: PlaceId: ${itemId}`);
    const name: string = await page
      .$eval('span.Fc1rA', (span) => (span as HTMLElement).innerText)
      .catch(() => `상호명을 찾지 못했습니다: PlaceId: ${itemId}`);
    const category: string = await page
      .$eval('span.DJJvD', (span) => (span as HTMLElement).innerText)
      .catch(() => `카테고리를 찾지 못했습니다: PlaceId: ${itemId}`);
    const address: string = await page
      .$eval('span.LDgIH', (span) => (span as HTMLElement).innerText)
      .catch(() => ''); // `주소를 찾지 못했습니다: PlaceId: ${itemId}`);
    const tel: string = await page
      .$eval('span.xlx7Q', (span) => (span as HTMLElement).innerText)
      .catch(() => ''); // `주소를 찾지 못했습니다: PlaceId: ${itemId}`);
    const memo: string = await page
      .$eval('div.xPvPE', (span) => (span as HTMLElement).innerText)
      .catch(() => ''); // `주소를 찾지 못했습니다: PlaceId: ${itemId}`);

    // 메뉴정보를 불러오기 위해 메뉴섹션으로 이동
    await page.goto(
      `https://m.place.naver.com/restaurant/${itemId}/menu/list`,
      { timeout: 300000 },
    );
    const menuList = await page
      .$$eval(`div.place_section_content > ul > li`, (listItems) => {
        return listItems.map((li) => {
          const menuName =
            (li as HTMLElement)
              .querySelector('span.lPzHi')
              ?.textContent?.trim() ?? '';
          const price =
            (li as HTMLElement)
              .querySelector('div.GXS1X')
              ?.textContent?.trim() ?? '';

          return { name: menuName, price } as RawMenuItem;
        });
      })
      .catch(() => []);

    // 소개와 주차정보를 불러오기 위해 정보탭으로 이동
    await page.goto(
      `https://m.place.naver.com/restaurant/${itemId}/information`,
      { timeout: 300000 },
    );
    // 전체소개를 보기위해 더보기 버튼 클릭
    if ((await page.$('a.OWPIf')) !== null) {
      await page.click('a.OWPIf');
    }

    const introduction = await page
      .$eval('div.T8RFa', (div) => (div as HTMLElement).innerText)
      .catch(() => `소개를 찾지 못했습니다: PlaceId: ${itemId}`);
    const canParking = await page
      .$eval('div.SGJcE', (_div) => true)
      .catch(() => false);
    let instagramLink = '';
    let youtubeLink = '';
    let blogLink = '';
    let kakaoLink = '';
    const snsHrefs = await page.$$eval('ul.sihSR li.R7y09 a', (links) =>
      links.map((link) => link.getAttribute('href')),
    );
    snsHrefs.forEach((snsHref) => {
      if (!snsHref) {
        return;
      }

      if (snsHref.includes('instagram')) {
        instagramLink = snsHref;
      }
      if (snsHref.includes('youtube')) {
        youtubeLink = snsHref;
      }
      if (snsHref.includes('blog')) {
        blogLink = snsHref;
      }
      if (snsHref.includes('kakao')) {
        kakaoLink = snsHref;
      }
    });

    // 썸네일을 가져오기 위해 사진탭으로 이동
    await page.goto(`https://m.place.naver.com/restaurant/${itemId}/photo`, {
      timeout: 300000,
    });
    let imageUrls = await page.$$eval('div.wzrbN a img', (links) =>
      links.map((link) => link.getAttribute('src')),
    );
    imageUrls = imageUrls.filter((imageUrl) => imageUrl !== null).slice(0, 5);

    // 블로그 리뷰 정보를 불러오기 위해 후기탭으로 이동
    await page.goto(
      `https://m.place.naver.com/restaurant/${itemId}/review/ugc?type=photoView`,
      { timeout: 300000 },
    );
    let reviewList: RawReviewItem[] = [];
    if ((await page.$('.place_section_count')) !== null) {
      reviewList = await page
        .$$eval(`div.place_section_content > ul > li`, (listItems) => {
          return listItems.map((li) => {
            const postLink =
              (li as HTMLElement).querySelector('a')?.getAttribute('href') ??
              '';
            const postTitle =
              (li as HTMLElement)
                .querySelector('div.hPTBw')
                ?.textContent?.trim() ?? '';
            const postContentSnippet =
              (li as HTMLElement)
                .querySelector('div.PRq7t')
                ?.textContent?.trim() ?? '';

            return { postLink, postTitle, postContentSnippet } as RawReviewItem;
          });
        })
        .catch(() => []);
    }

    return {
      id: itemId,
      latitude,
      longitude,
      openingTime,
      name,
      category,
      address,
      tel,
      memo,
      menuList,
      reviewList,
      introduction,
      canParking,
      instagramLink,
      youtubeLink,
      blogLink,
      kakaoLink,
      // @ts-ignore
      imageUrls,
    };
  } catch (error) {
    throw new Error(
      // @ts-ignore
      `스크래핑 하던 중 오류가 발생했습니다: PlaceId: ${itemId} - ErrorMessage: ${error.message}`,
    );
  } finally {
    await browser.close();
  }
}

async function scrapeData(searchQuery: string) {
  const browser = await chromium.launch({ headless: true, timeout: 300000 });
  const page = await browser.newPage();

  // 네이버 플레이스 모바일 링크에서 검색어를 통해 크롤링 페이지 로드
  // NOTE:: palywright의 goto는 내부적으로 wait를 사용하기 때문에
  // 비동기 element가 아닌이상 wait를 따로사용할 필요가 없음
  await page.goto(
    `https://m.map.naver.com/search2/search.naver?query=${searchQuery}`,
    { timeout: 300000 },
  );

  // 플레이스의 검색결과는 비동기이기 때문에 리스트 컨테이너 (ul)부분을 기다려야함
  await page.goto(
    `https://m.map.naver.com/search2/search.naver?query=${searchQuery}`,
    { timeout: 300000 },
  );

  if ((await page.$('div.section_err')) !== null) {
    console.log(`플레이스 검색결과가 없습니다: Query: ${searchQuery}`);
    return [];
  }
  try {
    await page.waitForSelector('ul.search_list._items');
  } catch {
    console.log(`플레이스 검색결과를 찾을 수 없습니다: Query: ${searchQuery}`);
    return [];
  }

  const data = await page.$$eval('ul.search_list._items > li', (listItems) => {
    return listItems.map((li) => ({
      id: li.getAttribute('data-id')!,
      title: li.getAttribute('data-title')!,
      latitude: li.getAttribute('data-latitude')!,
      longitude: li.getAttribute('data-longitude')!,
    }));
  });

  // 리스트 스크래핑 이후 리스트 브라우저는 닫음
  await browser.close();

  const results = await Promise.all(
    data.map(({ id, title: _title, latitude, longitude }) =>
      scrapeAdditionalData(id, latitude, longitude),
    ),
  );

  return results;
}

function flattenArray(arr: any[]): RawShopItem[] {
  const flattened: any[] = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      flattened.push(...flattenArray(item));
    } else {
      flattened.push(item);
    }
  });
  return flattened;
}

async function main(): Promise<void> {
  const results = await Promise.all([scrapeData('센텀 애견 동반 카페')]);

  const flatten = flattenArray(results);
  if (!flatten || flatten.length < 1) {
    process.exit(1);
  }

  const final = flatten.map((raw) => {
    return {
      ...raw,
      category: raw.category.includes('카페') ? '카페' : '식당',
      subCategory: raw.category,
    };
  });
  fs.writeFile(
    './scripts/flattened_array.json',
    JSON.stringify(final),
    (err: any) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('JSON file has been saved.');
      }
    },
  );
}

main().catch(console.error);
