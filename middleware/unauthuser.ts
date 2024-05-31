import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const userAuth = useAuthStore();
  const userProfile = userAuth.user;
  // Check if the userProfile object exists and the role is "user"
if(!userProfile || userProfile.userProfile.customClaims.role !="user"){
  
    return await navigateTo('/');

}
});