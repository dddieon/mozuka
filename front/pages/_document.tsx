// pages/_document.tsx
import Document, {Head, Html, Main, NextScript} from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        </Head>
        <body>
        <Main/>
        </body>
        <NextScript/>
      </Html>
    );
  }
}
