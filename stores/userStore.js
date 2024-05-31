import { set } from 'firebase/database';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    claims: {},
    userProfile: {},
    userInfo:{},
    wholeUserInfo: {
      userRecord: {},
      userData: {},
    },
    wholeUserProfile: {},
  }),
  getters: {
    isAuthenticated() {
      return !!this.accessToken;
    },
  },
  actions: {
    setClaims(data) {
      this.wholeUserInfo.userRecord.customClaims = data;
    },
    async logout() {
      this.role = '';
    },
    setUserProfile(userProfile) {
      this.userProfile = userProfile;
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    setWholeUserProfile(data) {
      this.wholeUserProfile = data;
    },
    setWholeUserInfoUserRecord(data) {
      this.wholeUserInfo.userRecord = data;
    },
    setWholeUserInfoUserData(data) {
      this.wholeUserInfo.userData = data;
    },
    clearUserData() {
      this.wholeUserProfile = {};
      this.userInfo = {};
      this.claims = {};
      this.userInfo = {};
    },
  },
});