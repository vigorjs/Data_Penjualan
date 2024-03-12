import { create } from 'zustand';

interface Dialog {
    isDialogOpen: boolean;
    setIsDialogOpen: (value: boolean) => void;
}

const useDialogStore = create<Dialog>((set) => ({
  isDialogOpen: false,
  setIsDialogOpen: (value) => set(() => ({ isDialogOpen: value }))
}));

export default useDialogStore;

