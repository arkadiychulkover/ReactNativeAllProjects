import {create} from "zustand";

type TypeAction = () => void;
type TypeSet = (newCount: number) => void;

type CounterStore = 
{
    count: number;
    up: TypeSet;
    down: TypeSet;
    clear: TypeAction;
}

export const useCounterStore = create<CounterStore>((set) => ({
    count: 0,
    up: (num) => set((state) => ({ count: state.count + num })),
    down: (num) => set((state) => ({ count: state.count !== 0 ? state.count - num : 0 })),
    clear: () => set({ count: 0 }),
}));