<template>
  <!-- request form modal -->
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

  <!-- request info modal -->
  <div
    id="requestInfoModal"
    data-modal-target="requestInfoModal"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-fulloverflow-hidden md:inset-0"
  >
    <div
      class="bg-white p-4 rounded-2xl relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
    >
      <!-- TODO: UPDATE TO  -->
      <div
        class="relative bg-white rounded-lg max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold mb-4">Leave Request</h2>
          <i
            @click="closeModal('requestInfoModal')"
            class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"
          ></i>
        </div>
        <div class="flex items-center mb-6">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile Picture"
            class="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 class="text-lg font-semibold">Raymond Oppong Asare</h3>
            <p class="text-gray-600">Accountant</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-gray-700 font-semibold mb-2"
              >Leave From:</label
            >
            <input
              type="text"
              value="11th June, 2023"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">To: </label>
            <input
              type="text"
              value="11th June, 2024"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled
            />
          </div>
        </div>
        <p class="text-gray-700 mb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div class="flex justify-end">
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4"
          >
            Deny Request
          </button>
          <button
            class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Approve Request
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white mt-4 relative overflow-x-auto shadow-md rounded-lg p-2">
    <div
      class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
    >
      <div class="flex py-2 items-center text-base font-semibold ml-4">
        <p>Requests</p>
        <button @click="getUserRequests" class="flex items-baseline">
          <i class="ml-4 text-lg bx bx-revision"></i>
        </button>
      </div>
      <div class="flex bg-gray-200 text-gray-500 rounded-md p-1">
        <a
          href="#"
          @click="filterRequests('All')"
          class="px-3 py-1 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:bg-white"
          >All</a
        >
        <a
          href="#"
          @click="filterRequests('Requested')"
          class="px-3 py-1 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:bg-white"
          >New</a
        >
        <a
          href="#"
          @click="filterRequests('Approved')"
          class="px-3 py-1 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:bg-white"
          >Approved</a
        >
        <a
          href="#"
          @click="filterRequests('Denied')"
          class="px-3 py-1 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-white"
          >Denied</a
        >
      </div>
      <!-- <div class="w-2/12">
        <button
          @click="showCreateRequest"
          class="bg-blue-500 border py-1 border-blue-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-30svh overflow-y-auto"
          type="button"
        >
          Create Request
        </button> -->
      </div>
    </div>
    <div class="overflow-y-auto h-[74svh]">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="sticky top-0 bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Date</th>
            <th scope="col" class="px-6 py-3">Employee</th>
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
            <td class="px-6 py-1">{{}}</td>

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
              <button
                @click="showModalGen('manageRequestModal', req)"
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
            <option value="pending">Pending</option>
            <option value="Approved">Approve</option>
            <option value="rejected">Reject</option>
            <option value="cancalled">cancal</option>
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
</template>
<script setup>
import { useFormatDate } from "@/composables/useFormatDate";
import { ref } from "vue";
import useModal from "@/composables/useModal";

const selectedRequest = ref({});

const firebase = useFirebase();
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
  layout: "companyems",
});

const refresh = () => {
  // employerListStore.loadAllListings();
};

const showModalGen = (id, req) => {
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
  const userReqs = await firebase.getAllRequests();


  userRequests.value = Object.entries(userReqs)
  .flatMap(([userId, userRequests]) =>
    Object.entries(userRequests)
      .map(([requestId, request]) => ({
        ...request,
        userId
      }))
  );
  console.log("🚀 ~ getUserRequests ~ userRequests:", userRequests);
};

const showCreateRequest = () => {
  showModal("requestFormModal");
};

const showRequestInfoModal = () => {
  showModal("requestInfoModal");
};

const closeModal = () => {
  hideModal("requestInfoModal");
};


const filteredRequests = ref(userRequests);

const filterRequests = (status) => {
  if (status === "All") {
    filteredRequests.value = requests;
    return;
  }
  filteredRequests.value = requests.filter(
    (request) => request.status === status
  );
};
</script>
