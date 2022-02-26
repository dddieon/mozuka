import { css } from '@emotion/react';

const fonts = css`
  @font-face {
    font-family: 'Spoqa Han Sans';
    font-weight: 700;
    src: local('Spoqa Han Sans Bold'),
      url('/font/SpoqaHanSansNeo-Bold.woff2') format('woff2'),
      url('/font/SpoqaHanSansNeo-Bold.woff') format('woff'),
      url('/font/SpoqaHanSansNeo-Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Spoqa Han Sans';
    font-weight: 400;
    src: local('Spoqa Han Sans Regular'),
      url('/font/SpoqaHanSansNeo-Regular.woff2') format('woff2'),
      url('/font/SpoqaHanSansNeo-Regular.woff') format('woff'),
      url('/font/SpoqaHanSansNeo-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Spoqa Han Sans';
    font-weight: 300;
    src: local('Spoqa Han Sans Light'),
      url('/font/SpoqaHanSansNeo-Light.woff2') format('woff2'),
      url('/font/SpoqaHanSansNeo-Light.woff') format('woff'),
      url('/font/SpoqaHanSansNeo-Light.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Spoqa Han Sans';
    font-weight: 100;
    src: local('Spoqa Han Sans Thin'),
      url('/font/SpoqaHanSansNeo-Thin.woff2') format('woff2'),
      url('/font/SpoqaHanSansNeo-Thin.woff') format('woff'),
      url('/font/SpoqaHanSansNeo-Thin.ttf') format('truetype');
  }
`;

export default fonts;
