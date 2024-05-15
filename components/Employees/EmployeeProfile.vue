<template>
  <div class="bg-white text-gray p-4 flex items-center justify-between rounded-lg">
    <div class="flex items-center">
      <button class=" hover:text-green text-gray-400 py-4  rounded"
        @click="navigateTo('/employer/ems/dashboard')">
        <i class="bx bx-chevron-left text-2xl mr-4"></i>
      </button>
      <img src="/assets/images/profile-image.jpg" alt="Profile Picture" class="w-12 h-12 rounded-full mr-4">
      <div>
        <h2 class="text-lg font-semibold">{{ emsStore.selectedEmployee.name }}</h2>
        <p class="text-sm">{{ emsStore.selectedEmployee.role }}</p>
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
        <EmployeesManageUserProfile/>
      </div>

    </div>




  </div>
</template>
<script setup>
import useModal from "@/composables/useModal";
import { onMounted } from "vue";

import { useEmsStore } from '@/stores/emsStore';
const { hideModal, showModal, showClosableModal } = useModal();


const emsStore = useEmsStore();

const employee = emsStore.selectedEmployee;



const showManageEmployeeModal = () => {
  showModal('viewEmployeeModal');
};

const closeModal = (id) => {
  // Initialize useModal composable
  const modalId = id || 'viewEmployeeModal';
  hideModal(modalId);
};


</script>