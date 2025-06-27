import { create } from 'zustand'
export const useProductStore = create((set, get) => ({
    formStore: {
        dataList: [],
        currentPage : ''
    },
    setFormValue: (formData) => {
        set(() => ({ formStore: { ...formData } }));
    },
    validateFields: () => {
        const state = get().formStore;
        return {
            isDataListValid: state.dataList.data?.length > 0,
            isCurrentPageValid: !!state.currentPage,

        };
    },
    resetStore: () => {
        set({
            formStore: {
                dataList: [],
                currentPage : ''

            }
        });
    },
    resetRegion: () => {
        set((state) => ({
            formStore: {
                ...state.formStore,
                region: [],
            },
        }));
    },
}));