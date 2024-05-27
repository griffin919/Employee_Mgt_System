<template>
  <div class="bg-white relative overflow-x-auto shadow-md rounded-lg p-2">
    <div
      class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
    >
      <div class="flex py-2 items-center text-base font-semibold ml-4">
        <p>Attendance</p>
        <button @click="getUserAttendance" class="flex items-baseline">
          <i class="ml-4 text-lg bx bx-revision"></i>
        </button>
      </div>
      <div class="w-4/12 p-2"></div>
    </div>
    <div class="overflow-y-auto h-[74svh]">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="sticky  border-b top-0 bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Date</th>
            <th scope="col" class="px-6 py-3"> user</th>
            <th scope="col" class="px-6 py-3"> Clock In</th>
            <th scope="col" class="px-6 py-3"> Clock Out</th>
            <th scope="col" class="px-6 py-3"> Hour Worked</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white hover:bg-gray-50"
            v-for="log in attendanceLog"
            :key="log.userid"
          >
           
            <td class="px-6 py-1">{{formatDate(log.date) }}</td>
            <td class="px-6 py-1">{{ log.user }}</td>
            <td class="px-6 py-1">{{ log.clockIn }}</td>
            <td class="px-6 py-1">{{ log.clockOut }}</td>
            <td class="px-6 py-1">{{ log.hoursWorked }}</td>
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
    attendanceLog.value = personalAttendance;
    console.log(
      "🚀 ~ getUserAttendance ~ attendanceLog.value:",
      attendanceLog.value
    );
  } catch (error) {
    console.log(error);
  }
};


useHead({
  title: "Timesheets",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  // middleware: ["unauthemp"],
  layout: "userlayout",
});

const refresh = () => {
  // employerListStore.loadAllListings();
};
</script>
