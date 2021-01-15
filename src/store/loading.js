export default {
  namespaced: true,
  state: {
    loading: true,
  },
  mutations: {
    loading(state, value) {
      console.log(state.loading);
      state.loading = value;
    },
  },
  actions: {},
  getters: {
    getLoading(state) {
      return state.loading;
    },
  },
};
