## 프론트 개발 사항

<hr>

### 프론트 상태관리: zustand

`사용 이유`

1. redux에 비해 간단한 코드
2. Provider로 감싸지 않고 전역상태에 접근하는 방식이 깔끔하다
3. redux-devtools를 사용할 수도 있다

### 서버 상태관리: react-query

`사용 이유`

1. 성공, 에러, 로딩 처리, 캐싱 등의 기능 제공
2. hook 형식으로 간단하게 사용

### CSS: Emotion

`사용 이유`

1. CSS-in-Js의 장점: css모듈은 link태그로 참조만 하는 반면, 서버에서 받아온 style 코드를 바로 사용
2. 개발효율: 코드 관리 쉬움 (스타일 관련 변수를 1번만 정의해도 스타일 + JSX에서 공통으로 사용)

- 세팅 참고: `@emotion/core 이외 설치 필요:  @emotion/react @emotion/styled @motion/babel-plugin`

<br>
<br>

## 백엔드 개발 사항

<hr>

### 프레임워크: 고민중...

