<template>
    <div class="flex items-center w-full">
         <div class="flex items-center">
        <div class="mr-8">
          <img class="w-[5rem] h-[5rem] rounded-full" src="https://i.postimg.cc/bryMmCQB/profile-image.jpg" alt="Profile Image">
        </div>
        <div>
          <p class="text-xl font-bold">Ethan Rivers</p>
          <p class="text-sm text-gray-600">Department</p>
          <p class="text-sm text-gray-600">Employee ID</p>
        </div>
      </div>

    </div>
</template>
<script setup>
import AddUser from "@/components/Employees/AddUser.vue";
import useModal from "@/composables/useModal";
import { useEmsStore } from '@/stores/emsStore';

const { hideModal, showModal, showClosableModal } = useModal();

const showRequestInfoModal = () => {
  showModal('createAccountModal');
};

const closeModal = () => {
  hideModal('createAccountModal');
};

</script>