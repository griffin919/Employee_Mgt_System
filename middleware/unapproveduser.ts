import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const userAuth = useAuthStore();
  const userProfile = userAuth.user;
  
  console.log(userProfile)

  
  // Check if the userProfile object exists and the role is "user"
if(!!userProfile){
  const accountStatus = userProfile.userProfile.customClaims.accountStatus;
  console.log("userrole", accountStatus)
  if (accountStatus === 'pending') {
    
    return await navigateTo('/pending');
  }  else if (accountStatus === 'accepted') {
    return await navigateTo('timesheets');
  }

}
});