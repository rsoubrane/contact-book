export const GlobalActions = {
	SET_DISPLAY_GLOBAL: 'SET_DISPLAY_GLOBAL'
};

export function setDisplayGlobal(displayGlobal) {
	return {
		type: GlobalActions.SET_DISPLAY_GLOBAL,
		payload: displayGlobal
	};
}
