<template>
    <div class="h-screen">
      <div>
        <EmployeesEmployeeProfile />
      </div>
      <div class="flex justify-end mt-4">
        <div class="bg-gray-200 rounded-t-lg overflow-hidden">
          <button
            @click="switchTab(1)"
            class="bx bx-mail-send"
            :class="[
              'px-6 py-1 text-gray-600 font-medium focus:outline-none',
              activeTab === 1 ? 'bg-white' : '',
            ]"
          >
            Employee Requests
          </button>
          <button
            @click="switchTab(2)"
            class="bx bx-time-five"
            :class="[
              'px-6 py-1 text-gray-600 font-medium focus:outline-none',
              activeTab === 2 ? 'bg-white' : '',
            ]"
          >
            Attendance
            <i class="bi bi-calendar-alt"></i>
          </button>
        </div>
      </div>
      <div class="flex flex-col ">
        <EmployeesEmployeeRequests v-if="activeTab === 1" />
        <EmployeesAttendanceSheet v-else-if="activeTab === 2" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useEmsStore } from "@/stores/emsStore";
  
  const activeTab = ref(1);
  
  const switchTab = (tab) => {
    activeTab.value = tab;
  };
  
  useHead({
    title: "Employee Dashboard",
    meta: [{ name: "description", content: "Employer hub" }],
  });
  
  definePageMeta({
    // middleware: ["unauthemp"],
    layout: "companyems",
  });
  </script>