<template>
  <div class="bg-white rounded-md shadow-md">
    <div class="bg-white px-4 py-2 flex items-center justify-between rounded-t-md">
      <div class="self-start">
        <h3 class="text-lg font-semibold text-gray-700">Requests</h3>
      </div>
    <nav class=" rounded-lg ">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-12">
            <div class="flex items-center h-12 p-3 rounded-lg bg-gray-200 ">
              <div class="flex bg-gray-600 text-white rounded-md">
                <a href="#" @click="filterRequests('All')"
                  class="px-3 py-2 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">All</a>
                <a href="#" @click="filterRequests('Requested')"
                  class="px-3 py-2 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">New</a>
                <a href="#" @click="filterRequests('Approved')"
                  class="px-3 py-2 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">Approved</a>
                <a href="#" @click="filterRequests('Denied')"
                  class="px-3 py-2 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">Denied</a>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <!-- Additional navigation links can be added here -->
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div class="flex items-center space-x-2">

      </div>
    </div>
    <div class="divide-y divide-gray-200">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Ref #</th>
            <th class="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Employee</th>
            <th class="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Request Date
            </th>
            <th class="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">Status</th>
            <th class="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in filteredRequests" :key="request.ref" class="bg-white hover:bg-gray-50">
            <td class="px-4 py-3 text-sm text-gray-700">{{ request.ref }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ request.employee }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ request.requestDate }}</td>
            <td class="px-4 py-3">
              <span :class="{
                'text-gray-800 bg-gray-100': request.status === 'Requested',
                'text-green-800 bg-green-100': request.status === 'Approved',
                'text-red-800 bg-red-100': request.status === 'Denied'
              }"
                class="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none rounded-full">
                {{ request.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm font-semibold text-gray-600">
              <button @click="showRequestInfoModal"
                class="bg-white hover:bg-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400">
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- View Request modal -->
    <div id="requestInfoModal" tabindex="-1" data-modal-target="requestInfoModal" aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]">

      <div class="relative bg-white p-5 rounded-lg max-w-4xl max-h-full overflow-y-auto scrollbar-hidden">

        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold mb-4">Leave Request</h2>
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
</template>

<script setup>
import { ref } from 'vue';
import useModal from "@/composables/useModal";
import { useEmsStore } from '@/stores/emsStore';

const emsStore = useEmsStore();

const { hideModal, showModal, showClosableModal } = useModal();

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