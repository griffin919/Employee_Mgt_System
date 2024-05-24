<template>
  <div class="flex flex-col ">
    <div class="bg-white text-gray p-4 flex items-center justify-between rounded-lg">
      <EmployeesEmsheader />
    </div>
    <div class="bg-white flex-1 rounded-lg">
          
    <div class="bg-white rounded-lg p-6">
        <h4 class="text-lg font-bold"> Profile Management</h4>
      <div class="flex items-center mb-6">
        <div>
          <h2 class="text-xl font-semibold">{{ employee.fname }} {{ employee.lname }}</h2>
          <p class="text-gray-600">{{ employee.employee }}</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-700 font-semibold mb-2">First Name</label>
          <input
            type="text"
            v-model="employee.fname"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Last Name</label>
          <input
            type="text"
            v-model="employee.lname"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Phone Number</label>
          <input
            type="text"
            v-model="employee.phoneNumber"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Email Address</label>
          <input
            type="email"
            v-model="employee.email"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Address</label>
          <input
            type="text"
            v-model="employee.address"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Region</label>
          <input
            type="text"
            v-model="employee.region"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">ID Type</label>
          <input
            type="text"
            v-model="employee.idType"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">ID Number</label>
          <input
            type="text"
            v-model="employee.idNumber"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>
      <div class="flex items-center justify-between mt-6">
        <div>

          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            @click="updateUserInfo"
          >
            Request Update
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script setup>

useHead({
  title: "Profile",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  // middleware: ["unauthemp"],
  layout: "companyems",
});

import { ref, computed } from 'vue';
import useModal from "@/composables/useModal";
import useFirebase from "@/composables/useFirebase";

const firestore = useFirebase();
const confirmDelete = ref(false);

const employee = ref({
  username: '',
  email: '',
  imageUrl: '',
  fname: '',
  lname: '',
  employee: '',
  phoneNumber: '',
  staffid: '',
  address: '',
  region: '',
  idNumber: '',
  idType: '',
  isActive: true,
});

const activateAccount = () => {
  employee.value.isActive = true;
};

const deactivateAccount = () => {
  employee.value.isActive = false;
};

const deleteEmployee = () => {
  // Delete employee from the database
  // ...
  confirmDelete.value = false;
};

import { useModalStore } from "@/stores/modalStore.js";
const modalStore = useModalStore();

const updateUserInfo = () => {
  
  let info = "Confirm profile update";
    modalStore.changeDialog(info);
  let func = {};
  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
     try {
    firestore.addCustomInfoToUserProfile(employee.value);
    // Show success message
  } catch (error) {
    console.error(error);
    // Show error message
  }
  };

  modalStore.OpenYesOrNOClick(func);
};
</script>