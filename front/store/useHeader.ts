import create from "zustand";
import {useRouter} from "next/router";

interface headerState {
  header: string;
  setHeader: (text: string) => void;
  headerBackEvent: () => void;
  setHeaderBackEvent: (callback: () => void) => void;
}


const useHeader = create<headerState>((set) => ({
  header: "",
  headerBackEvent: () => {
    const router = useRouter();
    router.back();
  },
  setHeader: (header: string) => set(() => ({header})),
  setHeaderBackEvent: (callback: () => void) => set(() => {
    return {headerBackEvent: callback}
  })
}))


export {
  useHeader
}
