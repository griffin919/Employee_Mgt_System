<template>
    <div>
                <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold mb-4">Leave Request</h2>
          <i @click="closeModal('requestFormModal')"
            class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"></i>
        </div>
        <div class="flex items-center mb-6">
          <img :src="userInfo.userRecord.photoURL" alt="Profile Picture" class="w-16 h-16 rounded-full mr-4" />
          <div>
            <h3 class="text-lg font-semibold">{{ userInfo.userData.fname || '' }} {{ userInfo.userData.lname }}</h3>
            <p class="text-gray-600">Accountant</p>
          </div>

          <div class="ml-auto ">
            <button @click="submitRequest" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            Submit Request
          </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Leave From:</label>
            <input type="date" v-model="requestBucket.startDate"  value="11th June, 2023" class="w-full border border-gray-300 rounded-md px-3 py-2"
               />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">To: </label>
            <input type="date" v-model="requestBucket.endDate" value="11th June, 2024" class="w-full border border-gray-300 rounded-md px-3 py-2"
               />
          </div>
        </div>
        <textarea
        type="text"
        id="chat"
        style="resize: none"
        v-model="requestBucket.reason"  
        rows="4"
        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        placeholder="Your reason..."
      ></textarea>
        <div class="flex justify-end">
          <!-- <button class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4">
            Deny Request
          </button>
          <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            Submit Request
          </button> -->
        </div>
    </div>
</template>

<script setup>
import useModal from "@/composables/useModal";
import useFirebase from "@/composables/useFirebase";
import { useAuthStore } from "@/stores/authStore";


const firebase = useFirebase();
const authStore = useAuthStore();
const emsStore = useEmsStore();
const { showClosableModal, hideModal } = useModal();

const userInfo = ref(authStore.wholeUserInfo);


const requestBucket = ref({
  startDate: "",
  endDate: "",
  reason: "",
  requestType: "leave",
}); 


const closeModal = () => {
  // Initialize useModal composable
  const modalId = "requestFormModal";
  hideModal(modalId);
};

import { useModalStore } from "@/stores/modalStore.js";
const modalStore = useModalStore();



const submitRequest = () => {

  
    closeModal();
  
  let info = "Confirm submit";
    modalStore.changeDialog(info);
  let func = {};
  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
     try {
        // employerAuth.logout()
        firebase.createRequest(requestBucket.value);
        console.log("🚀 ~ requestBucket:", requestBucket)
      } catch (error) {
        throw error; // Rethrow the error to handle it elsewhere if needed
      }
  };

  modalStore.OpenYesOrNOClick(func);
};

</script>