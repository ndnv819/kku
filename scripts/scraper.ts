/* eslint-disable @typescript-eslint/no-unsafe-return */
import { chromium } from 'playwright';

interface RawMenuItem {
  name: string;
  price: string;
}

interface RawShopItem {
  name: string;
  category: string;
  address: string;
  tel: string;
  memo: string;
  menuList: RawMenuItem[];
  introduction: string;
  canParking: boolean;
}

async function scrapeAdditionalData(itemId: string): Promise<RawShopItem> {
  const browser = await chromium.launch({ headless: true, timeout: 120000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(`https://m.place.naver.com/restaurant/${itemId}/home`, {
      timeout: 120000,
    });

    // 플레이스의 상세정보에 진입 후 상호명이 나오는지 기다려야함
    await page.waitForSelector('span.Fc1rA', { timeout: 120000 });

    const name: string = await page
      .$eval('span.Fc1rA', (span) => (span as HTMLElement).innerText)
      .catch(() => `상호명을 찾지 못했습니다: PlaceId: ${itemId}`);
    const category: string = await page
      .$eval('span.DJJvD', (span) => (span as HTMLElement).innerText)
      .catch(() => `카테고리를 찾지 못했습니다: PlaceId: ${itemId}`);
    const address: string = await page
      .$eval('span.LDgIH', (span) => (span as HTMLElement).innerText)
      .catch(() => `주소를 찾지 못했습니다: PlaceId: ${itemId}`);
    const tel: string = await page
      .$eval('span.xlx7Q', (span) => (span as HTMLElement).innerText)
      .catch(() => `주소를 찾지 못했습니다: PlaceId: ${itemId}`);
    const memo: string = await page
      .$eval('div.xPvPE', (span) => (span as HTMLElement).innerText)
      .catch(() => `주소를 찾지 못했습니다: PlaceId: ${itemId}`);

    // 메뉴정보를 불러오기 위해 메뉴섹션으로 이동
    await page.goto(
      `https://m.place.naver.com/restaurant/${itemId}/menu/list`,
      { timeout: 120000 },
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
      { timeout: 120000 },
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

    return {
      name,
      category,
      address,
      tel,
      memo,
      menuList,
      introduction,
      canParking,
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
  const browser = await chromium.launch({ headless: true, timeout: 120000 });
  const page = await browser.newPage();

  // 네이버 플레이스 모바일 링크에서 검색어를 통해 크롤링 페이지 로드
  // NOTE:: palywright의 goto는 내부적으로 wait를 사용하기 때문에
  // 비동기 element가 아닌이상 wait를 따로사용할 필요가 없음
  await page.goto(
    `https://m.map.naver.com/search2/search.naver?query=${searchQuery}`,
    { timeout: 120000 },
  );

  // 플레이스의 검색결과는 비동기이기 때문에 리스트 컨테이너 (ul)부분을 기다려야함
  await page.waitForSelector('ul.search_list._items');

  const data = await page.$$eval('ul.search_list._items > li', (listItems) => {
    return listItems.map((li) => ({
      id: li.getAttribute('data-id')!,
      title: li.getAttribute('data-title')!,
    }));
  });

  // 리스트 스크래핑 이후 리스트 브라우저는 닫음
  await browser.close();

  const results = await Promise.all(
    data.slice(0, 1).map(({ id, title: _title }) => scrapeAdditionalData(id)),
  );

  console.log(results);
}

scrapeData('해운대 애견 동반 카페').catch(console.error);
scrapeData('연산 애견 동반 카페').catch(console.error);
scrapeData('동래 애견 동반 카페').catch(console.error);
scrapeData('센텀 애견 동반 카페').catch(console.error);
scrapeData('전포 애견 동반 카페').catch(console.error);
scrapeData('서면 애견 동반 카페').catch(console.error);
