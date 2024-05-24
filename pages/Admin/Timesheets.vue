<template>

    <div
      class="bg-white relative overflow-x-auto shadow-md rounded-lg p-2"
    >
      <div
        class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
      >
        <div class="flex py-2 items-center text-base font-semibold ml-4">
          <p>Timesheets</p>
          <button @click="refresh" class="flex items-baseline">
            <i class="ml-4 text-lg bx bx-revision"></i>
          </button>
        </div>
        <div class=" p-2 flex ">
          
          <label for="startDate" class="mr-2">Start Date:</label>
          <input
            id="startDate"
            v-model="startDate"
            type="date"
            class="border bg-gray-200 border-gray-300 rounded px-2 py-1 mr-4"
          />
          <label for="endDate" class="mr-2">End Date:</label>
          <input
            id="endDate"
            v-model="endDate"
            type="date"
            class="border bg-gray-200 border-gray-300 mr-4 rounded px-2 py-1"
          />
          
          <button
              class="bg-green-500 border py-2 border-green-500  text-white text-sm rounded-lg block px-2"
              type="button"
            >
              Print Report
            </button></div>
      </div>
      <div class="overflow-y-auto h-[74svh]">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="sticky top-0 bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Date</th>
              <th scope="col" class="px-6 py-3">Employee</th>
              <th scope="col" class="px-6 py-3">Start time</th>
              <th scope="col" class="px-6 py-3">Finish time</th>
              <th scope="col" class="px-6 py-3">Work time</th>
              
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b hover:bg-gray-50"
              v-for="item in personalAttendance"
              :key="item.id"
            >
              <th
                scope="row"
                class="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap"
              >
                <div class="text-base font-semibold">
                  {{ formatDate(item.date) }}
                </div>
              </th>
              <td class="px-6 py-1">{{ listing.start_time }}</td>
              <td class="px-6 py-1">{{ listing.end_time }}</td>
              <td class="px-6 py-1">
                <button
             @click="showUserInfoModal"
              class="bg-gray-200 border py-2 border-gray-200  text-white text-sm rounded-lg block w-full p-2.5"
              type="button"
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
import { useFormatDate } from "@/composables/useFormatDate";
import { useEmsStore } from '@/stores/emsStore';

const emsStore = useEmsStore();

const { formatDate } = useFormatDate();

useHead({
  title: "Employees",
});

definePageMeta({
  // middleware: ["unauthemp"],
  layout: "companyems",
});

const personalAttendance = ref([]);
const startDate = ref('');
const endDate = ref('');

const refresh = () => {
  // employerListStore.loadAllListings();
};



</script>