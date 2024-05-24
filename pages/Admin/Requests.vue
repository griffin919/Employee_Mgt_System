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
           <div class="relative bg-white rounded-lg max-w-4xl max-h-full overflow-y-auto scrollbar-hidden">

        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold mb-4">Leave Request</h2>
          <i @click="closeModal('requestInfoModal')"
            class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"></i>
        </div>
        <div class="flex items-center mb-6">
          <img src="https://via.placeholder.com/80" alt="Profile Picture" class="w-16 h-16 rounded-full mr-4" />
          <div>
            <h3 class="text-lg font-semibold">Raymond Oppong Asare</h3>
            <p class="text-gray-600">Accountant</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Leave From:</label>
            <input type="text" value="11th June, 2023" class="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">To: </label>
            <input type="text" value="11th June, 2024" class="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled />
          </div>
        </div>
        <p class="text-gray-700 mb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
          the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <div class="flex justify-end">
          <button class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4">
            Deny Request
          </button>
          <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
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
        <button @click="refresh" class="flex items-baseline">
          <i class="ml-4 text-lg bx bx-revision"></i>
        </button>
      </div>
      <div class="flex bg-gray-200 text-gray-500 rounded-md p-1">
                <a href="#" @click="filterRequests('All')"
                  class="px-3 py-1 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:bg-white">All</a>
                <a href="#" @click="filterRequests('Requested')"
                  class="px-3 py-1 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:bg-white">New</a>
                <a href="#" @click="filterRequests('Approved')"
                  class="px-3 py-1 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:bg-white">Approved</a>
                <a href="#" @click="filterRequests('Denied')"
                  class="px-3 py-1 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-white">Denied</a>
              </div>
      <div class="w-2/12">
        <button
          @click="showCreateRequest"
          class="bg-blue-500 border py-1 border-blue-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-30svh overflow-y-auto"
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
            <th class="px-6 py-3">Ref #</th>
            <th class="px-6 py-3">Employee</th>
            <th class="px-6 py-3">Request Date</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="request in filteredRequests"
            :key="request.ref"
            class="bg-white hover:bg-gray-50"
          >
            <td class="px-4 py-3 text-sm text-gray-700">{{ request.ref }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">
              {{ request.employee }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-700">
              {{ request.requestDate }}
            </td>
            <td class="px-4 py-3">
              <span
                :class="{
                  'text-gray-800 bg-gray-100': request.status === 'Requested',
                  'text-green-800 bg-green-100': request.status === 'Approved',
                  'text-red-800 bg-red-100': request.status === 'Denied',
                }"
                class="inline-flex  items-center justify-center px-3 py-2 text-xs font-semibold leading-none rounded-full"
              >
                {{ request.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm font-semibold text-gray-600">
              <button
                @click="showRequestInfoModal"
                class="bg-white hover:bg-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
import { ref } from "vue";
import useModal from "@/composables/useModal";
import { useEmsStore } from "@/stores/emsStore";

const emsStore = useEmsStore();

const { hideModal, showModal, showClosableModal } = useModal();
const { formatDate } = useFormatDate();

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


const requests = [
  {
    ref: '120394',
    employee: 'Christian Ansah',
    requestDate: '11th June 2023',
    status: 'Requested'
  },
  {
    ref: '120394',
    employee: 'John Stockton',
    requestDate: '11th June 2023',
    status: 'Approved'
  },
  {
    ref: '120394',
    employee: 'Aubrey Cole',
    requestDate: '11th June 2023',
    status: 'Denied'
  }
];




const showCreateRequest = () => {
  showModal('requestFormModal');
};

const showRequestInfoModal = () => {
  showModal('requestInfoModal');
};

const closeModal = () => {
  hideModal('requestInfoModal');
};


const filteredRequests = ref(requests);

const filterRequests = (status) => {
  if (status === 'All') {
    filteredRequests.value = requests;
    return;
  }
  filteredRequests.value = requests.filter(request => request.status === status);
};
</script>