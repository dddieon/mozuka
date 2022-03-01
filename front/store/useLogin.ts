import create, {GetState, SetState, StateCreator, StoreApi} from 'zustand';
import {persist} from 'zustand/middleware';

export interface IGift {
  giverName: string,
  getterName: string,
  id: string,
  maxBudget: number,
  minimumBudget: number,
  password: string,
  retryCount: number
}

export interface IData {
  id: string;
  isLogin: boolean;
  data: IGift | null;
  setLogin: (id: Omit<IData, "setLogin">) => void;
}

const loginGiftSlice: StateCreator<IData> = set => ({
  id: "",
  isLogin: true,
  data: null,
  setLogin: ({id, data, isLogin}): void => {
    set((state) => ({
      id: id,
      data: data,
      isLogin: !isLogin ? !state.isLogin : isLogin,
    }));
  },
});

type IStore = IData

const useLogin = create<IStore>(
  persist(
    (set, get, api) => ({
      ...loginGiftSlice(
        set as unknown as SetState<IData>,
        get as GetState<IData>,
        api as unknown as StoreApi<IData>,
      ),
    }),
    {
      name: 'mozuka-gift',
      getStorage: () => localStorage,
    },
  ),
);


export {
  useLogin
}
