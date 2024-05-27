// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { useAuthStore } from "@/stores/authStore";
import { getDatabase, ref, set, onValue, get, update } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getIdToken,
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
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        // ... Other error handling code
      });
  };

  // listen for auth state changes
  const checkingAuthState = () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await getAllCurrentUserInfo();
          // from firebase functions admin sdk
          const ffrole =
            authStore.wholeUserProfile.userProfile.customClaims.role;
          const ffaccountStatus =
            authStore.wholeUserProfile.userProfile.customClaims.accountStatus;

          // from firebase client sdk
          const fcrole = authStore.claims.role;
          const fcaccountStatus = authStore.claims.accountStatus;

          const role = ffrole || fcrole;
          const accountStatus = ffaccountStatus || fcaccountStatus;

          handleRedirect(role, accountStatus);
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

  const handleRedirect = (role, accountStatus) => {
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
        console.log("userCredential:", userCredential);
        authStore.setUserProfile(userCredential.user);
        getUserById();
        alert("User signed in successfully");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const signOutUser = async () => {
    auth.signOut().then(() => {
      // Sign-out successful.
      console.log("User signed out");
      authStore.clearUserData();
      navigateTo("/");
    });
  };

  const getCurrentUser = async () => {
    const user = auth.currentUser;
    const uid = user.uid;
    const userInfo = auth.getUser(uid);
    console.log("🚀 ~ getCurrentUser ~ userInfo:", userInfo);
    if (user) {
      // User is signed in.
      console.log("getCurrentUser ~ user", user);
      authStore.setUserProfile(user);
      return user;
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  };

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

  const getUserById = async () => {
    const uid = auth.currentUser.uid;

    const userRef = ref(db, `users/${uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      authStore.setWholeUserInfoUserData(data);
      
    });
  };

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

  // Update the current user's profile
  const updateCurrentUser = (data) => {
    const { photoURL, phoneNumber, fname, lname } = data;

    if (!auth.currentUser) {
      alert("User not signed in");
      return;
    }

    const updatedProfileData = {
      photoURL: photoURL ? photoURL.toString() : null, // Convert photoURL to string or set to null
      displayName: `${fname} ${lname}`.trim(),
      phoneNumber: phoneNumber ? phoneNumber.toString() : null, // Convert phoneNumber to string or set to null
    };

    updateProfile(auth.currentUser, updatedProfileData)
      .then((response) => {
        console.log("🚀 ~ updateProfile ~ response:", response);
        alert("Profile updated successfully");
      })
      .catch((error) => {
        console.error("UpdateProfile ~ error", error);
        alert("An error occurred while updating the profile.");
      });
  };

  // firebase auth allows only predefined valuse i.e username, email, photoURL, phoneNumber, and displayName
  function addCustomInfoToUserProfile(data) {
    const {
      fname,
      lname,
      gender,
      staffid,
      jobTitle,
      department,
      hireDate,
      dateOfBirth,
      employmentStatus,
      supervisor,
    } = data;
    const user = auth.currentUser;
    // validate the data
    const constraints = {
      fname: {
        presence: true,
        length: {
          minimum: 2,
          message: "must be at least 2 characters",
        },
      },
      lname: {
        presence: true,
        length: {
          minimum: 2,
          message: "must be at least 2 characters",
        },
      },
      gender: {
        presence: true,
      },
      staffid: {
        presence: true,
      },
      jobTitle: {
        presence: true,
      },
      department: {
        presence: true,
      },
      hireDate: {
        presence: true,
      },
      dateOfBirth: {
        presence: true,
      },
    };

    const errors = validate(data, constraints);
    if (errors) {
      alert("Please enter valid data", errors);
      return "Please enter valid data", errors;
    }

    // If the data is valid, sanitize it
    const sanitizedData = {
      fname: validator.escape(fname),
      lname: validator.escape(lname),
      gender: validator.escape(gender),
      staffid: validator.escape(staffid),
      jobTitle: validator.escape(jobTitle),
      department: validator.escape(department),
      hireDate: validator.escape(hireDate),
      dateOfBirth: validator.escape(dateOfBirth),
    };

    console.log("sanitizedData:", sanitizedData);

    set(ref(db, "users/" + user.uid), {
      ...sanitizedData,
      isActive: true,
    })
      .then(() => {
        // set user role and status
        alert("User profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
        alert("An error occurred");
      });
  }

  // Get aLL additional user data from firebase realtime database
  const getUsers = () => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      const sn = snapshot.val();
      emsStore.appendAdditionalUserData(sn);
      console.log("🚀 ~ file: useFirebase.js ~ line 162 ~ onValue ~ data", sn);
    });
  };

  const updateUserRole = (userid, role, value) => {
   
    const updates = {};
    updates[`users/${userid}/claims/${role}`] = value;

    update(ref(db), updates)
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
      await getUserClaims();
      await getUserById();
      authStore.setWholeUserInfoUserRecord(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const createRequest = (data) => {
    console.log("🚀 ~ createRequest ~ data:", data);
    // validate the data
    const constraints = {
      requestType: {
        presence: true,
      },
      startDate: {
        presence: true,
      },
      endDate: {
        presence: true,
      },
      reason: {
        presence: true,
      },
      requestType: {
        presence: true,
      },
    };

    const errors = validate(data, constraints);
    console.log("🚀 ~ createRequest ~ errors:", errors);
    if (errors) {
      console.log("🚀 ~ createRequest ~ errors:", errors);
      alert("Please enter valid data", errors);
      return "Please enter valid data", errors;
    }

    // If the data is valid, sanitize it
    const sanitizedData = {
      dateCreated: new Date().toISOString(),
      startDate: validator.escape(data.startDate),
      endDate: validator.escape(data.endDate),
      reason: validator.escape(data.reason),
      status: "pending",
      requestType: validator.escape(data.requestType),
      requestid: Date.now(),
    };

    const user = auth.currentUser;
    const leaveRequestRef = ref(db, "requests/");

    update(
      ref(db, "requests/" + user.uid + "/" + sanitizedData.requestid),
      sanitizedData
    )
      .then(() => {
        // set user role and status
        alert("request sent successfully");
      })
      .catch((error) => {
        console.error("Error sending request:", error);
        alert("An error occurred");
      });
  };

  // Get user requests
  const getUserRequests = async (uid) => {
    const requestsRef = ref(db, "requests/" + uid);
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

  // Update request status
  const updateRequestStatus = async (uid, requestid, status) => {
    const updates = {};
    updates[`requests/${uid}/${requestid}/status`] = status;

    update(ref(db), updates)
      .then(() => {
        // User role updated successfully
        alert("Request status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating request status", error);
        alert("An error occurred");
      });
  };

  // Get all requests
  const getAllRequests = async () => {
    const requestsRef = ref(db, "requests/");
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

  

  const getAttendanceById = async (uid) => {
    const attendanceRef = ref(db, "attendance/" + uid);
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

  const getAllAttendance = async () => {
    const attendanceRef = ref(db, "attendance/");
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
    createUserAccount,
    signInUser,
    addCustomInfoToUserProfile,
    getUsers,
    getUserById,
    updateCurrentUser,
    getCurrentUser,
    sref,
    uploadImage,
    getUserClaims,
    checkingAuthState,
    updateUserRole,
    signOutUser,
    getAllCurrentUserInfo,
    createRequest,
    getUserRequests,
    auth,
    updateRequestStatus,
    getAllRequests,
    getAllAttendance,
    getAttendanceById,
  };
}
