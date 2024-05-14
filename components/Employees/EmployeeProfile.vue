<template>
  <div class="bg-white text-gray p-4 flex items-center justify-between rounded-lg">
    <div class="flex items-center">
      <button class=" hover:text-green text-gray-400 py-4  rounded"
        @click="navigateTo('/employer/ems/dashboard')">
        <i class="bx bx-chevron-left text-2xl mr-4"></i>
      </button>
      <img src="/assets/images/profile-image.jpg" alt="Profile Picture" class="w-12 h-12 rounded-full mr-4">
      <div>
        <h2 class="text-lg font-semibold">{{ employeeStore.selectedEmployee.name }}</h2>
        <p class="text-sm">{{ employeeStore.selectedEmployee.role }}</p>
      </div>
    </div>
    <div>
      <button class=" hover:bg-red-600 hover:text-white text-gray-600 py-2 px-4 rounded"
        @click="showManageEmployeeModal">Manage</button>

    </div>


    <!-- View Request modal -->
    <div id="viewEmployeeModal" tabindex="-1" data-modal-target="viewEmployeeModal" aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]">

      <div class="relative bg-white p-5 rounded-lg max-w-4xl max-h-full overflow-y-auto scrollbar-hidden">
        <i @click="closeModal('viewEmployeeModal')"
              class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600 z-10"></i>
        <div class="relative rounded-lg ">
          <div class="max-w-3xl mx-auto ">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semi bold mb-4">Employee Profile Management</h2>
              
            </div>
            <div class=" rounded-lg ">
              <div class="flex items-center mb-6">
                <img src="https://via.placeholder.com/80" alt="Profile Picture" class="w-20 h-20 rounded-full mr-4" />
                <div>
                  <h2 class="text-xl font-semibold">Raymond Oppong Asare</h2>
                  <p class="text-gray-600">Accountant</p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">First Name</label>
                  <input type="text" value="Raymond" class="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Last Name</label>
                  <input type="text" value="Oppong Asare" class="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input type="text" value="050 001 8533" class="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input type="email" value="rayopps@gmail.com"
                    class="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Address</label>
                  <input type="text" value="12 la bawaleshi"
                    class="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Region</label>
                  <input type="text" value="Accra" class="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">ID Type</label>
                  <input type="text" value="Ghana card" class="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">ID Number</label>
                  <input type="text" value="GHA28839182732283-7"
                    class="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
              </div>
              <div class="flex justify-between items-center mt-6">
                <div class="flex items-center">
                  <span class="text-gray-600 mr-2"> Status:</span>
                  <div class="flex border rounded">
                    <button class="py-1 px-2 border-r bg-green">Active</button>
                    <button class="py-1 px-2">Deactivate</button>
                  </div>
                </div>
                <div class="flex">
                  <button class="py-1 px-2 border rounded mr-2"> Delete</button>
                  <button class="py-1 px-2 border rounded">Update User Info</button>
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>

    </div>




  </div>
</template>
<script setup>
import useModal from "@/composables/useModal";
import { onMounted } from "vue";

import { useEmployeeStore } from '~/stores/employeeStore';
const { hideModal, showModal, showClosableModal } = useModal();


const employeeStore = useEmployeeStore();

const employee = employeeStore.selectedEmployee;



const showManageEmployeeModal = () => {
  showModal('viewEmployeeModal');
};

const closeModal = (id) => {
  // Initialize useModal composable
  const modalId = id || 'viewEmployeeModal';
  hideModal(modalId);
};


</script>