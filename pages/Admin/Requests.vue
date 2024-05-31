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

  <!-- Manage Request Modal -->
  <div
    id="manageRequestModal"
    data-modal-target="UpdateUserRole"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full overflow-hidden md:inset-0"
  >
    <div
      class="bg-white p-4 rounded-2xl relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
    >
      <div>
        <i
          @click="closeModalGen('manageRequestModal')"
          class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"
        ></i>
      </div>
      <div>
        <div class="flex items-center mb-6" v-if="selectUser">
          <img
            v-if="selectUser.userProfile"
            :src="selectUser.userProfile.photoURL"
            alt="Profile Picture"
            class="w-16 h-16 rounded-full mr-4"
          />
          <div v-if="selectUser.userData">
            <h3 class="text-lg font-semibold">
              {{ selectUser.userData.fname || "" }}
              {{ selectUser.userData.lname }}
            </h3>
            <p class="text-gray-600">{{ selectUser.userData.department }}</p>
          </div>

          <div class="ml-auto">
            <p
              class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-[4rem]"
            >
              {{ selectedRequest.status }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-gray-700 font-semibold mb-2"
              >Leave From:</label
            >
            <input
              type="date"
              v-model="selectedRequest.startDate"
              disabled
              value="11th June, 2023"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">To: </label>
            <input
              type="date"
              disabled
              v-model="selectedRequest.endDate"
              value="11th June, 2024"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
        <textarea
          type="text"
          id="chat"
          style="resize: none"
          disabled
          v-model="selectedRequest.reason"
          rows="4"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          placeholder="Your reason..."
        ></textarea>
        <div class="flex">
          <button
          @click="updateRequestStatus('Reject')"
            class="w-6/12 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4"
          >
            Deny Request
          </button>
          <button
          @click="updateRequestStatus('Approve')"
            class="w-6/12 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
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
          @click="filterRequests('pending')"
          class="px-3 py-1 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:bg-white"
          >New</a
        >
        <a
          href="#"
          @click="filterRequests('accepted')"
          class="px-3 py-1 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:bg-white"
          >Approved</a
        >
        <a
          href="#"
          @click="filterRequests('rejected')"
          class="px-3 py-1 w-20 text-center rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:bg-white"
          >Denied</a
        >
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
          <th scope="col" class="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b hover:bg-gray-50"
          v-for="(req, index) in filteredRequests"
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
  middleware: ["unauthadmin"],
  layout: "companyems",
});

const modalStore = useModalStore();

const updateRequestStatus = (n) => {
  console.log(n)
  hideModal('manageRequestModal');
   let info = "Confirm update?";
  modalStore.changeDialog(info);
  let func = {};
  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    try {
   
  const user = firebase.auth.currentUser;
  const req = selectedRequest.value;

  const updates = {};
  updates[`requests/${req.userId}/${req.requestid}/status`] = n;

  firebase
    .update(firebase.dbref(firebase.db), updates)
    .then(() => {
      // User role updated successfully
      alert("Request status updated successfully");
      getUserRequests();
    })
    .catch((error) => {
      console.error("Error updating request status", error);
      alert("An error occurred");
    });
    } catch (error) {
      throw error; 
    }
  };

  modalStore.OpenYesOrNOClick(func);
};

const selectUser = ref({});

const showModalGen = async (id, req) => {
  console.log(req);

  console.log(req.userId);
  const functionUrl = `https://us-central1-regent-ems-fbdb.cloudfunctions.net/getUserByUid?uid=${req.userId}`;

  try {
    const response = await fetch(functionUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        selectedRequest.value = req;
        selectUser.value = data.data;

        showModal(id);
      } else {
        console.error("Error:", data.error);
      }
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const closeModalGen = (id) => {
  hideModal(id);
  selectedRequest.value = {};
};



const getUserRequests = async () => {
  const user = firebase.auth.currentUser;
  const userReqs = await firebase.getAllRequests();

  userRequests.value = Object.entries(userReqs).flatMap(
    ([userId, userRequests]) =>
      Object.entries(userRequests).map(([requestId, request]) => ({
        ...request,
        userId,
        requestid: requestId, // Add this line to include the requestId
      }))
  );

  // Initialize filteredRequests with all fetched requests
  filteredRequests.value = userRequests.value;

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
 const filteredRequests = ref([]);

    const filterRequests = (status) => {
      if (status === 'All') {
        filteredRequests.value = userRequests.value;
      } else {
        filteredRequests.value = userRequests.value.filter(
          (request) => request.status === status
        );
      }
    };


    onMounted(() => {
      // Initialize filteredRequests to show all requests by default
      filteredRequests.value = userRequests.value;
      filterRequests('All')
    });
</script>
