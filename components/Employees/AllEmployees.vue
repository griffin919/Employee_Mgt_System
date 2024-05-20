<template>
    <div>
      <div class="mb-4 flex justify-between">
        <div class="flex items-center">
          <h2 class="text-lg font-semibold">Employees</h2>
          <button class="hover:text-green-600 text-gray-800 px-2 rounded flex items-center">
            <svg class="w-6 h-6 mr-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search employee"
            @input="filterEmployees($event)"
            class="w-full p-2 border border-gray-200 bg-gray-100 rounded-lg h-8 text-sm"
          />
        </div>
      </div>
      <div class="shadow rounded-lg">
        <table class="w-full">
          <thead class="ml-3">
            <tr class="bg-gray-200">
              <th class="py-2 px-4">Name</th>
              <th class="py-2 px-4 ">Department</th>
              <th class="py-2 px-4 ">Role</th>
              <th class="py-2 px-4 "></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in filteredEmployees" :key="employee.id" class="hover:bg-gray-100">
              <td class="py-2 px-4 flex items-center">
                <img src="/assets/images/profile-image.jpg" alt="Profile Picture" class="w-8 h-8 rounded-full mr-2" />
                {{ employee.name }}
              </td>
              <td class="py-2 px-4 ">{{ employee.department }}</td>
              <td class="py-2 px-4 ">{{ employee.role }}</td>
              <td class="py-2 px-4 ">
                <button
                  @click="navigateToEmployeeDash(employee)"
                  class="bg-gray-400 hover:bg-gray-600 text-white text-sm py-2 px-4 rounded-lg"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useEmsStore } from '../../stores/emsStore';
  import { ref, computed, onMounted } from 'vue';
  import useFirebase from '@/composables/useFirebase';
  import { navigateTo } from '#imports';
  
  const firebase  = useFirebase();
  const emsStore = useEmsStore();

  onMounted(() => {
    const users = firebase.getUsers();
    firebase.getAllUsers().then((users) => {
      console.log("🚀 ~ onMounted ~ users:", users)
    });
  });
  const employees = ref(emsStore.employees);
  const filteredEmployees = ref(employees.value);
  
  const filterEmployees = (e) => {
    filteredEmployees.value = employees.value.filter((employee) =>
      employee.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
  };
  
  const navigateToEmployeeDash = (employee) => {
    emsStore.setSelectedEmployee(employee);
    navigateTo('/admin/employeedash');
  };
  </script>