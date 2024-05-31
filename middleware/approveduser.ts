import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const userAuth = useAuthStore();
  const userProfile = userAuth.user;
  
  console.log(userProfile)
  const userRole = userProfile.customClaims.role;
  
  console.log(userRole)
  // Check if the userProfile object exists and the role is "user"
  if (userProfile.customClaims.role === 'user') {
    
    return await navigateTo('/timesheets');
  }

  // If the user is an authenticated employer, redirect to /employer/dashboard
  if (userProfile.customClaims.role === 'employer') {
    return await navigateTo('/employer/dashboard');
  }

});