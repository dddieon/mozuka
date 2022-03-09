import React, {useState} from "react";
import {css} from '@emotion/react';
import Layout from '../../components/layouts/Layout';
import {Button, H2, P} from '../../components/commons';
import {screen} from '../../styles/variables';
import {useLogin} from "../../store";
import {IGift} from "../../store/useLogin";
import {useRouter} from "next/router";
import {useMutation, UseMutationResult} from "react-query";
import axios from "axios";

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

  .gift-select-wrap {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    width: 100%;
    margin-bottom: 4.5rem;
    padding: 0 4.8rem;

    ${screen.mobile} {
      padding: 0;
    }
  }
`;

const Gift = () => {
  const [value, setValue] = useState("");
  const {id: giftId, retryCount}: IGift = useLogin.getState().data;
  const router = useRouter();

  const mutation: UseMutationResult = useMutation((option): Promise<{ data: { id: number } }> => axios.post(`/api/results`, option), {
    onError: (error, variables, context) => {
      // An error happened!
      alert(error);
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      router.push({
        pathname: `/result/${data.data.id}`,
        query: {giftId}
      });
    },
  });

  const submit = async (e: React.MouseEvent) => {
    e.preventDefault();
    mutation.mutate({
      id: router.query.id,
      option: value
    });
  }

  return (
    <Layout>
      <div css={giftPageStyle}>
        <div className="gift-desc">
          <H2>원하시는 선물 종류를 선택하세요.</H2>
          <P>남은 재도전 횟수: {String(retryCount)}</P>
        </div>
        <div className="gift-select-wrap">
          <select value={value} onChange={(e) => setValue(e.target.value)}>
            <option value={"gifticon"}>기프티콘</option>
            <option value={"present"}>선물</option>
            <option value={"cash"}>현금</option>
          </select>
          {
            !mutation.isLoading ?
              <Button onClick={submit} bg={'theme'}>선물 받으러 가기</Button>
              :
              <Button onClick={submit} bg={'gray'} bd={'gray'}>선물 요청중...</Button>
          }
        </div>
      </div>
    </Layout>
  );
};

export default Gift;
