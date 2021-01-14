import axios from 'axios';
import loadMore from '../assets/js/loadMore';

export default {
  state: {
    loading: false,
    error: null,
    messages: [],
    messagesMain: [],
  },
  mutations: {
    loading(state, value) {
      state.loading = value;
    },
    error(state, value) {
      state.error = value;
    },
    getMessage(state, messages) {
      state.messages = messages;
    },
    getMessageMain(state, messages) {
      state.messagesMain = messages;
    },
    loadMessages(state, payload) {
      state.messagesMain = [...state.messagesMain, ...payload];
    },
  },
  actions: {
    getNotifyLazy({ commit, dispatch }) {
      commit('loading', true);
      setTimeout(() => {
        dispatch('getNotify');
      }, 1800);
    },
    getNotify({ commit }) {
      commit('loading', true);
      axios
        .get('https://jsonplaceholder.typicode.com/users/') // получаем массив пользователе
        .then((respomse) => {
          commit('error', null);
          const res = respomse.data;
          const messages = [];
          const messagesMain = [];
          res.forEach((el) => {
            // т.к. у массива нет main, фильтр по длине зипкода
            if (el.address.zipcode.length !== 10) messagesMain.push(el);
            else messages.push(el);
          });
          // filter
          commit('getMessage', messages);
          commit('getMessageMain', messagesMain);
        })
        .catch((error) => {
          console.log(error);
          commit('error', 'Error: Network Error');
        })
        .finally(() => {
          commit('loading', false);
        });
    },
    loadMessages({ commit, getters }) {
      const res = getters.getMessageFilter;
      commit('loadMessages', loadMore(res));
    },
  },
  getters: {
    getMessage(state) {
      return state.messages;
    },
    getMessageFilter(state) {
      return state.messages.filter((mes) => mes.address.zipcode.length === 10);
    },
    getMessageMain(state) {
      return state.messagesMain;
    },
    getLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
  },
};
