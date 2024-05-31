import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const userAuth = useAuthStore();
  const userProfile = userAuth.user;
  
  console.log(userProfile)

  
  // Check if the userProfile object exists and the role is "user"
if(!!userProfile){
  const userRole = userProfile.userProfile.customClaims.role;
  console.log("userrole", userRole)
  if (userRole === 'user') {
    
    return await navigateTo('/timesheets');
  }  else if (userRole === 'admin') {
    return await navigateTo('/admin/timesheets');
  }

}
});