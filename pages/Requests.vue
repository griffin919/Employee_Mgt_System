<template>
  <div
    id="requestFormModal"
    data-modal-target="requestFormModal"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-fulloverflow-hidden md:inset-0"
  >
    <div
      class="bg-white p-4 rounded-2xl relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
    >
      <!-- TODO: UPDATE TO  -->
      <RequestForm />
    </div>
  </div>

  <div class="bg-white relative overflow-x-auto shadow-md rounded-lg p-2">
    <div
      class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
    >
      <div class="flex py-2 items-center text-base font-semibold ml-4">
        <p>Requests</p>
        <button @click="getUserRequests" class="flex items-baseline">
          <i class="ml-4 text-lg bx bx-revision"></i>
        </button>
      </div>
      <div class="w-4/12 p-2">
        <button
          @click="showModalGen('requestFormModal')"
          class="bg-blue-500 border py-2 border-blue-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-30svh overflow-y-auto"
          type="button"
        >
          Create Request
        </button>
      </div>
    </div>
    <div class="overflow-y-auto h-[74svh]">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="sticky top-0 bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Date</th>
            <th scope="col" class="px-6 py-3">Type</th>
            <th scope="col" class="px-6 py-3">Start</th>
            <th scope="col" class="px-6 py-3">End</th>
            <th scope="col" class="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="(req, index) in userRequests"
            :key="index"
          >
          
            <td class="px-6 py-1">{{ formatDate(req.dateCreated) }}</td>
            <td
              scope="row"
              class="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap"
            >
              <div class="text-base font-semibold">
                {{ req.requestType }}
              </div>
            </td>

            <td class="px-6 py-1">{{ req.startDate }}</td>
            <td class="px-6 py-1">
              {{ formatDate(req.endDate) }}
            </td>
            <td class="px-6 py-1">
              {{ req.status }}
            </td>
            <td>
              <button @click="showModalGen('manageRequestModal', req)"
                class="bg-white hover:bg-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    
  <!-- Manage Request Modal -->
  <div
    id="manageRequestModal"
    data-modal-target="UpdateUserRole"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden overflow-hidden md:inset-0"
  >
    <div
      class="bg-white p-4 w-2/6 rounded-2xl relative max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
    >
      <div>
        <i
          @click="closeModalGen('manageRequestModal')"
          class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"
        ></i>
      </div>
      <div>
        <select
            v-model="selectedRequest.status"
              class="block appearance-none bg-gray-200 w-100 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              <option value="cancelled">cancel</option>
            </select>
      </div>
      <div class="flex justify-end mt-3">
        <button
          @click="updateRequestStatus('manageRequestModal')"
          class="bg-gray-200 border py-1 px-6 text-sm rounded-lg block"
          type="button"
        >
          Update
        </button>
      </div>
    </div>
  </div>

  </div>
</template>
<script setup>
import { useFormatDate } from "@/composables/useFormatDate";
import { ref , onMounted} from "vue";
import useModal from "@/composables/useModal";
import { useEmsStore } from "@/stores/emsStore";
import useFirebase from "@/composables/useFirebase";

const selectedRequest = ref({});

const firebase = useFirebase();
const emsStore = useEmsStore();
const userRequests = ref({});

const { hideModal, showModal, showClosableModal } = useModal();
const { formatDate } = useFormatDate();

onMounted(() => {
  getUserRequests();
});

useHead({
  title: "Requests",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  // middleware: ["unauthemp"],
  layout: "userlayout",
});

const personalAttendance = ref([]);

const refresh = () => {
  // employerListStore.loadAllListings();
};

const showModalGen = (id,req) => {
  selectedRequest.value = req;
  showModal(id);
};

const closeModalGen = (id) => {
  hideModal(id);
  selectedRequest.value = {};
};

const updateRequestStatus = async (id) => {
  const user = firebase.auth.currentUser;
  const req = selectedRequest.value;
  await firebase.updateRequestStatus(user.uid, req.requestid, req.status);
  closeModalGen(id);
  getUserRequests();
};  

const getUserRequests = async () => {
  const user = firebase.auth.currentUser;
  const userReqs = await firebase.getUserRequests(user.uid);
  userRequests.value = userReqs;
  console.log("🚀 ~ getUserRequests ~ userRequests:", userRequests)
};
</script>