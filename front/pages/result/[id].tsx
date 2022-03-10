import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {css} from '@emotion/react';
import Layout from '../../components/layouts/Layout';
import Image from "next/image";
import {useHeader} from "../../store";
import {P, Span} from "../../components/commons";
import {GetServerSideProps} from "next";
import axios from "axios";
import {IGift, IResult} from "../../types";

const pageStyle = css`
  .result-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.2rem;
  }

  .result-image {
    display: flex;
    justify-content: center;
  }

  .result-info {
    margin-top: 2rem;
    text-align: center;
  }
`;

interface Props {
  data: IGift
}

const Result = ({data}: Props) => {
  const setHeader = useHeader(state => state.setHeader);

  const router = useRouter();
  const {id} = router.query;
  const result: IResult | undefined = data.results.find((i: IResult) => {
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
    if (result) {
      switch (result.option) {
        case "gifticon":
          return (
            <div>
              <div className="result-top">
                <Span size={"small"}>카카오 선물</Span>
                <Span size={"small"}>￦{result.item.price}</Span>
              </div>
              <div className="result-image">
                <Image
                  loader={() => result.item.imageUrl}
                  src={result.item.imageUrl}
                  alt="선물 이미지"
                  width={235}
                  height={235}
                />
              </div>
              <div className="result-info">
                <P size="big" weight={"bold"}>{result.item.name}</P>
              </div>
            </div>
          )
        case "cash":
          return <div>{result.price}원 당첨</div>
        default:
          return
      }
    }
  }

  return (
    <Layout>
      <div css={pageStyle}>
        {returnResult()}
        <div>
          <P color={"darkGray"}>생성된 링크가 자동으로 복사되었습니다.</P>
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
