<template>
  <div class="flex flex-col h-screen">
    <div class="bg-white text-gray p-4 flex items-center justify-between rounded-lg">
      <EmployeesEmsheader />
    </div>
    <div class="bg-white flex-1 mt-4 p-4 rounded-lg">
        
    </div>
  </div>
</template>
<script setup>

useHead({
  title: "Requests",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  // middleware: ["unauthemp"],
  layout: "userlayout",
});

</script>