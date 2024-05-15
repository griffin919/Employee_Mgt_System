<template>
  <div class="h-screen">
      <div class="bg-white p-3">
          <EmployeesEmsheader />
      </div>
      <div class="flex flex-col mt-4">
        <EmployeesAttendanceSheet />
      </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useEmsStore } from "@/stores/emsStore";

useHead({
  title: "Employee Dashboard",
  meta: [
      {
          name: "description",
          content: "Employer hub"
      }
  ]
});

definePageMeta({
  // middleware: ["unauthemp"],
  layout: "companyems"
});
</script>