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
      console.log("🚀 ~ getUserInfoByID ~ data:", data)

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.data));
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


  return {
    updateUserAccessRole,
    fetchAllUsers,
    getUserInfoByID,
  };
}