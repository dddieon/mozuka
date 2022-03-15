import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {css} from '@emotion/react';
import Layout from '../../components/layouts/Layout';
import Image from "next/image";
import Link from "next/link";
import {useHeader} from "../../store";
import {Button, H2, P, Span} from "../../components/commons";
import {GetServerSideProps} from "next";
import axios from "axios";
import {IGift, IResult} from "../../types";
import {colors} from "../../styles/variables";

const pageStyle = css`
  .result-image-wrap {
    display: flex;
    gap: 1.8rem;
    width: 100%;
    padding: 4.5rem 0;

    &.past {
      padding: 0;
      margin: 1.4rem 0;
    }

    &.cash {
      > span {
        background-color: ${colors.black} !important;

        > span {
          filter: drop-shadow(0px 8px 18px rgba(42, 195, 167, 0.24)) drop-shadow(0px 12px 42px rgba(42, 195, 167, 0.24));
        }
      }
    }

    > span {
      border-radius: 0.5rem;
    }

    > div {
      max-width: calc(100% - 11rem);

      h2 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .result-line {
    box-shadow: inset 0px .4rem 1rem rgb(187 187 187 / 51%);
    width: 100vw;
    height: 1.5rem;
    background-color: white;
  }

  .result-desc {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2.8rem 0;

    > .result-desc-past {
      display: flex;
      justify-content: space-between;
      margin-bottom: .6rem;
    }
  }

  section {
    flex: 1;
    display: flex;
    flex-direction: column;

    > article:not(.no-data) {
      flex: 1;
      padding: 1.2rem 0 2rem;

      > div {
        cursor: pointer;
      }
    }

    .no-data {
      flex: 1;
      padding: 6rem 0;
      text-align: center;
    }
  }

  .result-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
  const isCash = result?.option === "cash";

  useEffect(() => {
    setHeader("두근두근 선물 오픈!");
    return () => {
      setHeader("");
    }
  }, [])

  const returnButtons = () => {
    return (
      <div className={"result-buttons"}>
        <Button>이 선물을 요청하기</Button>
        <Button bg={"theme"} onClick={() => router.push(`/gift/${router.query.giftId}`)}>재도전하기</Button>
      </div>
    )
  }

  return (
    <Layout>
      <div css={pageStyle}>
        {
          result ?
            <>
              <div className={`result-image-wrap ${isCash ? "cash" : ""}`}>
                <Image
                  loader={() => isCash ? "/images/cash.svg" : result.item.imageUrl}
                  src={isCash ? "/images/cash.svg" : result.item.imageUrl}
                  alt="선물 이미지"
                  width={83}
                  height={83}
                />
                <div>
                  <P color={"theme"} weight={"bold"}>￦{result.price.toLocaleString()}</P>
                  <H2>{isCash ? `현금 ${result.price.toLocaleString()}원` : result.item.name}</H2>
                  <P color={"darkGray"}>{isCash ? "머니머니해도 머니" : "클릭시 상세보기 링크로 이동"}</P>
                </div>
              </div>
              <div className={`result-line`}/>
              <div className={`result-desc`}>
                {
                  data.results.length === 1 ?
                    null
                    :
                    <>
                      <div className={`result-desc-past`}>
                        <P weight={"bold"}>총 {data.results?.length - 1}개 과거 기록</P>
                      </div>
                      <Span color={"darkGray"}>이전 기록으로도 선물 요청이 가능합니다.</Span>
                    </>
                }
                <section>
                  <article className={data.results.length === 1 ? "no-data" : ""}>
                    {
                      data.results.length === 1 ?
                        <P color={"gray2"} size={"big"} weight={"bold"}>다른 뽑기 기록이 없습니다</P>
                        :
                        data.results.map((r) => {
                          if (Number(id) !== r.id) {
                            return (
                              <Link href={`/result/${r.id}?giftId=${router.query.giftId}`} key={r.id}>
                                <div className={`result-image-wrap past`}>
                                  <Image loader={() => isCash ? "/images/cash.svg" : r.item.imageUrl}
                                         src={isCash ? "/images/cash.svg" : r.item.imageUrl}
                                         alt="선물 이미지"
                                         width={35}
                                         height={35}/>
                                  <div>
                                    <P color={"theme"} weight={"bold"}
                                       size={"small"}>￦{r.price.toLocaleString()}</P>
                                    <H2
                                      size={"small"}>{isCash ? `현금 ${r.price.toLocaleString()}원` : r.item.name}</H2>
                                  </div>
                                </div>
                              </Link>
                            )
                          }
                        })
                    }
                  </article>
                  {
                    returnButtons()
                  }
                </section>
              </div>
            </>
            :
            null
        }
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
