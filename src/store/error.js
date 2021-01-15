export default {
  namespaced: true,
  state: {
    error: null,
  },
  mutations: {
    error(state, value) {
      state.error = value;
    },
  },
  actions: {},
  getters: {
    getError(state) {
      return state.error;
    },
  },
};
