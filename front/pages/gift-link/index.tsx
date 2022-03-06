import React, {useState} from "react";
import {useRouter} from "next/router";
import {css} from '@emotion/react';
import Layout from '../../components/layouts/Layout';

const pageStyle = css`
`;

const GiftLink = () => {
  const [value, setValue] = useState("");
  const [isInputFocus, setIsInputFocus] = useState(false);
  const router = useRouter();
  const {id} = router.query;

  const submit = async (e: React.MouseEvent) => {
    e.preventDefault();
  }

  return (
    <Layout>
      <div css={pageStyle}>
      </div>
    </Layout>
  );
};


export default GiftLink;
