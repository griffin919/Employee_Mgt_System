import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const userAuth = useAuthStore();
  const userProfile = userAuth.user;

  console.log(userProfile);

  // Check if the userProfile object exists
  if (!!userProfile) {
    const userRole = userProfile.userProfile.customClaims.role;
    const accountStatus = userProfile.userProfile.customClaims.accountStatus;
    console.log("userrole", userRole);

    // Check if the account status is pending
    if (accountStatus === 'pending') {
      return await navigateTo('/pending');
    }

    // Check the user role and redirect accordingly
    if (userRole === 'user') {
      return await navigateTo('/timesheets');
    } else if (userRole === 'admin') {
      return await navigateTo('/admin/timesheets');
    } else if (userRole === 'root') {
      return await navigateTo('/root/employees');
    }
  }
});