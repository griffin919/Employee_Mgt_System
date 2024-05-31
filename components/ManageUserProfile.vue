<template>
  <div>
    <i @click="closeModal('requestFormModal')"
            class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"></i>
    <h1 class="text-2lg font-bold mb-2">Employee Profile Management</h1>
    <div class="bg-white rounded-lg ">
      <div class="flex items-center mb-6">
        <img
          :src="employee.imageUrl || 'https://via.placeholder.com/80'"
          alt="Profile Picture"
          class="w-[4rem] h-[4rem] rounded-full mr-4"
        />
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
          <span class="text-gray-700 font-semibold mr-4">Account Status:</span>
          <button
            class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2"
            :disabled="!employee.isActive"
            @click="deactivateAccount"
          >
            Active
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            :disabled="employee.isActive"
            @click="activateAccount"
          >
            Deactivate
          </button>
        </div>
        <div>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4"
            @click="confirmDelete = true"
          >
            Confirm Delete
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            @click="updateUserInfo"
          >
            Update User Info
          </button>
        </div>
      </div>
    </div>
    <div v-if="confirmDelete" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">Confirm Delete Employee</h3>
        <p class="mb-4">Are you sure you want to delete this employee?</p>
        <div class="flex justify-end">
          <button
            class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-2"
            @click="confirmDelete = false"
          >
            Cancel
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            @click="deleteEmployee"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import useModal from "@/composables/useModal";
import useFirebase from "@/composables/useFirebase";
const { showClosableModal, hideModal } = useModal();

const closeModal = () => {
  // Initialize useModal composable
  const modalId = "userInfoModal";
  hideModal(modalId);
};

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

const updateUserInfo = () => {
  console.log("🚀 ~ updateUserInfo")
  try {
    firestore.addCustomInfoToUserProfile(employee.value);
    // Show success message
  } catch (error) {
    console.error(error);
    // Show error message
  }
};

const deleteEmployee = () => {
  // Delete employee from the database
  // ...
  confirmDelete.value = false;
};
</script>