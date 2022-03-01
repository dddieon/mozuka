import create, {GetState, SetState, StoreApi} from 'zustand';
import {persist} from 'zustand/middleware';
import {createGiftSlice, IGift} from './createGift';

// store가 늘어나면 interface로 변경 필요
type IStore = IGift

export const useStore = create<IStore>(
  persist(
    (set, get, api) => ({
      ...createGiftSlice(
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
