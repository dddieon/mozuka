// pages/_document.tsx
import Document, {Head, Html, Main, NextScript} from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script defer src={"https://developers.kakao.com/sdk/js/kakao.min.js"}></script>
        </Head>
        <body>
        <Main/>
        </body>
        <NextScript/>
      </Html>
    );
  }
}
