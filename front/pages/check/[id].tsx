import React, {useState} from "react";
import type {NextPage} from 'next';
import {useRouter} from "next/router";
import Image from 'next/image';
import {css} from '@emotion/react';
import Layout from '../../components/layouts/Layout';
import {Button, H2, P} from '../../components/commons';
import {colors, screen} from '../../styles/variables';

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
      transition: .3s ease-in-out;
      border: 1px solid ${colors.lightTheme};
      border-radius: 1rem;
      padding: 2rem;
      font-size: 4rem;
      letter-spacing: 2rem;
      color: ${colors.lightTheme2};

      &::placeholder {
        color: ${colors.lightTheme};
      }

      &:hover, &:focus {
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
  const submit = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (value.length) {
      router.push(`/gift/${id}`).then();
    }
  }
  return (
    <Layout>
      <div css={giftPageStyle}>
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
            감자님께서 고구마님께
            <br/>
            선물 추천 티켓을 보내왔습니다
          </P>
        </div>
        <div className="gift-input-wrap">
          <input type="password"
                 value={value}
                 onChange={(e) => setValue(e.target.value)} max={8}
                 onFocus={() => setIsInputFocus(true)}
                 onBlur={() => setIsInputFocus(false)}
          />
          <Button isFixed={isInputFocus} onClick={submit} bg={'theme'}>선물 받으러 가기</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Gift;
