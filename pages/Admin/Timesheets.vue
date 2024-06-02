<template>
  <div class="bg-white relative overflow-x-auto shadow-md rounded-lg p-2">


          <div
        class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
      >
        <div class="flex py-2 items-center text-base font-semibold ml-4">
          <p>Timesheets</p>
          <button @click="getUserAttendance" class="flex items-baseline">
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
             @change="getUserAttendance"
          />
          <label for="endDate" class="mr-2">End Date:</label>
          <input
            id="endDate"
            v-model="endDate"
             @change="getUserAttendance"
            type="date"
            class="border bg-gray-200 border-gray-300 mr-4 rounded px-2 py-1"
          />
          
          <button
              class="bg-green-500 border py-2 border-green-500  text-white text-sm rounded-lg block px-2"
              type="button"
              @click="printTable"
            >
              Print Report
            </button></div>
      </div>
    <div class="overflow-y-auto h-[74svh]">
      <table id="timesheetTable" class="w-full text-sm text-left text-gray-500">
        <thead class="sticky  border-b top-0 bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Date</th>
            <th scope="col" class="px-6 py-3">Employee</th>
            <th scope="col" class="px-6 py-3">Clock In</th>
            <th scope="col" class="px-6 py-3">Clock Out</th>
            <th scope="col" class="px-6 py-3">Hour Worked</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white hover:bg-gray-50"
            v-for="log in attendanceLog"
            :key="log.userid"
          >
           
            <td class="px-6 py-3">{{formatDate(log.date) }}</td>
            <td class="px-6 py-3">{{ log.user }}</td>
            <td class="px-6 py-3">{{ log.clockIn }}</td>
            <td class="px-6 py-3">{{ log.clockOut }}</td>
            <td class="px-6 py-3">{{ log.hoursWorked }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { useFormatDate } from "@/composables/useFormatDate";
import useFirebase from "@/composables/useFirebase";
import { ref, onMounted } from "vue";

onMounted(() => {
  getUserAttendance();
});


const printTable = () => {
 const table = document.getElementById("timesheetTable");
  const newWindow = window.open('', '_blank');

  newWindow.document.write('<html><head><title>Timesheet Table</title>');
  newWindow.document.write('<style>table {border-collapse: collapse;} table, th, td {border: 1px solid black;}</style></head><body>');
  newWindow.document.write(table.outerHTML);
  newWindow.document.write('</body></html>');

  newWindow.document.close();
  newWindow.print();

};

const startDate = ref('');
const endDate = ref('');


const firebase = useFirebase();
const { formatDate } = useFormatDate();
const attendanceLog = ref([]);

//get all user attendance and process it
const getUserAttendance = async () => {
  try {
    let data = await firebase.getAllAttendance();
    const personalAttendance = [];

    // Process logs for each user
    for (const userId in data) {
      const logsForUser = data[userId];
      const sortedLogs = Object.values(logsForUser).sort(
        (a, b) => new Date(a.time) - new Date(b.time)
      );
      let timeIn = null;
      let timeOut = null;
      for (const log of sortedLogs) {
        const logTime = new Date(log.time);
        if (log.logType === "clockIn") {
          if (!timeIn || logTime < timeIn) {
            timeIn = logTime;
          }
        } else if (log.logType === "clockOut") {
          if (!timeOut || logTime > timeOut) {
            timeOut = logTime;
          }
        }
        if (timeIn && timeOut) {
          const timeDiff = timeOut - timeIn;
          const hoursWorked = (timeDiff / (1000 * 60 * 60)).toFixed(2);
          personalAttendance.push({
            user: log.user,
            userId,
            date: timeIn.toISOString().split("T")[0],
            clockIn: timeIn.toLocaleTimeString(),
            clockOut: timeOut.toLocaleTimeString(),
            hoursWorked,
          });
          timeIn = null;
          timeOut = null;
        }
      }
    }

    // Filter personalAttendance based on startDate and endDate
    const filteredAttendance = personalAttendance.filter(log => {
      const logDate = new Date(log.date);
      if (startDate.value && endDate.value) {
        return logDate >= new Date(startDate.value) && logDate <= new Date(endDate.value);
      } else if (startDate.value) {
        return logDate >= new Date(startDate.value);
      } else if (endDate.value) {
        return logDate <= new Date(endDate.value);
      }
      return true; // Include all logs if no date filter is applied
    });

    attendanceLog.value = filteredAttendance;
    console.log("🚀 ~ getUserAttendance ~ attendanceLog.value:", attendanceLog.value);
  } catch (error) {
    console.log(error);
  }
};


useHead({
  title: "Timesheets",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  middleware: ["unauthadmin"],
  layout: "companyems",
});

const refresh = () => {
  // employerListStore.loadAllListings();
};
</script>
