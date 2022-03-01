import {StateCreator} from 'zustand';

export interface IGift {
  id: string;
  isLogin: boolean;
  data: object | null | undefined;
  setLogin: (id: Omit<IGift, "setLogin">) => void;
}

const createGiftSlice: StateCreator<IGift> = set => ({
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

export {
  createGiftSlice
}
