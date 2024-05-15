// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updateCurrentUser  } from "firebase/auth";
import { useEmsStore } from "~/stores/emsStore";
import validate from 'validate.js';

const emsStore = useEmsStore();


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
  const analytics = getAnalytics(app);
  const db = getDatabase(app);
  const auth = getAuth(); // Moved the auth initialization here

  // Create User with email and password
  const createUserAccount = (email, password) => {
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        alert("User created successfully");
        // ... Other operations related to user creation
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ... Other error handling code
      });
  };

  const updateCurrentUser = (data) => {
    updateProfile(auth.currentUser, {
      displayName: data.name,
      photoURL: data.photoURL,
      staffid: data.staffid
    }).then(() => {
      alert("Profile updated successfully");
      // Profile updated!
      // ...
    }).catch((error) => {
      console.log("UpdateProfile ~ error", error);
      alert("An error occurred");
      // An error occurred
      // ...
    });
  }

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
        console.log("🚀 ~ .then ~ user:", user)
        emsStore.setUserProfile(user);
        console.log("🚀 ~ .then ~ emsStore.setUserProfile(user);", emsStore.userProfile);
        alert("User signed in successfully");
        })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ... Other error handling code
      });
  }

  // firebase auth allows only predefined valuse i.e username, email, photoURL, phoneNumber, and displayName 
function addCustomInfoToUserProfile(data) {
  const user = auth.currentUser;

  // Define validation constraints
  const constraints = {
    username: {
      presence: true,
      length: { minimum: 3, maximum: 20 },
      format: /^[a-zA-Z0-9_]+$/,
    },
    email: {
      presence: true,
      email: true,
    },
    imageUrl: {
      url: true,
    },
    fname: {
      presence: true,
    },
    lname: {
      presence: true,
    },
    employee: {
      presence: true,
    },
    phoneNumber: {
      format: /^\+?[0-9\-\(\)\s]+$/,
    },
    staffid: {
      numericality: { onlyInteger: true },
    },
    address: {
      presence: true,
    },
    region: {
      presence: true,
    },
    idType: {
      presence: true,
    },
    idNumber: {
      numericality: { onlyInteger: true },
    },
  };

  // Validate the data
  const validationErrors = validate(data, constraints);

  // If there are validation errors, handle them
  if (validationErrors) {
    // Handle validation errors
    console.error('Validation errors:', validationErrors);
    return;
  }

  // If the data is valid, sanitize it
  const { username, email, imageUrl, fname, lname, employee, phoneNumber, staffid, address, region, idType, idNumber } = data;

  const sanitizedData = {
    username: username.trim(),
    email: email.trim().toLowerCase(),
    imageUrl: imageUrl.trim(),
    fname: fname.trim(),
    lname: lname.trim(),
    employee: employee.trim(),
    phoneNumber: phoneNumber.trim(),
    staffid: staffid.trim(),
    address: address.trim(),
    region: region.trim(),
    idType: idType.trim(),
    idNumber: idNumber.trim(),
  };

  const db = getDatabase();
  set(ref(db, 'users/' + user.uid), {
    ...sanitizedData,
    fullName: computed(() => `${sanitizedData.fname} ${sanitizedData.lname}`),
    isActive: true,
  }).then(() => {
    alert("User profile updated successfully");
    // Data saved successfully
    // ...
  }).catch((error) => {
    console.error('Error updating user profile:', error);
    alert("An error occurred");
    // An error occurred
    // ...
  });
}


  return {
    db,
    createUserAccount,
    signInUser,
    addCustomInfoToUserProfile
  };
}