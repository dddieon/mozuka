import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {css} from '@emotion/react';
import Layout from '../../components/layouts/Layout';
import {useHeader} from "../../store";
import {Button, H2, P} from "../../components/commons";
import {Box} from "../../components/commons/Box";

const pageStyle = css`
  h2 {
    margin-bottom: 2rem;
  }

  button {
    display: flex;
    align-items: center;
    gap: 1rem;

    i {
      display: inline-block;
      width: 2.2rem;
      height: 2rem;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      background-image: url('/images/kakao.svg');
    }
  }
`;

const GiftLink = () => {
  const setHeader = useHeader(state => state.setHeader);
  const setHeaderBackEvent = useHeader(state => state.setHeaderBackEvent);

  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    setHeader("링크가 생성되었어요");
    return () => {
      setHeaderBackEvent(() => router.back());
      setHeader("");
    }
  }, [])

  const shareKakao = () => {
    const {Kakao} = window;
    Kakao.Link.sendScrap({
      requestUrl: '/check/3e8777d9-c48c-43d6-8d12-cf717763a9f9',
    })
  }

  return (
    <Layout>
      <div css={pageStyle}>
        <H2>랜프티콘 생성 완료!</H2>
        <P color={"darkGray"}></P>
        <Box image={"/images/gift-box.svg"} text={"생성된 링크가 자동으로 복사되었습니다."}/>
        <Button bg={"kakao"} onClick={shareKakao}><i/> 카카오톡으로 공유하기</Button>
      </div>
    </Layout>
  );
};


export default GiftLink;
