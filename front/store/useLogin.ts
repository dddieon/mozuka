import create, {GetState, SetState, StateCreator, StoreApi} from 'zustand';
import {persist} from 'zustand/middleware';

export interface IGift {
  id: string;
  isLogin: boolean;
  data: object | null | undefined;
  setLogin: (id: Omit<IGift, "setLogin">) => void;
}

const loginGiftSlice: StateCreator<IGift> = set => ({
  id: "",
  isLogin: true,
  data: {},
  setLogin: ({id, data, isLogin}): void => {
    set((state) => ({
      id: id,
      data: data,
      isLogin: !isLogin ? !state.isLogin : isLogin,
    }));
  },
});

type IStore = IGift

const useLogin = create<IStore>(
  persist(
    (set, get, api) => ({
      ...loginGiftSlice(
        set as unknown as SetState<IGift>,
        get as GetState<IGift>,
        api as unknown as StoreApi<IGift>,
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
