<template>
    <div class="container mx-auto py-8 bg-white rounded-lg pl-4 pr-4 ">
      <div class="flex justify-between">
        <div>
          <h1 class="text-2xl font-bold mb-4">Attendance Log</h1>
        </div>
        <div class="mb-4 flex items-center">
          <label for="startDate" class="mr-2">Start Date:</label>
          <input
            id="startDate"
            v-model="startDate"
            type="date"
            class="border border-gray-300 rounded px-2 py-1 mr-4"
          />
          <label for="endDate" class="mr-2">End Date:</label>
          <input
            id="endDate"
            v-model="endDate"
            type="date"
            class="border border-gray-300 rounded px-2 py-1"
          />
          <button class="hover:text-green-600 text-gray-800 px-2 rounded flex items-center" @click="resetFilteredAttendanceLog">
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
      </div>
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2"> ID</th>
            <th class="px-4 py-2">Employee Name</th>
            <th class="px-4 py-2">Date</th>
            <th class="px-4 py-2">In Time</th>
            <th class="px-4 py-2">Out Time</th>
            <th class="px-4 py-2">Working Hours</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Late Arrival</th>
            <th class="px-4 py-2">Early Dept.</th>
            <th class="px-4 py-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in filteredAttendanceLog"
            :key="record.employeeId"
            class="border-b"
          >
            <td class="px-4 py-2">{{ record.employeeId }}</td>
            <td class="px-4 py-2">{{ record.employeeName }}</td>
            <td class="px-4 py-2">{{ record.date }}</td>
            <td class="px-4 py-2">{{ record.inTime || '-' }}</td>
            <td class="px-4 py-2">{{ record.outTime || '-' }}</td>
            <td class="px-4 py-2">{{ record.workingHours || '-' }}</td>
            <td class="px-4 py-2">{{ record.status }}</td>
            <td class="px-4 py-2">{{ record.lateArrival ? 'Yes' : 'No' }}</td>
            <td class="px-4 py-2">{{ record.earlyDeparture ? 'Yes' : 'No' }}</td>
            <td class="px-4 py-2">{{ record.notes || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { useEmployeeStore } from '@/stores/employeeStore';
  import { computed, ref, watch } from 'vue';
  
  const employeeStore = useEmployeeStore();
  const attendanceLog = employeeStore.attendanceLog;
  const startDate = ref('');
  const endDate = ref('');
  let filteredAttendanceLog = ref([]);

  const resetFilteredAttendanceLog = () => {
    filteredAttendanceLog = attendanceLog;
  };
  
  watch(
  [startDate, endDate],
  ([newStartDate, newEndDate]) => {
    if (!newStartDate && !newEndDate) {
      filteredAttendanceLog.value = attendanceLog;
    } else {
      filteredAttendanceLog.value = attendanceLog.filter((record) => {
        // Assuming your date format is "MM/DD/YYYY"
        const parts = record.date.split('/');
        const recordDate = new Date(parts[2], parts[0] - 1, parts[1]);

        const start = newStartDate
          ? new Date(newStartDate)
          : new Date(-8640000000000000);
        const end = newEndDate
          ? new Date(newEndDate)
          : new Date(8640000000000000);

        return recordDate >= start && recordDate <= end;
      });
    }
  },
  { immediate: true }
);

 
  </script>