import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const userAuth = useAuthStore();
  const userProfile = userAuth.user;
  
  console.log(userProfile)

if(!userProfile || userProfile.userProfile.customClaims.accountStatus !="pending"){
  return await navigateTo('/');

}

});