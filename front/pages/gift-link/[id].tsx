import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {css} from '@emotion/react';
import Layout from '../../components/layouts/Layout';
import {useHeader} from "../../store";
import {Button, H2, P} from "../../components/commons";
import {Box} from "../../components/commons/Box";
import axios from "axios";
import {IGift} from "../../types";
import {ServerResponse} from "http";

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

interface Props {
  data: IGift
}

const GiftLink = ({data}: Props) => {
  const setHeader = useHeader(state => state.setHeader);
  const setHeaderBackEvent = useHeader(state => state.setHeaderBackEvent);

  const router = useRouter();
  const giftId = router.asPath.split("/")[2];

  useEffect(() => {
    setHeader("링크가 생성되었어요");
    return () => {
      setHeaderBackEvent(() => router.back());
      setHeader("");
    }
  }, [])

  const shareKakao = () => {
    const {Kakao} = window;
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '랜프티콘이 도착했어요!',
        description: `${data.giverName}님이 ${data.getterName}님에게 주는 선물입니다. 재도전 기회는 ${data.retryCount}차례입니다.`,
        imageUrl: location.origin + '/images/thumb.png',
        link: {
          mobileWebUrl: location.origin + `/check/${giftId}`,
          webUrl: location.origin + `/check/${giftId}`,
        },
      },
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

type IContext = {
  params: {
    id: string
  }
  res: ServerResponse
}

export const getServerSideProps = async ({params, res}: IContext) => {
  // const cookie = req ? req.headers.cookie : '';
  // axios.defaults.headers.Cookie = '';
  // if (req && cookie) {
  //   axios.defaults.headers.Cookie = cookie;
  // }
  try {
    const {id} = params;
    const {data} = await axios.get(`/api/gifts/${id}`);
    return {
      props: {
        data,
      }
    }
  } catch {
    res.statusCode = 404;
    return {
      props: {
        data: null
      }
    };
  }
}


export default GiftLink;
