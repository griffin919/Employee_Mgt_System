// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { useAuthStore } from "@/stores/authStore";
import {
  getDatabase,
  ref as dbref,
  set,
  onValue,
  get,
  update,
} from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { useEmsStore } from "@/stores/emsStore";
import {
  getStorage,
  ref as sref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import validator from "validator";
import validate from "validate.js";
import { navigateTo } from "#app";
import useAuth from "@/composables/useAuth";

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
  const storage = getStorage(app); // Get the storage instance from the app
  const userAuth = useAuth();

  // Create User with email and password

  // Sign in user with email and password
  const signInUser = async (email, password) => {
    //validate email and password
    var constraints = {
      email: {
        presence: true,
        email: true,
      },
      password: {
        presence: true,
        length: {
          minimum: 6,
          message: "must be at least 6 characters",
        },
      },
    };

    const data = {
      email: email,
      password: password,
    };

    const errors = validate(data, constraints);

    if (errors) {
      alert("Please enter a valid email and password", errors);
      return;
    }

    //sanitize email and password
    email = validator.escape(email);
    password = validator.escape(password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        getAllCurrentUserInfo();
        handleRedirect();

        // authStore.setUserProfile(userCredential.user);
        getUserById();
        alert("User signed in successfully");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  // listen for auth state changes
  const checkingAuthState = () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          handleRedirect();
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // No user is signed in.
        console.log("No user is signed in");
        authStore.clearUserData();
      }
    });
    // Clean up the listener when the component is unmounted
    return unsubscribe;
  };

  // handle redirect based on user role and account status
  const handleRedirect = async () => {
    // lets make sure we have the latest user data
    const usr = auth.currentUser;
    await userAuth.getUserInfoByID(usr.uid);

    // user data is in local storage, so lets get it
    const user = JSON.parse(localStorage.getItem("user"));

    // from firebase functions admin sdk
    const role = user.userProfile.customClaims.role;
    const accountStatus = user.userProfile.customClaims.accountStatus;

    // redirect based on user role and account status
    if (role === "admin") {
      if (accountStatus === "accepted") {
        navigateTo("/admin/employees");
      } else {
        const message =
          accountStatus === "pending"
            ? "Your account is still pending approval"
            : "Your account has been rejected, Please contact an admin";
        alert(message);
        navigateTo("/");
      }
    } else if (role === "user") {
      if (accountStatus === "accepted") {
        navigateTo("/requests");
      } else {
        const message =
          accountStatus === "pending"
            ? "Your account is still pending approval"
            : "Your account has been rejected, Please contact an admin";
        alert(message);
        navigateTo("/");
      }
    }
  };

  // Sign out user
  const signOutUser = async () => {
    auth.signOut().then(() => {
      // Sign-out successful.
      console.log("User signed out");
      authStore.clearUserData();
      navigateTo("/");
      // clear user from local storage
      localStorage.removeItem("user");
    });
  };

  // Get the currently signed-in user
  const getCurrentUser = async () => {
    const user = auth.currentUser;
    const uid = user.uid;
    const userInfo = auth.getUser(uid);
    if (user) {
      // User is signed in.
      authStore.setUserProfile(user);
      return user;
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  };

  // Update user profile image
  const uploadImage = async (file) => {
    console.log("🚀 ~ uploadImage ~ file:", file);
    if (!file) {
      console.error("No file selected");
      return null; // Return null or an appropriate value to indicate no file was uploaded
    }

    const name = `profileimage-${file.name}`;
    const storageRef = sref(storage, `images/${name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Uploaded a blob or file!", snapshot);
      alert("Image uploaded successfully");

      // Get the full URL of the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("File available at", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred");
      return null; // Return null or an appropriate value to indicate upload failure
    }
  };

  // Get user by id
  const getUserById = async () => {
    const uid = auth.currentUser.uid;

    const userRef = dbref(db, `users/${uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      authStore.setWholeUserInfoUserData(data);
    });
  };

  // Get user claims/ access levels
  const getUserClaims = async () => {
    getAuth(app)
      .currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        console.log("idTokenResult:", idTokenResult);
        authStore.setClaims(idTokenResult.claims);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Define validation constraints
  const constraints = {
    photoURL: {
      presence: true,
      url: true,
    },
    phoneNumber: {
      presence: true,
      format: {
        pattern: /^\+?\d+$/,
        message: "must be a valid phone number",
      },
    },
    fname: {
      presence: true,
      sanitizer: (value) => validator.escape(value),
    },
    lname: {
      presence: true,
      sanitizer: (value) => validator.escape(value),
    },
  };

  // Get aLL additional user data from firebase realtime database
  const getUsers = () => {
    const usersRef = dbref(db, "users/");
    onValue(usersRef, (snapshot) => {
      const sn = snapshot.val();
      emsStore.appendAdditionalUserData(sn);
      console.log("🚀 ~ file: useFirebase.js ~ line 162 ~ onValue ~ data", sn);
    });
  };

  // Update user role
  const updateUserRole = (userid, role, value) => {
    const updates = {};
    updates[`users/${userid}/claims/${role}`] = value;

    update(dbref(db), updates)
      .then(() => {
        // User role updated successfully
        alert("User role/status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user role/status", error);
        alert("An error occurred");
      });
  };

  // Choosing to gather logged in user this way to avoid relying on admin sdk
  const getAllCurrentUserInfo = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return;
      }
      await userAuth.getUserInfoByID(user.uid);
      // await getUserClaims();
      // await getUserById();
      // authStore.setWholeUserInfoUserRecord(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Get user requests

  // Get all requests
  const getAllRequests = async () => {
    const requestsRef = dbref(db, "requests/");
    return new Promise((resolve, reject) => {
      onValue(
        requestsRef,
        (snapshot) => {
          const sn = snapshot.val();
          resolve(sn);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  // Get attendance by id
  const getAttendanceById = async (uid) => {
    const attendanceRef = dbref(db, "attendance/" + uid);
    return new Promise((resolve, reject) => {
      onValue(
        attendanceRef,
        (snapshot) => {
          const sn = snapshot.val();
          resolve(sn);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  // Get all attendance
  const getAllAttendance = async () => {
    const attendanceRef = dbref(db, "attendance/");
    return new Promise((resolve, reject) => {
      onValue(
        attendanceRef,
        (snapshot) => {
          const sn = snapshot.val();
          resolve(sn);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  return {
    signInUser,
    getUsers,
    getUserById,
    getCurrentUser,
    sref,
    uploadImage,
    getUserClaims,
    checkingAuthState,
    updateUserRole,
    signOutUser,
    getAllCurrentUserInfo,
    createUserWithEmailAndPassword,
    auth,
    updateProfile,
    getAllRequests,
    getAllAttendance,
    getAttendanceById,
    update,
    db,
    dbref,
    onValue,
  };
}
