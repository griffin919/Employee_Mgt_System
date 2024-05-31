<template>
    <div class="flex items-center  justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md" style="width: 30vw;">
            <div class="flex items-center justify-center mb-6">
                <img src="~/assets/RUCST_logo.jpg" alt="Logo" class="h-12" />
            </div>
            <div class="mb-4">
                <label for="username" class="block text-gray-700 font-bold mb-2">email</label>
                <input id="username" v-model="email" type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
            </div>
            <div class="mb-6">
                <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
                <input id="password" v-model="password" type="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
            </div>
            <div class="mb-6">
                <button @click="loginUser"
                    class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300">
                    Login
                </button>
            </div>
            <div class="flex items-center justify-between">
                <a href="#" class="text-indigo-500 hover:text-indigo-600">Forgot Password?</a>
                <a href="#" @click="showRequestInfoModal" class="text-indigo-500 hover:text-indigo-600">Create
                    Account</a>
            </div>
        </div>

        <div id="createAccountModal" tabindex="-1" data-modal-target="createAccountModal" aria-hidden="true"
            class="fixed top-0 left-0  right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]">
            <EmployeesAddUser />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import useModal from "@/composables/useModal";
import useFirebase from "@/composables/useFirebase";
const { hideModal, showModal, showClosableModal } = useModal();
const firestore = useFirebase();
const authStore = useAuthStore();
import { onMounted } from 'vue';


definePageMeta({
  middleware: ["approveduser"],
  layout: "blank",
});

const showRequestInfoModal = () => {
    showModal('createAccountModal');
};

const closeModal = () => {
    hideModal('createAccountModal');
};

const email = ref('');
const password = ref('');

const logit = () => {
    console.log(authStore.role, authStore);
};

const loginUser = async () => {
    try {
        firestore.signInUser(email.value, password.value);

        if (authStore.user) {
            firestore.getUserClaims();
            navigateTo('/timesheets');
        };
    } catch (error) {
        console.error(error);
    }
};
</script>