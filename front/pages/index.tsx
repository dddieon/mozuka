import type {NextPage} from 'next';
import Image from 'next/image';
import {css} from '@emotion/react';
import Layout from '../components/layouts/Layout';
import {Link, P, Span} from '../components/commons';
import {colors, fontSizes, fontWeights, screen} from '../styles/variables';

const mainStyle = css`
  > .main-image {
    width: 35rem;

    ${screen.mobile} {
      width: 20rem;
    }
  }

  > .main-desc {
    border-radius: 2rem;
    display: flex;
    align-items: center;
    padding: 2rem 3rem;
    margin-bottom: 5.2rem;
    width: 100%;
    background-color: ${colors.gray};

    > span {
      min-width: 3.3rem;
    }

    > div {
      margin-left: 3rem;

      > p {
        margin-bottom: 0.6rem;
      }
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

  > .main-how {
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
        <div className="main-desc">
          <Image
            src="/images/present.svg"
            alt="선물 아이콘"
            width={50}
            height={50}
          />
          <div>
            <P color={'darkGray'}>
              선물추첨 서비스입니다.
              선물추첨 서비스입니다.
              선물추첨 서비스입니다.
            </P>
            <button onClick={(e) => {
              console.log(e)
            }}>
              <Span color={'theme'} weight={'bold'}>
                [사용방법 알아보기]
              </Span>
            </button>
          </div>
        </div>
        <div className="main-button-wrap">
          <Link href={'/gift-start'} bg={'theme'}>시작하기</Link>
          {/*<Link href={'/gift'}>코드로 조회하기</Link>*/}
        </div>
        <button className="main-how">HOW TO</button>
      </div>
    </Layout>
  );
};

export default Home;
