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

  async getGifts() {
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
    try {
      const { data } = await axios.get(paths[0].url);
      const gifts = [];
      data.forEach((i) => {
        if (i.type === 'RANKING') {
          gifts.push({
            imageUrl: i.item.imageUrl,
            name: i.item.name,
            price: i.item.discountedPrice,
            url: `https://gift.kakao.com/product/${i.item.productId}`,
          });
        }
      });

      let createPath = '';
      if (process.env.JWT_DOMAIN === 'localhost') {
        createPath = `http://localhost:${process.env.PORT}/api/items`;
      } else {
        createPath = `https://${process.env.JWT_DOMAIN}/api/items`;
      }

      await axios.post(createPath, {
        gifts,
        option: 'all',
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Cron('0 0 * * 0', { name: '주 1회 - 배송상품 수집' }) // “At 00:00 on Sunday.”
  scrapItemWeek() {
    this.logger.log('주 1회 - 배송상품 수집');
    return this.getGifts();
  }

  @Cron(new Date(Date.now() + 10 * 1000), { name: '최초 수집 - 배송상품 수집' }) // 앱이 시작된 후 10초 후에 실행
  scrapItemOnce() {
    this.logger.log('최초 수집 - 배송상품 수집');
    return this.getGifts();
  }
}
