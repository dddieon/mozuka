import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {useMutation, UseMutationResult} from "react-query";
import {css} from '@emotion/react';
import Image from "next/image";
import {useHeader} from "../../store";
import Layout from '../../components/layouts/Layout';
import {Button, H2, P} from "../../components/commons";
import {colors, fontSizes, fontWeights} from "../../styles/variables";

const pageStyle = css`
  display: block !important;
  padding: 10.9rem 3rem 3rem !important;
  min-height: 0 !important;

  > div.start-wrap {
    display: flex;
    justify-content: space-between;

    > div {
      max-width: 20rem;
      overflow: hidden;
    }
  }

  input {
    border-radius: 0.4rem;
    max-width: 100%;
    padding: 0.2rem;
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
    getterName: "",
    giverName: "",
    maxBudget: "",
    minimumBudget: "",
    password: "",
    retryCount: "1"
  });
  const [step, setStep] = useState(1);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const router = useRouter();

  const mutation: UseMutationResult = useMutation((option): Promise<{ data: { id: string } }> => axios.post(`/api/gifts`, option), {
    onError: (error) => {
      alert(error);
    },
    onSuccess: (data) => {
      router.push({pathname: `/gift-link/${(data.data.id)}`});
    },
  });


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

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, type: null | undefined | string) => {
    switch (step) {
      case 1:
        setForm({...form, getterName: e.target.value});
        break;
      case 2:
        setForm({...form, giverName: e.target.value});
        break;
      case 3:
        type === "max" ?
          setForm({
            ...form, maxBudget: e.target.value.replace(/[^0-9.]/g, '')
          })
          :
          setForm({
            ...form,
            minimumBudget: e.target.value.replace(/[^0-9.]/g, '')
          })
        break;
      case 4:
        setForm({...form, retryCount: e.target.value.replace(/[^0-9.]/g, '')});
        break;
      case 5:
        setForm({...form, password: e.target.value.replace(/[^0-9.]/g, '')});
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
      case 4:
        setStep(prev => prev + 1);
        break;
      case 5:
        mutation.mutate(form)
        break;
    }
  }

  switch (step) {
    case 1:
    case 2:
      return (
        <Layout>
          <div css={pageStyle}>
            <div className="start-wrap">
              <div>
                <H2>{step === 1 ? "받는" : "주는"} 사람</H2>
                <P color={"darkGray"}>이름을 입력해주세요.</P>
                <input type={"text"}
                       value={step === 1 ? form.getterName : form.giverName}
                       maxLength={6}
                       onChange={e => {
                         inputHandler(e, null);
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
    case 3:
      return (
        <Layout>
          <div css={pageStyle}>
            <div>
              <div>
                <H2>한도 금액</H2>
                <P color={"darkGray"}>최소</P>
                <input type={"tel"}
                       value={form.minimumBudget}
                       maxLength={9}
                       onChange={e => {
                         inputHandler(e, null);
                       }}
                       onFocus={() => setIsInputFocus(true)}
                       onBlur={() => {
                         const interval = setInterval(() => {
                           setIsInputFocus(false);
                           clearInterval(interval);
                         }, 100);
                       }}
                       placeholder={"최소 금액 설정"}/>
                <P color={"darkGray"}>최대</P>
                <input type={"tel"}
                       maxLength={9}
                       onChange={e => {
                         inputHandler(e, "max");
                       }}
                       onFocus={() => setIsInputFocus(true)}
                       onBlur={() => {
                         const interval = setInterval(() => {
                           setIsInputFocus(false);
                           clearInterval(interval);
                         }, 100);
                       }}
                       placeholder={"최소 금액 설정"}/>
              </div>
            </div>
            <Button isFixed={isInputFocus} onClick={submit} bg={'theme'}>다음으로</Button>
          </div>
        </Layout>
      );
    case 4:
      return (
        <Layout>
          <div css={pageStyle}>
            <div>
              <div>
                <H2>재도전 기회</H2>
                <P color={"darkGray"}>도전 가능 횟수</P>
                <input type={"tel"}
                       value={form.retryCount}
                       maxLength={9}
                       onChange={e => {
                         inputHandler(e, null);
                       }}
                       onFocus={() => setIsInputFocus(true)}
                       onBlur={() => {
                         const interval = setInterval(() => {
                           setIsInputFocus(false);
                           clearInterval(interval);
                         }, 100);
                       }}
                       placeholder={"기본 1회"}/>
              </div>
            </div>
            <Button isFixed={isInputFocus} onClick={submit} bg={'theme'}>다음으로</Button>
          </div>
        </Layout>
      );
    case 5:
      return (
        <Layout>
          <div css={pageStyle}>
            <div>
              <div>
                <H2>패스워드</H2>
                <P color={"darkGray"}>사용할 암호를 입력해주세요</P>
                <input type={"tel"}
                       value={form.password}
                       maxLength={4}
                       onChange={e => {
                         inputHandler(e, null);
                       }}
                       onFocus={() => setIsInputFocus(true)}
                       onBlur={() => {
                         const interval = setInterval(() => {
                           setIsInputFocus(false);
                           clearInterval(interval);
                         }, 100);
                       }}
                       placeholder={"4자리 입력"}/>
              </div>
            </div>
            <Button isFixed={isInputFocus} onClick={submit} bg={'theme'}>발급하기</Button>
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
