import { create } from "zustand";

type UseMainPageStore = {
	// ...state
	main: HTMLElement | null;
	// ...actions
	setMainRef: (ref: HTMLElement | null) => void;
};
/**
 * 主页状态管理
 */
const useMainPageStore = create<UseMainPageStore>((set) => ({
	// ...state
	main: null,
	// ...actions
	setMainRef(main) {
		set({ main });
	},
}));

export default useMainPageStore;
