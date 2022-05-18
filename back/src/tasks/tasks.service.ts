import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  startScrap() {
    // const args = [
    //   '--no-sandbox',
    //   '--disable-extensions', // 기타 extension 삭제
    //   '--window-size=1920x1080', // 크게보기
    //   '--no-sandbox', // required for Linux without GUI
    //   '--disable-gpu', // required for Windows,
    //   '--lang=ko_KR', // korean
    //   '--enable-logging --v=1', // write debug logs to file(debug.log)
    //   '--ignore-certificate-errors',
    //   'user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    // ];
    // const chromeCapabilities = webdriver.Capabilities.chrome()
    //   .set('chromeOptions', { args })
    //   .set('chrome.binary', chromedriver.path)
    //   .set('acceptInsecureCerts', true); // if you render localhost with SSL
    //
    // chrome.setDefaultService(
    //   new chrome.ServiceBuilder(chromedriver.path).build(),
    // );
    // const driver = new webdriver.Builder()
    //   .withCapabilities(chromeCapabilities)
    //   .build();
    // driver.get(
    //   'https://gift.kakao.com/a/v1/review-rankings?displayTag=%EC%83%9D%EC%9D%BC&priceRange=R_0_1&_=1650719970960',
    // );
  }

  async getItems() {
    try {
      const now = String(+new Date());
      const paths = [
        {
          url: `https://gift.kakao.com/a/v1/best/delivery?page=0&size=100&_=${now}`,
          name: '배송상품',
        },
        {
          url: `https://gift.kakao.com/a/v1/best/coupon?_=${now}`,
          name: '교환권',
        },
      ];

      let createPath = '';
      if (process.env.NODE_ENV !== 'production') {
        createPath = `http://localhost:${process.env.PORT}/api/items`;
      } else {
        createPath = `https://${process.env.JWT_DOMAIN}/api/items`;
      }

      for (const path of paths) {
        const { data } = await axios.get(path.url);
        const items = [];
        if (path.name === '배송상품') {
          data.forEach((i) => {
            if (i.type === 'RANKING') {
              items.push({
                imageUrl: i.item.imageUrl,
                name: i.item.name,
                price: i.item.discountedPrice,
                url: `https://gift.kakao.com/product/${i.item.productId}`,
                option: 'delivery',
              });
            }
          });
        } else {
          data.bestGroupItemsList.forEach((j) => {
            j.bestItems.forEach((i) => {
              if (i.type === 'RANKING') {
                items.push({
                  imageUrl: i.item.imageUrl,
                  name: i.item.name,
                  price: i.item.discountedPrice,
                  url: `https://gift.kakao.com/product/${i.item.productId}`,
                  option: 'voucher',
                });
              }
            });
          });
        }

        await axios.post(createPath, {
          gifts: items,
          option: 'all',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Cron('0 0 * * 0', { name: '주 1회 - 상품 수집' })
  scrapItemWeek() {
    this.logger.log('주 1회 - 상품 수집');
    try {
      return this.getItems();
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  // @Cron(new Date(Date.now() + 10 * 1000), { name: '최초 수집 - 상품 수집' })
  // scrapItemOnce() {
  //   this.logger.log('최초 수집 - 상품 수집');
  //   return this.getItems();
  // }
}
