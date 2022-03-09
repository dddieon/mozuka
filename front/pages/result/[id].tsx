import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {css} from '@emotion/react';
import Layout from '../../components/layouts/Layout';
import {useHeader} from "../../store";
import {P} from "../../components/commons";
import {GetServerSideProps} from "next";
import axios from "axios";

const pageStyle = css`
`;

const Result = ({data}) => {
  const setHeader = useHeader(state => state.setHeader);

  const router = useRouter();
  const {id} = router.query;
  const result = data.results.find(i => {
    return i.id === Number(id)
  })

  useEffect(() => {
    setHeader("두근두근 선물 오픈!");
    console.log(data, "D")
    return () => {
      setHeader("");
    }
  }, [])

  const returnResult = () => {
    switch (result.option) {
      case "gifticon":
        return <div>
          <img
            //loader={() => result.itemUuid.imageUrl}
            src={result.itemUuid.imageUrl}
            alt="선물 이미지"
            width={500}
            height={500}
          />
          {result.price}원 짜리 당첨
        </div>
      case "cash":
        return <div>{result.price}원 당첨</div>
      default:
        return
    }
  }

  return (
    <Layout>
      <div css={pageStyle}>
        <P color={"darkGray"}>생성된 링크가 자동으로 복사되었습니다.</P>
        {returnResult()}
        <div>
          카카오톡 등으로 공유해주세요.
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({query, res}) => {
  // const cookie = req ? req.headers.cookie : '';
  // axios.defaults.headers.Cookie = '';
  // if (req && cookie) {
  //   axios.defaults.headers.Cookie = cookie;
  // }
  try {
    const id = query?.giftId;
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

export default Result;
