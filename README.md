## 디자인 미리보기

![image](https://user-images.githubusercontent.com/59174247/155881666-231cc304-2ce1-441e-8cef-c99ff173806c.png)

<br>
<hr>
<br>

## 프론트 개발 사항

### SSG 프레임워크 : Next.js

`사용 이유`

1. 카카오톡 등으로 이미지를 공유할 때 meta tag의 정보(썸네일, 설명)를 활용해야 해서
2. 추후 반영되는 기능 (선물보기 등)에서 SEO가 필요하기 때문에

`참고 사항`

1. Dynamic routing된 페이지에서는 pathname이 `router.asPath`에 담긴다.

### 프론트 상태관리: Zustand

`사용 이유`

1. redux에 비해 간단한 코드
2. Provider로 감싸지 않고 전역상태에 접근하는 방식이 깔끔하다
3. redux-devtools를 사용할 수도 있다

`참고 사항`

1. <a href="https://github.com/victorkvarghese/react-native-query-boilerplate">로컬스토리지와 함께 관리하는 코드 참고</a>

`개발 이슈`

1. <p style="color: #4d66f333">2022.03.07</p>

   header의 뒤로가기 동작 `기본: history.back()`을 일부 페이지에서는 다르게 동작하고 싶었다.

    - useHeader라는 hooks로 headerBackEvent라는 객체(콜백함수)를 관리할 것
    - 단, 페이지를 나갈 때 리셋을 시켜야 하는 점에서 관리가 다소 까다로움
2. <p style="color: #4d66f333">2022.03.07</p>

   외부 도메인 이미지를 사용할 때 에러가 난다
    - <a href="https://github.com/vercel/next.js/discussions/20953">hostname을 `next.config.js`에 추가</a>
    - 추가 이후에도 에러가 났다.

### 서버 상태관리: React-query

`사용 이유`

1. 성공, 에러, 로딩 처리, 캐싱 등의 기능 제공
2. hook 형식으로 간단하게 사용
3. swr 보다 번들사이즈는 크지만, devtool을 제공하고 5분간 비활성된 캐시데이터 garbage collected 등의 기능 제공에서 차이

`참고 사항`

1. (추후반영) <a href="https://react-query.tanstack.com/guides/ssr">react-query with next.js</a>

### CSS: Emotion

`사용 이유`

1. CSS-in-Js의 장점: css모듈은 link태그로 참조만 하는 반면, 서버에서 받아온 style 코드를 바로 사용
2. 개발효율: 코드 관리 쉬움 (스타일 관련 변수를 1번만 정의해도 스타일 + JSX에서 공통으로 사용)

`세팅 참고`

- @emotion/core 이외 설치 필요: `@emotion/react @emotion/styled @motion/babel-plugin`

<br>
<hr>
<br>

## 백엔드 개발 사항

### 프레임워크: Nest.js

`사용 이유`

1. 타입스크립트 기본 세팅
2. 즉시 사용 가능한 애플리케이션 아키텍처

`세팅 참고`

- <a href="https://docs.nestjs.com/recipes/hot-reload">핫 리로드</a> : 위 방식대로 하되, `@types/webpack-env` 추가 설치해야 ts error 없어짐
- typeorm 세팅:
    1. <a href="https://medium.com/crocusenergy/nestjs-typeorm-%EA%B8%B0%EB%B3%B8-crud-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0-69b9640dc826">
       typeorm 설치 및 엔티티 작성법 참고</a>
    2. <a href="https://kyounghwan01.github.io/blog/etc/nest/controller-service/#user-entities-ts">서비스, 모듈 작성법 참고</a>
    3. `yarn typeorm schema:sync` 로 entity와 database간의 씽크를 수동으로 맞춘다 (설정으로 하기: 권장 x)
       <br>
- typeorm 사용법:
    1. <a href="https://typeorm.io/#/select-query-builder">QueryBuilder를 사용하여 쿼리작성</a>

<hr>
<br>

## 기타

`배포 관리`

- <a href="https://www.three-snakes.com/git/git-subtree">Git subtree</a>: 하나의 레포지토리에서 프론트/백 코드를 관리하나, 헤로쿠에서 깃레포를 연동하여 즉시
  배포를 하기 위해서 child 레퍼지토리를 생성하여 분리하는 방식.
    1. 설치법: child 레포지토리를 생성한 후, parent에서 `git subtree add --prefix=back child master` <br />
       (기존 로컬에서 사용했던 back 폴더는 지워야 클론이 가능하다)
    2. 업데이트: 부모의 origin/master의 변경사항을 child/master로 업데이트 하려면  <br />
       `git subtree push --prefix=back child master`를 실행
