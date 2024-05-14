<template>
    <div class="flex flex-col items-center justify-center h-50 bg-gray-100">
        <div class="flex justify-end w-full">
            <i @click="closeModal" class="bx bx-x-circle  top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"></i>
        </div>
        <div class="w-full p-6 bg-white rounded-lg shadow-md w-full">

            <h1 class="mb-6 text-2xl font-bold text-gray-800">Create Employee Account</h1>
            <div class="mb-4">
                <label class="block mb-2 text-sm font-medium text-gray-700" for="name">Name</label>
                <input
                    class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="name" type="text" placeholder="John Doe" value="John Doe" />
            </div>
            <div class="mb-4">
                <label class="block mb-2 text-sm font-medium text-gray-700" for="email">Email</label>
                <input
                    class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email" type="email" placeholder="john_doe@mail.com" value="john_doe@mail.com" />
            </div>
            <div class="mb-6">
                <label class="block mb-2 text-sm font-medium text-gray-700" for="password">Password</label>
                <input
                    class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="********" value="********" />
            </div>
            <button
                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="button">
                Add Employee
            </button>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import useModal from "@/composables/useModal";

const { hideModal, showModal, showClosableModal } = useModal();


const closeModal = () => {
    hideModal('createAccountModal');
};
</script>