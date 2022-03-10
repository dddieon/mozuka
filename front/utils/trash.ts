import {useLogin} from "../store";
import {IGift} from "../types";

// 해당 코드는 사용하지 않지만,
// README.md에서 메모한 내용을 참고하기 위해 남겨둠.
// (`getServerSideProps` 내부에서 localstorage를 써서 자동로그인을 할 수 없을까?)
const checkLogin = (id: string | string[] | undefined) => {
  const data: IGift = useLogin.getState().data;
  const giftId = data.id;
  if ((id !== giftId) || !giftId) {
    return {
      redirect: {
        permanent: false,
        destination: `/check/${id}`,
      },
      props: {data: data}
    }
  } else {
    return {
      props: {data: data}
    };
  }
}

export {
  checkLogin
}
