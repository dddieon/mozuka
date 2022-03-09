import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {css} from '@emotion/react';
import Layout from '../../components/layouts/Layout';
import {useHeader} from "../../store";
import {H2, P} from "../../components/commons";

const pageStyle = css`
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


  return (
    <Layout>
      <div css={pageStyle}>
        <H2>랜프티콘 생성 완료!</H2>
        <P color={"darkGray"}>생성된 링크가 자동으로 복사되었습니다.</P>
        <div>
          카카오톡 등으로 공유해주세요.
          {id}
        </div>
      </div>
    </Layout>
  );
};


export default GiftLink;
