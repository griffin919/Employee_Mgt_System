// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useAuthStore } from "@/stores/authStore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getIdToken,
} from "firebase/auth";
import { useEmsStore } from "@/stores/emsStore";
import useAuth from "./useAuth";
import validate from "validate.js";
import { getStorage, ref as sref, uploadBytes } from "firebase/storage";

export default function useFirebase() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBs1h8eoXvh-zlXLGpcPcmhuWBKB4cB8Fw",
    authDomain: "regent-ems-fbdb.firebaseapp.com",
    projectId: "regent-ems-fbdb",
    storageBucket: "regent-ems-fbdb.appspot.com",
    messagingSenderId: "934240113327",
    appId: "1:934240113327:web:e8366bc770eb46f151ba5a",
    measurementId: "G-P773FHDS9J",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth(app); // Moved the auth initialization here
  const authStore = useAuthStore();
  const emsStore = useEmsStore();
  const userAuth = useAuth();
  const storage = getStorage(app); // Get the storage instance from the app

  // Create User with email and password
  const createUserAccount = (data) => {
    const { email, password } = data.accountInfo;
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("User signed up successfully");
        // Signed up
        updateCurrentUser(data);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ... Other error handling code
      });
  };


  const uploadImage = async (file) => {
    try {
      const storageRef = sref(storage, `images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Uploaded a blob or file!', snapshot);
      alert("Image uploaded successfully");
      const imageUrl =  snapshot.ref.fullPath
  
      console.log("🚀 ~ file snapshot", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred");
    }
  };
  const updateCurrentUser = (data) => {
    // Validate and sanitize data
    const validatedData = validateAndSanitizeData(data);
    if (!validatedData) {
      console.error("Invalid data provided");
      alert("An error occurred. Please check the provided data.");
      return;
    }
  
    const { accountInfo, personalInfo } = validatedData;
    console.log("🚀 ~ updateCurrentUser ~ validatedData:", accountInfo, personalInfo)
    const updatedProfileData = {
      photoURL: accountInfo.photoURL,
      displayName: `${personalInfo.fname} ${personalInfo.lname}`.trim(),
      phoneNumber: accountInfo.phoneNumber,
    };

    updateProfile(auth.currentUser, { updatedProfileData}).then((response) => {
      console.log("🚀 ~ updateProfile ~ response:", response)
      alert("Profile updated successfully");
    }).catch((error) => {
      console.error("UpdateProfile ~ error", error);
      alert("An error occurred while updating the profile.");
    });
  
  };
  
  const validateAndSanitizeData = (data) => {
    // Validate and sanitize data according to your requirements
    // Example validation and sanitization
    if (!data || typeof data !== "object") {
      return null;
    }
  
    const { accountInfo, personalInfo } = data;
  
    if (!accountInfo || typeof accountInfo !== "object") {
      return null;
    }
  
    const photoURL = sanitizeString(accountInfo.photoURL);
    const phoneNumber = sanitizeString(accountInfo.phoneNumber);
  
    if (!personalInfo || typeof personalInfo !== "object") {
      return null;
    }
  
    const fname = sanitizeString(personalInfo.fname);
    const lname = sanitizeString(personalInfo.lname);
  
    if (!photoURL || !phoneNumber || !fname || !lname) {
      return null;
    }
  
    return {
      accountInfo: {
        photoURL,
        phoneNumber,
      },
      personalInfo: {
        fname,
        lname,
      },
    };
  };
  
  const sanitizeString = (str) => {
    // Sanitize the string to prevent XSS attacks or other injection attacks
    // Example: remove HTML tags, excessive whitespace, and disallowed characters
    return str.replace(/(<([^>]+)>)/gi, "").replace(/\s+/g, " ").trim();
  };

  const getCurrentUser = () => {
    const user = auth.currentUser;
    if (user) {
      // User is signed in.
      console.log("🚀 ~ file: useFirebase.js ~ line 54 ~ getCurrentUser ~ user", user);
      return user;
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  };

  // User sign in
  const signInUser = (email, password) => {
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("🚀 ~ .then ~ user:", user);
        // emsStore.setUserProfile(user);
        console.log(
          "🚀 ~ .then ~ emsStore.setUserProfile(user);",
          emsStore.userProfile
        );
        alert("User signed in successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ... Other error handling code
      });
  };

  // firebase auth allows only predefined valuse i.e username, email, photoURL, phoneNumber, and displayName
  function addCustomInfoToUserProfile(data) {
    const user = auth.currentUser;

    // Define validation constraints
    const constraints = {
      fname: {
        presence: true,
      },
      lname: {
        presence: true,
      },
      employee: {
        presence: true,
      },
      staffid: {
        numericality: { onlyInteger: true },
      },
    };

    // Validate the data
    const validationErrors = validate(data, constraints);

    // If there are validation errors, handle them
    if (validationErrors) {
      // Handle validation errors
      console.error("Validation errors:", validationErrors);
      return;
    }

    // If the data is valid, sanitize it
    const { fname, lname, staffid } = data;

    const sanitizedData = {
      fname: fname.trim(),
      lname: lname.trim(),
      staffid: staffid.trim(),
    };

    set(ref(db, "users/" + user.uid), {
      ...sanitizedData,
      isActive: true,
    })
      .then(() => {
        alert("User profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
        alert("An error occurred");
      });
  }

  const getUsers = () => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      emsStore.setUsers(data);
      console.log("🚀 ~ file: useFirebase.js ~ line 162 ~ onValue ~ data", data);
    });
  };

  const getUserById = (id) => {
    getAuth(app)
      .getUser(id)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });
  }

  const getIdToken = () => {
    auth.currentUser.getIdToken()
      .then((idToken) => {
        // Send token to your backend via HTTPS
        // ...
        console.log('ID Token:', idToken);
      })
      .catch((error) => {
        // Handle error
      });
  }

  return {
    db,
    createUserAccount,
    signInUser,
    addCustomInfoToUserProfile,
    getUsers,
    getUserById,
    updateCurrentUser,
    getCurrentUser,
    getIdToken,
    sref,
    uploadImage
  };
}