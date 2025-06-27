// globalStore/store.js
import { create } from 'zustand';

const useRouterStore = create((set) => ({
  route: {
    breadcrumbs: [],
    link: '',
  },
  setRoute: (newRoute) =>
    set((state) => ({
      route: typeof newRoute === 'function'
        ? newRoute(state.route)
        : newRoute,
    })),
}));

export default useRouterStore;
