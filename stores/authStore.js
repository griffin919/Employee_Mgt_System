import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    // Attempt to fetch user details from localStorage
    const userDetails = localStorage.getItem('userDetails');
    // if info exist in cache set it else null 
    const user = userDetails ? JSON.parse(userDetails) : null;    
    
    return {
      user,
    }
  },


  getters: {
    getUser() {
      return this.user;
    },  
  },


  actions: {

    async getCurrentUser(uid) {
      console.log("current user function started")
      const functionUrl = `https://us-central1-regent-ems-fbdb.cloudfunctions.net/getUserByUid?uid=${uid}`;

      if (!uid) {
        console.error("No user id provided");
        return;
      }
    
      try {
        const response = await fetch(functionUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("🚀 ~ getUserInfoByID ~ data:", data)
    
          if (data.success) {
            this.setUser(data.data)
          } else {
            console.error("Error:", data.error);
          }
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    setUser(data){
      console.log("about to set this as user", data)
      localStorage.setItem('userDetails', JSON.stringify(data));
        this.user = data;
        location.reload();
    },


    logout(){
      this.setUser(null)
      localStorage.removeItem('userDetails');
      navigateTo('/');
    }
  },
});  