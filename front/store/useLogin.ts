import create, {GetState, SetState, StateCreator, StoreApi} from 'zustand';
import {persist} from 'zustand/middleware';
import {IGift} from "../types";

export interface IStore {
  id: string;
  isLogin: boolean;
  data: IGift;
  setLogin: (id: Omit<IStore, "setLogin" | "updateCount">) => void;
  updateCount: (number: number) => void;
}

const loginGiftSlice: StateCreator<IStore> = set => ({
  id: "",
  isLogin: true,
  data: {
    id: "",
    getterName: "",
    giverName: "",
    maxBudget: 0,
    minimumBudget: 0,
    password: "",
    retryCount: 1,
    results: [],
  },
  setLogin: ({id, data, isLogin}): void => {
    set((state) => ({
      id: id,
      data: data,
      isLogin: !isLogin ? !state.isLogin : isLogin,
    }));
  },
  updateCount: (number) => {
    set((state) => ({
      ...state,
      data: {
        ...state.data,
        retryCount: number
      }
    }))
  }
});

const useLogin = create<IStore>(
  persist(
    (set, get, api) => ({
      ...loginGiftSlice(
        set as unknown as SetState<IStore>,
        get as GetState<IStore>,
        api as unknown as StoreApi<IStore>,
      ),
    }),
    {
      name: 'mozuka-gift',
      getStorage: () => sessionStorage,
    },
  ),
);


export {
  useLogin
}
