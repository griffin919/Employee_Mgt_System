<template>

    <div class="bg-white flex-1 rounded-lg">
          
    <div class="bg-white rounded-lg p-6">
        <h4 class="text-lg font-bold"> Profile Management</h4>
      <div class="flex items-center mb-6">
        <div>
          <!-- <h2 class="text-xl font-semibold">{{ employee.fname }} {{ employee.lname }}</h2>
          <p class="text-gray-600">{{ employee.employee }}</p> -->
        </div>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <!-- Step 2: Update Account Info -->
        <div v-if="step === 2">
          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-medium text-gray-700"
              for="firstName"
              >First Name</label
            >
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="firstName"
              type="text"
              placeholder="John"
              v-model="userProfile.fname"
            />
          </div>
          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-medium text-gray-700"
              for="lastName"
              >Last Name</label
            >
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="lastName"
              type="text"
              placeholder="Doe"
              v-model="userProfile.lname"
            />
          </div>

          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-medium text-gray-700"
              for="address"
              >Phone Number</label
            >
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="address"
              type="text"
              placeholder=""
              v-model="userProfile.phoneNumber"
            />
          </div>
          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-medium text-gray-700"
              for="gender"
              >Gender</label
            >
            <select
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="gender"
              v-model="userProfile.gender"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="flex justify-between">
            
            <div class="flex justify-between">
              <button
                class="px-4 py-2 mx-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                type="button"
                @click="step = 1"
              >
                Back
              </button>
              <button
                class="px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                type="button"
                @click="step = 3"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <!-- Step 3: Employment Information -->
        <div v-else-if="step === 3">
          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-medium text-gray-700"
              for="department"
              >Staff ID</label
            >
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="department"
              type="text"
              placeholder=""
              v-model="employmentInfo.staffid"
            />
          </div>
          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-medium text-gray-700"
              for="department"
              >Job Title</label
            >
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="department"
              type="text"
              placeholder=""
              v-model="employmentInfo.jobTitle"
            />
          </div>
          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-medium text-gray-700"
              for="department"
              >Department</label
            >
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="department"
              type="text"
              placeholder=""
              v-model="employmentInfo.department"
            />
          </div>
          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-medium text-gray-700"
              for="dateOfBirth"
              >Date of Birth</label
            >
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="dateOfBirth"
              type="date"
              v-model="userProfile.dateOfBirth"
            />
          </div>
          <div class="mb-4">
            <label
              class="block mb-2 text-sm font-medium text-gray-700"
              for="dateOfBirth"
              >Hire Date</label
            >
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="dateOfBirth"
              type="date"
              v-model="employmentInfo.hireDate"
            />
          </div>

          <div class="flex justify-between">
            <button
              class="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              type="button"
              @click="step = 2"
            >
              Back
            </button>
            <button
              class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="button"
              @click="saveAdditionalUserData"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

    </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import useModal from "@/composables/useModal";
import useFirebase from "@/composables/useFirebase";
import { useAuthStore } from "@/stores/authStore";
import useAuth from "@/composables/useAuth";
import validate from "validate.js";
import validator from "validator";

const authStore = useAuthStore();
const userAuth = useAuth();
const firebase = useFirebase();

const { showModal, hideModal } = useModal();


definePageMeta({
  middleware: ["unauthadmin"],
  layout: "companyems",
});

const step = ref(2); // Current step of the form

const userProfile = ref({
  email: "",
  password: "",
  phoneNumber: "",
  photoURL: "",
  fname: "",
  lname: "",
  gender: "",
  dateOfBirth: "",
});

const employmentInfo = ref({
  staffid: "",
  jobTitle: "",
  department: "",
  hireDate: "",
});

// Lets begin by creating a user account
const createUserAccount = () => {
  const { email, password } = userProfile.value;
  if (email === "" || password === "") {
    alert("Please enter email and password");
    return;
  }

  return firebase
    .createUserWithEmailAndPassword(firebase.auth, email, password)
    .then((userCredential) => {
      // lets get the user data and store it in local storage

      // alert("User signed up successfully");
      checkUserLoggedIn(2);
      // Signed up
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
      // ... Other error handling code
    });
};

// now that we have created a user account, lets check if the user is logged in
// firebase automatically logs in the user after creating an account
// so we can get the user's data from the auth object
const loggedInUser = ref(null);

const checkUserLoggedIn = async (stepto) => {
  const user = firebase.auth.currentUser;
  if (user) {
    //  getUserInfoByID  calls a firebase cloud function to get
    // all available user profile data from the firebase auth and realtime database
    // sets the user data in the local storage as "user"(wanted to name it overlord 😂)
    await userAuth.getUserInfoByID(user.uid);
    // move to the next step
    step.value = stepto;
  } else {
    // No user is signed in.
    alert("Create an account with your email and password to continue");
  }
};

// Now lets update the user profile on the firebase auth,
// we'll update the additional data in realtime database comes next
const UpdateUserInfo = () => {
  const { phoneNumber, fname, lname } = userProfile.value;

  if (!firebase.auth.currentUser) {
    alert("User not signed in");
    return;
  }

  const updatedProfileData = {
    displayName: `${fname} ${lname}`.trim(),
    phoneNumber: phoneNumber ? phoneNumber.toString() : null, // Convert phoneNumber to string or set to null
  };

  firebase
    .updateProfile(firebase.auth.currentUser, updatedProfileData)
    .then((response) => {
      console.log("🚀 ~ updateProfile ~ response:", response);
      alert("Profile updated successfully");
    })
    .catch((error) => {
      console.error("UpdateProfile ~ error", error);
      alert("An error occurred while updating the profile.");
    });
};

// Now lets update the users additional data in the realtime database
// firebase auth allows only predefined valuse i.e username, email, photoURL, phoneNumber, and displayName
function saveAdditionalUserData() {
  UpdateUserInfo()
  const user = firebase.auth.currentUser;
  if (!user) return; // Exit if there's no authenticated user

  const userData = {
    fname: userProfile.value.fname,
    lname: userProfile.value.lname,
    gender: userProfile.value.gender,
    dateOfBirth: userProfile.value.dateOfBirth,
    staffid: employmentInfo.value.staffid,
    jobTitle: employmentInfo.value.jobTitle,
    department: employmentInfo.value.department,
    hireDate: employmentInfo.value.hireDate,
  };

  // Validate the required fields
  const requiredFields = [
    "fname",
    "lname",
    "gender",
    "staffid",
    "jobTitle",
    "department",
    "hireDate",
    "dateOfBirth",
  ];
  const missingFields = requiredFields.filter((field) => !userData[field]);

  if (missingFields.length > 0) {
    const missingFieldsMessage = `Please enter the following fields: ${missingFields.join(
      ", "
    )}`;
    alert(missingFieldsMessage);
    return;
  }

  // Sanitize the data
  const sanitizedData = {};
  for (const [key, value] of Object.entries(userData)) {
    sanitizedData[key] = validator.escape(value);
  }

  // Update the user data in Firebase
  firebase
    .update(firebase.dbref(firebase.db, `users/${user.uid}`), {
      ...sanitizedData,
    })
    .then(() => {
      alert("User profile updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user profile:", error);
      alert("An error occurred");
    });
}

const closeModal = () => {
  hideModal("createAccountModal");
  step.value = 1;
};
</script>
