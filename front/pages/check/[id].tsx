import React, {useState} from "react";
import axios from "axios";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {css} from '@emotion/react';
import Image from 'next/image';
import Layout from '../../components/layouts/Layout';
import {Button, H2, P} from '../../components/commons';
import {colors, screen} from '../../styles/variables';
import {useLogin} from "../../store";
import {IGift} from "../../types";

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

interface Props {
  data: IGift
}

const Gift = ({data}: Props) => {
  const [value, setValue] = useState("");
  const [isInputFocus, setIsInputFocus] = useState(false);
  const router = useRouter();
  const {id} = router.query;

  const submit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const setLogin = useLogin.getState().setLogin;
    if (value.length === 3) {
      setLogin({
        // saved to localstorage
        id: String(id),
        data,
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
          data ?
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
                  {data.giverName}님께서 {data.getterName}님께
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
                       onBlur={() => setIsInputFocus(false)}
                />
                <Button isFixed={isInputFocus} onClick={submit} bg={'theme'}>선물 받으러 가기</Button>
              </div>
            </>
            :
            "잘못된 접근입니다."
        }
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({params, res}) => {
  // const cookie = req ? req.headers.cookie : '';
  // axios.defaults.headers.Cookie = '';
  // if (req && cookie) {
  //   axios.defaults.headers.Cookie = cookie;
  // }
  try {
    const id = params?.id;
    const {data} = await axios.get(`/api/gifts/${id}`);
    return {
      props: {
        data
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

export default Gift;
