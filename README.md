## 미리보기

![Frame 1 (2)](https://user-images.githubusercontent.com/59174247/162442002-31dab56d-eccf-41db-b38a-41ab79cd1e5c.png)

## 디자인

![image](https://user-images.githubusercontent.com/59174247/155881666-231cc304-2ce1-441e-8cef-c99ff173806c.png)

<br>
<hr>
<br>

## 프론트 개발 사항

<br>

### SSG 프레임워크 : Next.js

<br>
🔸 <b>사용 이유</b>

1. 카카오톡 등으로 이미지를 공유할 때 meta tag의 정보(썸네일, 설명)를 활용해야 해서
2. 추후 반영되는 기능 (선물보기 등)에서 SEO가 필요하기 때문에

<br>
🔹 <b>참고사항</b>

1. Dynamic routing된 페이지에서는 pathname이 `router.asPath`에 담긴다.

<br>

### 프론트 상태관리: Zustand

<br>
🔸 <b>사용 이유</b>

1. redux에 비해 간단한 코드
2. Provider로 감싸지 않고 전역상태에 접근하는 방식이 깔끔하다
3. redux-devtools를 사용할 수도 있다

<br>
🔹 <b>참고사항</b>

1. <a href="https://github.com/victorkvarghese/react-native-query-boilerplate">로컬스토리지와 함께 관리하는 코드 참고</a>

<br>

💦 <b>개발이슈</b>

<table>
    <tr>
        <td>⏱ 2022.03.07</td><td>header의 뒤로가기 동작 <b>기본: history.back()</b>을 일부 페이지에서는 다르게 동작하고 싶었다.</td>
    </tr>
</table>

- useHeader라는 hooks로 headerBackEvent라는 객체(콜백함수)를 관리할 것
- 단, 페이지를 나갈 때 리셋을 시켜야 하는 점에서 관리가 다소 까다로움

<table>
    <tr>
        <td>⏱ 2022.03.07</td><td>외부 도메인 이미지를 사용할 때 에러가 난다</td>
    </tr>
</table>

- <a href="https://github.com/vercel/next.js/discussions/20953">hostname을 <b>next.config.js</b>에 추가</a>

<table>
    <tr>
        <td>⏱ 2022.03.11</td><td>프론트에서 로그인 체크하기</td>
    </tr>
</table>

- <b>getServerSideProps</b> 내부에서 리다이렉트가 필요한데, useRouter는 못쓴다.
    - `redirect: {destination: "/pathname"}` 을 리턴해주면 해당 경로로 리다이렉트 된다.
- <b>getServerSideProps</b> 내부에서 localstorage를 써서 자동로그인을 할 수 없을까? (/utils/index.ts의 checkLogin.ts 참고)
    - <a href="https://github.com/vercel/next.js/discussions/17247">안된다!</a>... 빌드시 실행되는 부분이기 때문에 브라우저 정보(WEB API)를 가져올
      수 없다. 대신 cookie를 사용하자.

<br>

### 서버 상태관리: React-query

<br>
🔸 <b>사용 이유</b>

1. 성공, 에러, 로딩 처리, 캐싱 등의 기능 제공
2. hook 형식으로 간단하게 사용
3. swr 보다 번들사이즈는 크지만, devtool을 제공하고 5분간 비활성된 캐시데이터 garbage collected 등의 기능 제공에서 차이

<br>
🔹 <b>참고사항</b>

1. (추후반영) <a href="https://react-query.tanstack.com/guides/ssr">react-query with next.js</a>

<br>

### CSS: Emotion

<br>
🔸 <b>사용 이유</b>

1. CSS-in-Js의 장점: css모듈은 link태그로 참조만 하는 반면, 서버에서 받아온 style 코드를 바로 사용
2. 개발효율: 코드 관리 쉬움 (스타일 관련 변수를 1번만 정의해도 스타일 + JSX에서 공통으로 사용)

<br>
🔹 <b>참고사항</b>

- @emotion/core 이외 설치 필요: `@emotion/react @emotion/styled @motion/babel-plugin`

<br>
<hr>
<br>

## 백엔드 개발 사항

<br>

### 프레임워크: Nest.js

<br>
🔸 <b>사용 이유</b>

1. 타입스크립트 기본 세팅
2. 즉시 사용 가능한 애플리케이션 아키텍처

<br>
🔹 <b>참고사항</b>

- <a href="https://docs.nestjs.com/recipes/hot-reload">핫 리로드</a> : 위 방식대로 하되, `@types/webpack-env` 추가 설치해야 ts error 없어짐
- typeorm 세팅:
    1. <a href="https://medium.com/crocusenergy/nestjs-typeorm-%EA%B8%B0%EB%B3%B8-crud-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0-69b9640dc826">
       typeorm 설치 및 엔티티 작성법 참고</a>
    2. <a href="https://kyounghwan01.github.io/blog/etc/nest/controller-service/#user-entities-ts">서비스, 모듈 작성법 참고</a>
    3. `yarn typeorm schema:sync` 로 entity와 database간의 씽크를 수동으로 맞춘다 (설정으로 하기: 권장 x)
       <br>
- typeorm 사용법:
    1. <a href="https://typeorm.io/#/select-query-builder">QueryBuilder</a>: 쿼리작성이 편함
    2. <a href="https://mouuaw.tistory.com/19">leftJoinAndMapOne</a>: left join하면서 필드네임 변경 가능하다.
        - `leftJoinAndMapOne('Results.item', 'Results.itemUuid', 'item')`으로 작성한 덕분에, itemUuid이 아닌 item으로 키값을 가져왔다.
- 비밀번호 인증 절차:
    1. 백엔드 작성 방법 참고
        - https://docs.nestjs.com/security/authentication (공식문서가
          불편하면 <a href="https://makemethink.tistory.com/162?category=768132">한글 블로그</a>)

        1. <b>특이사항</b>: 공식문서에서 구조를 다소 바꾸어 커스텀 하였음. (기존 파일구조를 해치지 않기 위해서 auth라는 폴더를 따로 생성하여 로그인관련 로직을 따로 관리하였음. 이를 위해
           AuthModule 내부에 GiftsModule을 심는 것이 아닌, GiftsModule에 AuthModule 기능들`(PassportModule, LocalStrategy)`을 포함하고
           AuthService를 불러옴)
        2. <b>이슈</b>: req.body는 무조건 `{username: string, passsword: string}` 형식으로 요청해야 401 에러가 안난다.
        3. <a href="https://velog.io/@jakeseo_me/%EB%B2%88%EC%97%AD-passport-local%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%98%EB%8A%94-%EB%AA%A8%EB%93%A0-%EA%B2%83">
           passport local strategy 방식에 대해서</a>
    2. 공식문서에 없는 부분: 백엔드에서 토큰을 setCookie 하기
        - 공식문서 대로 요청이 성공되면 ACCESS TOKEN을 응답 받지만, 쿠키 저장은 백엔드에서 지정하게 하고싶다. (<a href="https://charming-kyu.tistory.com/39">
          추가문서</a>)

        - setCookie에 성공하였으나, sameSite 이슈 발생: 개발이슈 part 참고
    3. jwt-strategy 를 통해 AuthGuard로 보안하기
        - 어떤 페이지에서 인증된 상태로, 다른 url에 접속하여 인증을 할 때를 대비하였다.
        - `<참고>` 라는 코드가 붙은 부분을 보면, sign()을 할 때 payload로 건네주는 인자는 나중에 JWT를 해독하여 유저명 비교 등에 사용된다.

💦 <b>개발이슈</b>

<table>
    <tr>
        <td>⏱ 2022.03.31</td><td>기존에 API 요청/응답이 원활했으나, 인증을 할 때 생긴 CORS 에러</td>
    </tr>
</table>

- `Access-Control-Allow-Origin = "*"` (cors: true 옵션)은 만능이 아니다.
- 모든 CORS 요청을 허가하지는 않는다. <b>인증정보 요청</b>인 경우라면 CORS 옵션 설정을 통해 경로지정이 필요하다.
- 프론트와 백에서 모두 `Access-Control-Allow-Origin` 설정을 각 패스를 따로 설정했고, 마찬가지로 `credential: true`도 양쪽에서 지정했다.

<table>
    <tr>
        <td>⏱ 2022.04.03</td><td>sameSite 이슈로 Set-Cookie 헤더를 인식하지 않는 브라우저</td>
    </tr>
</table>

- <a href="https://velog.io/@jsj3282/%EA%B5%AC%EA%B8%80-Chrome-SameSite-%EC%9D%B4%EC%8A%88">참고</a>하여서 쿠키를 추가하였음 (
  SameSite, Secure ) * SameSite=None으로 설정할 경우 Secure 속성을 함께 추가해야 함
- 그리하여도 여전히 CROSS 도메인간 Set-Cookie가 적용되지 않아 <b>리버스 프록시</b>를 설정
    1. 리버스프록시: 경로를 마치 클라이언트 서버에 접속하는 것 처럼 매핑을 할 수 있다.
       <img src="https://i.ibb.co/vqwQR9Z/fef.png"></img>
    2. 방법:
       next에서는 rewrites를 제공하고 있어서 프론트 설정만으로 충분히 가능하다. `next.config.js` 파일에서 매핑코드 추가를 하고, axios 기본값으로 설정된 baseUrl을 변경
        ```
             async rewrites() {
                 return [
                     {
                         source: '/api/:first*/:second*',
                         destination: `${process.env.NEXT_PUBLIC_BACK_URI}/api/:first*/:second*`,
                     },
                     {
                         source: '/api/:path*',
                         destination: `${process.env.NEXT_PUBLIC_BACK_URI}/api/:path*`,
                     },
                 ];
             },
        ```
        ```
            axios.defaults.baseURL = 기존: 백엔드 URL -> 변경: 프론트 URL
        ```

<br>

## 기타

<br>
💛 <b>배포 관리</b>

- <a href="https://www.three-snakes.com/git/git-subtree">Git subtree</a>: 하나의 레포지토리에서 프론트/백 코드를 관리하나, 헤로쿠에서 깃레포를 연동하여 즉시
  배포를 하기 위해서 child 레퍼지토리를 생성하여 분리하는 방식.
    1. 설치법: child 레포지토리를 생성한 후, parent에서 `git subtree add --prefix=back child master` <br />
       (기존 로컬에서 사용했던 back 폴더는 지워야 클론이 가능하다)
    2. 업데이트: 부모의 origin/master의 변경사항을 child/master로 업데이트 하려면  <br />
       `git subtree push --prefix=back child master`를 실행

<br>
💛 <b>카카오 SDK</b>

- <a href="https://yong-nyong.tistory.com/16">블로그 참고</a>
    1. <a href="https://gaemi606.tistory.com/entry/TS-TypeScript%EC%97%90%EC%84%9C-Kakao-SDK-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EB%A7%B5-React">
       타입스크립트와 사용하기</a>: 검색을 하니 보통 any로 처리해주고 있다.
    2. front 폴더에 .env로 API KEY를 첨부하는데, Next에서 제공하는 env 설정을 사용하려면 접두사로 `NEXT_PUBLIC_`을 쓰면 된다

## MEMOS

- FRONT TODO
    1. ripple css
    2. ~~form validation check~~
    3. ~~header back button remove (history.length check)~~
    4. `https://qr.kakaopay.com/${userId}` 형식으로 결과 공유 링크 변경
    5. 결과페이지 무한스크롤
    6. '체험하기' 페이지 생성
    7. 토큰 검증
    8. favicon 추가
- BACK TODO
    1. passport authentication
    2. 상품권 및 선물 링크 수집 서버
    3. 만료 gift 처리
