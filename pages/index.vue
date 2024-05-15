<template>
    <div class="flex items-center  justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md" style="width: 23vw;">
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
                <button  @click="loginUser"
                    class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300">
                    Login
                </button>
            </div>
            <div class="flex items-center justify-center">
                <button
                    class=" flex items-center justify-center bg-gray-200 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300">
                    <i class='bx bx-fingerprint'></i>
                    Login with fingerprint
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
  import { ref } from 'vue';
  import useModal from "@/composables/useModal";
  import useFirebase from "@/composables/useFirebase";
  import { useEmsStore } from '@/stores/emsStore';

const emsStore = useEmsStore();

  const firestore = useFirebase();

const email = ref('');
const password = ref('');

const loginUser = async () => {
    try {
        const response = firestore.signInUser(email.value, password.value);
    } catch (error) {
        console.error(error);
    }
};

</script>