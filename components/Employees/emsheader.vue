<template>
    <div class="flex items-center">
        <img src="/assets/RUCST_logo.jpg" alt="Profile Picture" class="w-12 h-10 rounded-full mr-4">
        <div class="flex justify-between w-full">
            <div>
                <h2 class="text-lg font-semibold">Regent University Employees</h2>
            </div>
            <!-- <p class="text-sm">Human Resource Officer</p> -->
            <div>
                <button @click="showRequestInfoModal" class="bg-gray-500 text-white px-4 py-1 rounded-lg">Add Employee</button>
            </div>
        </div>

        <!-- View Request modal -->
        <div id="createAccountModal" tabindex="-1" data-modal-target="createAccountModal" aria-hidden="true"
            class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]">

            <createUserAccount />
        </div>

    </div>
</template>
<script setup>
import createUserAccount from "@/components/Employees/createUserAccount.vue";
import useModal from "@/composables/useModal";
import { useEmployeeStore } from '#imports';

const { hideModal, showModal, showClosableModal } = useModal();



const showRequestInfoModal = () => {
  showModal('createAccountModal');
};

const closeModal = () => {
  hideModal('createAccountModal');
};

</script>