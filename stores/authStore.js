import { set } from 'firebase/database';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
  }),
  getters: {
    isAuthenticated() {
      return !!this.accessToken;
    },

  },
  actions: {
    loadAccessToken() {
      const accessToken = getCookie('accessToken');
      if (accessToken) {
        this.accessToken = accessToken;
      }
    },
   
  },
});

