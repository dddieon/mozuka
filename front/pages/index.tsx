import type {NextPage} from 'next';
import Image from 'next/image';
import {css} from '@emotion/react';
import Layout from '../components/layouts/Layout';
import {Link} from '../components/commons';
import {colors, fontSizes, fontWeights, screen} from '../styles/variables';
import {Box} from "../components/commons/Box";

const mainStyle = css`
  > .main-image {
    width: 35rem;

    ${screen.mobile} {
      width: 20rem;
    }
  }

  > .main-button-wrap {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    width: 100%;
    margin-bottom: 4.5rem;
    padding: 0 5.8rem;
  }

  > .main-link {
    font-size: ${fontSizes.small};
    border-bottom: 1px solid ${colors.black};
    font-weight: ${fontWeights.bold}
  }
`;

const Home: NextPage = () => {
  return (
    <Layout>
      <div id="main" css={mainStyle}>
        <div className="main-image">
          <Image
            src="/images/main_img.svg"
            alt="메인 이미지"
            width={500}
            height={500}
          />
        </div>
        <Box image={"/images/gift-box.svg"}
             text={"시작하기를 누르면 새로운 랜프티콘을 생성할 수 있어요."}
             linkText={"[사용방법 알아보기]"}
             href={"/"}/>
        <div className="main-button-wrap">
          <Link href={'/gift-start'} bg={'theme'}>시작하기</Link>
          {/*<Link href={'/gift'}>코드로 조회하기</Link>*/}
        </div>
        <a className="main-link" href={"https://github.com/dddieon/mozuka"} target="_blank" rel="noreferrer">GITHUB</a>
      </div>
    </Layout>
  );
};

export default Home;
