import { create } from "zustand";
import { worlds } from "../data/data";

interface Details {
  name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features: any[]
}

interface StoreState {
  index: number
  date: string;
  properties: Details
  setIndex: (index: number) => void
  setProperties: (details: Details) => void
}

export const useAncientStore = create<StoreState>()((set) => ({
  index: 0,
  date: worlds[0].id,
  properties: {
    name: "",
    features: []
  },
  setIndex: (index) => {
    const data = worlds[index];
    set({
      date: data.id,
      index
    })
  },
  setProperties: (properties) => set({ properties }),
}))
