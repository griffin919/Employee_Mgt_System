<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" v-if="showModal">
      <div class="bg-white rounded-lg shadow-md w-full max-w-md">
        <div class="flex justify-end">
          <i @click="closeModal" class="bx bx-x-circle m-4 text-2xl text-gray-400 hover:text-red-600 cursor-pointer"></i>
        </div>
        <div class="p-6">
          <h1 class="mb-6 text-2xl font-bold text-gray-800">Create Employee Account</h1>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="name">Name</label>
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="John Doe"
              v-model="name"
            />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="email">Email</label>
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              v-model="email"
              placeholder="john_doe@mail.com"
            />
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-700" for="password">Password</label>
            <input
              class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              v-model="password"
              placeholder="********"
            />
          </div>
          <button
            class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="button"
            @click="createUser"
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import useModal from "@/composables/useModal";
  import useFirebase from "@/composables/useFirebase";
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const firestore = useFirebase();
  const { showModal, hideModal } = useModal();
  
  const createUser = async () => {
    console.log("Creating user with email and password:", email.value, password.value);
    try {
       firestore.createUserAccount(email.value, password.value);
    } catch (error) {
      console.error(error);
    }
  }
  
  const closeModal = () => {
    hideModal('createAccountModal');
  }
  </script>