<template>
   
    <div
      class="bg-white relative overflow-x-auto shadow-md rounded-lg p-2"
    >
      <div
        class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
      >
        <div class="flex py-2 items-center text-base font-semibold ml-4">
          <p>Attendance</p>
          <button @click="refresh" class="flex items-baseline">
            <i class="ml-4 text-lg bx bx-revision"></i>
          </button>
        </div>
        <div class="w-4/12 p-2"></div>
      </div>
      <div class="overflow-y-auto h-[74svh]">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="sticky top-0 bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Date</th>
              <th scope="col" class="px-6 py-3">Start time</th>
              <th scope="col" class="px-6 py-3">End time</th>
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
              <td class="px-6 py-3">{{ item.clockIn }}</td>
              <td class="px-6 py-3">{{ item.clockOut }}</td>
              <td class="px-6 py-3">
                {{ item.hoursWorked }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
<script setup>
import { useFormatDate } from "@/composables/useFormatDate";
import useFirebase from "@/composables/useFirebase";

const { formatDate } = useFormatDate();
const firebase = useFirebase();
const authStore = useAuthStore();
useHead({
  title: "Timesheets",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  middleware: ["unauthuser"],
  layout: "userlayout",
});
const personalAttendance = ref([]);

const uid = authStore.user.userProfile.uid;

const refresh = async () => {
  // employerListStore.loadAllListings();
  console.log(uid);
  try {
    const attendanceData = await firebase.getAttendanceById(uid);
    console.log("🚀 ~ getUserAttendance ~ data:", attendanceData);

    // Process the attendanceData for the single user
    const data = {};
    data[uid] = attendanceData;

    const processedAttendance = [];

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
          processedAttendance.push({
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

    personalAttendance.value = processedAttendance;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  refresh();
});
</script>