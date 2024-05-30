import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => {
    // Attempt to fetch user details from localStorage
    const userDetails = localStorage.getItem('userDetails');
    // if info exist in cache set it else null 
    const user = userDetails ? JSON.parse(userDetails) : null;    
    
    // Attempt to fetch full user details from localStorage
    const userDetailsFull = localStorage.getItem('userDetailsFull');
    // if info exist in cache set it else null 
    const userFull = userDetailsFull ? JSON.parse(userDetailsFull) : null;

    return {
      uName: null,
      token: useCookie("token").value || null,
      user,
      userFull,
    }
  },


  getters: {
    getUser() {
      return this.user;
    },    
    getUserFull() {
      return this.userFull;
    },
  },


  actions: {
    // use this function to save the token to cookies
    setToken(data) {
      const cookie = useCookie('token', data, {
        maxAge: 60 * 60 * 24, 
        sameSite: 'None',
      });
      cookie.value = data;
      this.token = cookie.value;
    },


// use this function to save the userInfo to cache, pass ther user data
    setUser(data){
      console.log("about to set this as user", data)
      if(this.token){
        // Store user details in localStorage
        localStorage.setItem('userDetails', JSON.stringify(data));
        this.user = data;
      }
    },

    
// use this function to save the other userInfo to cache
    setUser(data){
      console.log("about to set this as user", data)
      if(this.token){
        // Store user details in localStorage
        localStorage.setItem('fullUserDetails', JSON.stringify(data));
        this.fullUser = data;
      }
    },


    logout(){
      this.setToken(null)
      this.setUser(null)
      // Remove user details from localStorage
      localStorage.removeItem('userDetails');
      localStorage.removeItem('userDetailsFull');
    }
  },
});  