import { create } from "zustand";
import { Tag } from "./useTags";

export interface StoreState {
  inputValue: string;
  result: string | number | null;
  setInputValue: (value: string) => void;
  setResult: (value: string | number) => void;
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
}

export const useFormula = create<StoreState>((set) => ({
  inputValue: "",
  result: null,
  setInputValue: (value: string) => set({ inputValue: value }),
  setResult: (value: string | number) => set({ result: value }),
  selectedTags: [],
  setSelectedTags: (tags: Tag[]) =>
    set({
      selectedTags: tags,
    }),
}));
