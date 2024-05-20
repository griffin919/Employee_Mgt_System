<template>
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-md max-w-lg p-7 w-full mx-4">
      <div class="flex justify-between items-center px-4 py-2 border-b">
        <h3 class="text-lg font-semibold">Create Employee Account</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-800">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="p-4">
        <div v-if="step === 1">
          <!-- Step 1: Personal Information -->
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="email">Email</label>
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email" type="email" placeholder="john@example.com" v-model="user.accountInfo.email" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="password">Password</label>
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password" type="password" placeholder="**********" v-model="user.accountInfo.password" />
          </div>
          <div class="flex justify-between">
            <button
              class="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="button" @click="createUserAccount">
              Create Account
            </button>
            <button
              class="px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              type="button" @click="step = 2">
              Next
            </button>
            <button
              class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="button" @click="logit">
              Log it
            </button>
          </div>
        </div>
        <div v-else-if="step === 2">
          <!-- Step 2: Employment Information -->
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="firstName">First Name</label>
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="firstName" type="text" placeholder="John" v-model="user.personalInfo.fname" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="lastName">Last Name</label>
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="lastName" type="text" placeholder="Doe" v-model="user.personalInfo.lname" />
          </div>
          <div class="mb-4 flex items-center">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-700" for="profileImage">Profile Image</label>
              <input
                class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="profileImage" type="file" @change="handleProfileImageUpload" />
            </div>
            <div class="ml-4">
              <img v-if="previewImage" :src="previewImage" class="w-20 h-20 rounded-full object-cover" />
              <div v-else class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <svg class="text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" style="width: 2rem; height: 2rem;">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="address">Phone Number</label>
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="address" type="text" placeholder="" v-model="user.accountInfo.phoneNumber" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="dateOfBirth">Date of Birth</label>
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="dateOfBirth" type="date" v-model="user.personalInfo.dateOfBirth" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="gender">Gender</label>
            <select
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="gender" v-model="user.personalInfo.gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="department">Staff ID</label>
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="department" type="text" placeholder="" v-model="user.personalInfo.staffid" />
          </div>
          <div class="flex justify-between">
            <button
              class="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              type="button" @click="step = 1">
              Back
            </button>
            <button
              class="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="button" @click="UpdateUserInfo">
              Submit
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import useModal from "@/composables/useModal";
import useFirebase from "@/composables/useFirebase";
import { update } from 'firebase/database';
import UpdateUserProfile from '~/pages/Employer/ems/updateUserProfile.vue';
import { useEmsStore } from '@/stores/emsStore';
import { useAuthStore } from '@/stores/authStore';
import useAuth from '@/composables/useAuth';


const emsStore = useEmsStore();
const authStore = useAuthStore();
const userAuth = useAuth();
const firebase = useFirebase();

const previewImage = ref(null);

const { showModal, hideModal } = useModal();
const step = ref(1); // Current step of the form

const loggedInUser = ref(null);

const logit = () => {
  // userAuth.setRefreshTokenCookie(user.accessToken);
  const accessToken = useCookie('accessToken').value;
  console.log("🚀 ~ logit ~ _user:", accessToken)
  console.log("🚀 ~ logit ~ Current User:", firebase.getCurrentUser())
}

const verifyUser = () => {
  const user = firebase.getCurrentUser();
  console.log("🚀 ~ verifyUser ~ user:", user)
  if (user) {
    loggedInUser.value = user;
  }
};

const user = ref(
  {
    accountInfo: {
      email: "",
      password: "",
      phoneNumber: "",
      photoURL: ""
    },
    personalInfo: {
      fname: "",
      lname: "",
      address: "",
      dateOfBirth: "",
      gender: "",

    },
    employmentInfo: {
      staffid: "",
      jobTitle: "",
      department: "",
      hireDate: "",
      employmentStatus: "",
      supervisor: "" // Reference to another user account
    },
    attendance: [
    ],
    additionalInfo: {
      emergencyContact: {
        name: "",
        relationship: "",
        phoneNumber: ""
      },
      educationQualifications: [

      ],
      professionalCertifications: [

      ],
    },
    accountStatus: {
      active: true,
      roles: ["employee"]
    },
    permissions: {
      canViewDashboard: true,
      canEditProfile: true,
      canViewReports: false
    }
  }
);
const handleProfileImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        previewImage.value = URL.createObjectURL(file);
        console.log("🚀 ~ handleProfileImageUpload ~ previewImage:", previewImage)
        // ... other image upload logic
      } else {
        this.previewImage = null;
        console.log("🚀 ~ handleProfileImageUpload ~ previewImage:", previewImage)
      }
    };


const handleProfileImageUpload1 = async (file) => {
  await firebase.uploadImage(file).then((response) => {
    console.log('Image uploaded successfully:', response);
    user.value.accountInfo.photoURL = response;
    console.log("🚀 ~ handleProfileImageUpload ~ user.value.accountInfo.photoUR:", user.value.accountInfo)

  }).catch((error) => {
    console.error('Error uploading image:', error);
  });

}


// const UpdateUserInfo = async () => {
//   const currentUser = firebase.getCurrentUser().then((response) => {
//     console.log("User updated successfully:", response);
//   }).catch((error) => {
//     console.error(error);
//   });

//   if(currentUser.accessToken){

//   console.log("Updating user with:", user.value);
//   const { email, password } = user.value.accountInfo;
//   const { fname, lname, address, date
//   }
//   firebase.updateCurrentUser(user.value).then((response) => {
//     console.log("User updated successfully:", response);
//     hideModal('createAccountModal');
//   }).catch((error) => {
//     console.error(error);
//   });
// }};
const UpdateUserInfo = async () => {
  if (previewImage.value) {
    await handleProfileImageUpload1(previewImage.value);
  };

console.log("Updating user with:", user.value.accountInfo);
   firebase.updateCurrentUser(user.value);
};

const createUserAccount = async () => {
  console.log("Creating user with:", user.value.accountInfo);
  const { email, password } = user.value.accountInfo;
  firebase.createUserAccount(user.value).then((response) => {
    // step.value = 2;
  }).catch((error) => {
    console.error(error);
  });

  // const loggedInUser =  firebase.getCurrentUser();
  // step.value = 2;
};


const closeModal = () => {
  hideModal('createAccountModal');
  step.value = 1;
};
</script>