import React, {useState} from "react";
import {css} from '@emotion/react';
import Layout from '../../components/layouts/Layout';
import {Button, H2, P} from '../../components/commons';
import {colors, screen} from '../../styles/variables';
import {useLogin} from "../../store";
import {useRouter} from "next/router";
import {useMutation, UseMutationResult} from "react-query";
import axios from "axios";
import {IGift} from "../../types";
import Image from "next/image";


const options = [{
  value: 'item',
  label: '선물'
}, {
  value: 'voucher',
  label: '상품권'
}, {
  value: 'cash',
  label: '용돈'
}];

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

  .gift-radio-wrap {
    display: flex;
    justify-content: center;
    gap: 1.6rem;
    width: 100%;
    margin-bottom: 7rem;
    padding: 0 4.8rem;

    ${screen.mobile} {
      padding: 0;
    }

    > label {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;

      > input[type="radio"] {
        display: none
      }

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1.6rem;
        width: 10rem;
        height: 10rem;
        background-color: ${colors.gray};

        &.active {
          background-color: ${colors.black};
        }

        > span {
          transform: scale(1.25) translate(0, 0.5rem) !important;
          cursor: pointer;
        }
      }
    }
  }
`;

const Gift = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const {id: giftId, retryCount}: IGift = useLogin.getState().data;
  const {updateCount} = useLogin.getState();
  const router = useRouter();

  const mutation: UseMutationResult = useMutation((option): Promise<{ data: { id: number } }> => axios.post(`/api/results`, option), {
    onError: (error, variables, context) => {
      alert('불러올 수 있는 상품이 존재하지 않습니다. 다른 옵션을 선택해주세요.');
    },
    onSuccess: (data) => {
      updateCount(retryCount - 1);
      router.push({
        pathname: `/result/${data.data.id}`,
        query: {giftId}
      });
    },
  });

  const submit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedOption) {
      return alert("선물 종류를 선택하세요.");
    } else {
      mutation.mutate({
        id: router.query.id,
        option: selectedOption
      });
    }
  }

  return (
    <Layout>
      <div css={giftPageStyle}>
        <div className="gift-desc">
          <H2>원하시는 선물 종류를 선택하세요.</H2>
          <P>남은 재도전 횟수: {String(retryCount)}</P>
        </div>
        <div className="gift-radio-wrap">
          {
            options.map((option) => {
              const {value, label} = option;
              return (
                <label htmlFor={value} key={value}>
                  <div className={selectedOption === value ? "active" : ""}>
                    <Image loader={() => `/images/${value}-icon.png`}
                           src={`/images/${value}-icon.png`}
                           alt={`${label}`}
                           width={126}
                           height={126}/>
                  </div>
                  <input id={value} type={"radio"} name={"option"} onChange={e => {
                    setSelectedOption(e.target.value)
                  }} value={value}/>
                  <P>{label}</P>
                </label>
              )
            })
          }
        </div>
        {
          !mutation.isLoading ?
            <Button onClick={submit} bg={'theme'}>선물 받으러 가기</Button>
            :
            <Button onClick={submit} bg={'gray'} bd={'gray'}>선물 요청중...</Button>
        }
      </div>
    </Layout>
  );
};

export default Gift;
