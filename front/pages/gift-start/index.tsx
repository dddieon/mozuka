import React, {useEffect, useState} from "react";
import {css} from '@emotion/react';
import {useHeader} from "../../store";
import Layout from '../../components/layouts/Layout';
import {Button, H2, P} from "../../components/commons";
import {colors, fontSizes, fontWeights} from "../../styles/variables";
import Image from "next/image";
import {useRouter} from "next/router";

const pageStyle = css`
  display: block !important;
  padding: 10.9rem 3rem 3rem !important;
  min-height: 0 !important;

  > div.start-wrap {
    display: flex;
    justify-content: space-between;

    > div {
      max-width: 15rem;
      overflow: hidden;
    }
  }

  input {
    max-width: 100%;
    margin-top: 2rem;
    margin-bottom: 4rem;
    font-size: ${fontSizes.big};
    font-weight: ${fontWeights.bold};
    color: ${colors.black};

    &::placeholder {
      color: ${colors.gray2};
    }
  }
`;


const GiftStart = () => {
  const setHeader = useHeader(state => state.setHeader);
  const setHeaderBackEvent = useHeader(state => state.setHeaderBackEvent);
  const [form, setForm] = useState({
    giverName: "",
    getterName: "",
    maxBudget: 99999999999999,
    minimumBudget: 0,
    password: "",
    retryCount: 0
  });
  const [step, setStep] = useState(1);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const router = useRouter();


  useEffect(() => {
    switch (step) {
      case 1:
        setHeader("표시할 이름을 알려주세요.")
        setHeaderBackEvent(() => router.back());
        break;
      case 2:
        setHeader("표시할 이름을 알려주세요.")
        setHeaderBackEvent(() => setStep(prev => prev - 1));
        break;
      case 3:
        setHeader("금액대를 설정해주세요.")
        setHeaderBackEvent(() => setStep(prev => prev - 1));
        break;
      case 4:
        setHeader("옵션들을 선택해주세요.")
        setHeaderBackEvent(() => setStep(prev => prev - 1));
        break;
    }
    return () => {
      setHeaderBackEvent(() => router.back());
      setHeader("");
    }
  }, [step])

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (step) {
      case 1:
        setForm({...form, giverName: e.target.value});
        break;
      case 2:
        setForm({...form, getterName: e.target.value});
        break;
      default:
    }
  }

  const submit = async (e: React.MouseEvent) => {
    e.preventDefault();
    switch (step) {
      case 1:
      case 2:
      case 3:
        setStep(prev => prev + 1);
        break;
      case 4:
        break;
    }
  }

  switch (step) {
    case 1:
      return (
        <Layout>
          <div css={pageStyle}>
            <div className="start-wrap">
              <div>
                <H2>주는 사람</H2>
                <P color={"darkGray"}>이름을 입력해주세요.</P>
                <input type={"text"}
                       max={6}
                       onChange={e => {
                         inputHandler(e);
                       }}
                       onFocus={() => setIsInputFocus(true)}
                       onBlur={() => {
                         const interval = setInterval(() => {
                           setIsInputFocus(false);
                           clearInterval(interval);
                         }, 100);
                       }}
                       placeholder={"이름 입력"}/>
              </div>
              <Image
                src="/images/gift.svg"
                alt="선물 아이콘"
                width={93}
                height={90}
              />
            </div>
            <Button isFixed={isInputFocus} onClick={submit} bg={'theme'}>다음으로</Button>
          </div>
        </Layout>
      );
    case 2:
      return (
        <Layout>
          <div css={pageStyle}>
            <H2>받는 사람</H2>
            <P color={"darkGray"}>이름을 입력해주세요.</P>
            <input type={"text "}
                   onChange={e => setForm({...form, giverName: e.target.value})}
                   max={8}
                   onFocus={() => setIsInputFocus(true)}
                   onBlur={() => {
                     const interval = setInterval(() => {
                       setIsInputFocus(false);
                       clearInterval(interval);
                     }, 100);
                   }}
                   placeholder={"이름 입력"}/>
            <Button isFixed={isInputFocus} onClick={submit} bg={'theme'}>다음으로</Button>
          </div>
        </Layout>
      );
    default:
      return (
        <Layout>
          <div css={pageStyle}>
          </div>
        </Layout>
      )
  }
};


export default GiftStart;
