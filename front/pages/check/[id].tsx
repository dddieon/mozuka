import React, {useState} from "react";
import type {NextPage} from 'next';
import {useRouter} from "next/router";
import Image from 'next/image';
import {css} from '@emotion/react';
import Layout from '../../components/layouts/Layout';
import {Button, H2, P} from '../../components/commons';
import {colors, screen} from '../../styles/variables';
import {useQuery} from "react-query";
import axios from "axios";
import {useStore} from "../../store";

const giftPageStyle = css`
  .gift-image {
    width: 9.1rem;
    margin-bottom: 3.6rem;
  }

  .gift-desc {
    text-align: center;
    margin-bottom: 9rem;

    ${screen.mobile} {
      margin-bottom: 5rem;
    }

    > h2 {
      margin-bottom: 1.5rem;
    }
  }

  .gift-input-wrap {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    width: 100%;
    margin-bottom: 4.5rem;
    padding: 0 4.8rem;

    ${screen.mobile} {
      padding: 0;
    }

    > input {
      border: 1px solid ${colors.lightTheme};
      border-radius: 1rem;
      padding: 2rem;
      font-size: 4rem;
      color: ${colors.lightTheme2};

      &.input-spacing {
        letter-spacing: 1.6rem;
      }

      &::placeholder {
        color: ${colors.lightTheme};
        font-size: 2.4rem;
      }

      &:hover, &:focus {
        transition: filter .3s ease-in-out;
        border: 1px solid ${colors.theme};
        filter: drop-shadow(0px 10px 32px ${colors.lightTheme});
      }
    }
  }

`;

const Gift: NextPage = () => {
  const [value, setValue] = useState("");
  const [isInputFocus, setIsInputFocus] = useState(false);
  const router = useRouter();
  const {id} = router.query;

  const {
    data,
    isLoading,
    error
  } = useQuery(['gift', id], () => axios.get(`https://mozuka-back.herokuapp.com/api/gifts/${id}`));

  const submit = (e: React.MouseEvent): void => {
    e.preventDefault();
    const setLogin = useStore.getState().setLogin;
    if (value.length === 3) {
      setLogin({
        id: String(id),
        data: data?.data,
        isLogin: true,
      });
      router.push(`/gift/${id}`).then();
    } else {
      alert("잘못된 암호입니다!");
    }
  }

  return (
    <Layout>
      <div css={giftPageStyle}>
        {
          isLoading ? "로딩중입니다." :
            <>
              <div className="gift-image">
                <Image
                  src="/images/gift.svg"
                  alt="선물 이미지"
                  width={500}
                  height={500}
                />
              </div>
              <div className="gift-desc">
                <H2>선물이 도착했어요</H2>
                <P>
                  {data?.data.giverName}님께서 {data?.data.getterName}님께
                  <br/>
                  선물 추천 티켓을 보내왔습니다
                </P>
              </div>
              <div className="gift-input-wrap">
                <input type="password"
                       className={value ? "input-spacing" : ""}
                       placeholder="암호를 입력해주세요"
                       value={value}
                       onChange={(e) => setValue(e.target.value)} max={8}
                       onFocus={() => setIsInputFocus(true)}
                       onBlur={() => {
                         const interval = setInterval(() => {
                           setIsInputFocus(false);
                           clearInterval(interval);
                         }, 100);
                       }}
                />
                <Button isFixed={isInputFocus} onClick={submit} bg={'theme'}>선물 받으러 가기</Button>
              </div>
            </>
        }
        {
          error ? "잘못된 요청입니다." : ""
        }
      </div>
    </Layout>
  );
};

export default Gift;
