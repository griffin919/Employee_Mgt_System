import { ref } from "vue"; // Import ref for reactive variables
import { Dropdown } from "flowbite";
import { useEmsStore } from "@/stores/emsStore";
import {useAuthStore} from "@/stores/authStore";

// import { useCookie } from "@vueuse/core";
// import { useFetch } from "#app";

export default function useAuth() {

  const updateUserAccessRole = async (userid, role, value) => {
    const functionUrl = "https://setuserclaim-v56vaqojhq-uc.a.run.app";

    const requestBody = {
      uid: userid,
      role,
      value, // or any other allowed value
    };
    console.log("🚀 ~ updateUserAccessRole ~ requestBody:", requestBody)

    try {
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("🚀 ~ updateUserAccessRole ~ response:", response);
        alert("User access updated successfully");
      } else {
        console.error("Error:", response);
        alert("Error updating user access");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  
  };

  const emsStore = useEmsStore();
  const authStore = useAuthStore();

  // fetch all users from using firebase admin
  const fetchAllUsers = async () => {
    const functionUrl = "https://us-central1-regent-ems-fbdb.cloudfunctions.net/getAllUsers";

    try {
      const response = await fetch(functionUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("🚀 ~ fetchAllUsers ~ data:", data.userRecord);
        emsStore.setUsers(data.userRecord);
        console.log("emsStore.employees:", emsStore.employees);
        return data;
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
// fetch user by id using firebase admin
const getUserInfoByID = async (uid) => {
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
        // Add CORS headers if needed
        // "Access-Control-Allow-Origin": "*",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("🚀 ~ getUserInfoByID:", data);
      authStore.setWholeUserProfile(data.data);
      console.log("authStore.wholeUserProfile:", authStore.wholeUserProfile);

      if (data.success) {
        // emsStore.setUsers(data.userProfile, data.userData);
        return { userProfile: data.userProfile, userData: data.userData };
      } else {
        console.error("Error:", data.error);
      }
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


  const setAccessTokenCookie = (token) => {
    console.log("Token222", token);
    const options = {
      maxAge: 24 * 60 * 60 * 1000, // Expires in 1 day
      secure: true, // Only transmitted over HTTPS
      httpOnly: true, // Not accessible by client-side scripts
      sameSite: "None", // Strict same-site policy
    };
    const cookie = useCookie("accessToken", token, options);
    cookie.value = token;
    console.log(
      "🚀 ~ setAccessTokenCookie ~ document.cookie :",
      document.cookie
    );
  };

  const getCookie = (name) => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];
  };

  const setRefreshTokenCookie = (token) => {
    console.log("Token", token);
    const options = {
      path: "/",
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Expires in 1 day
      secure: true, // Only transmitted over HTTPS
      httpOnly: true, // Not accessible by client-side scripts
      sameSite: "strict", // Strict same-site policy
    };
    document.cookie = `refreshToken=${token}; ${Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ")}`;
  };

  return {
    setAccessTokenCookie,
    setRefreshTokenCookie,
    getCookie,
    updateUserAccessRole,
    fetchAllUsers,
    getUserInfoByID,
  };
}
