<template>
  <div
    id="requestFormModal"
    data-modal-target="requestFormModal"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full overflow-hidden md:inset-0"
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
    <div class="flex items-center mb-6" v-if="userInfo">
      <img
      v-if="userInfo.userProfile"
        :src="
          userInfo.userProfile.photoURL
        "
        alt="Profile Picture"
        class="w-16 h-16 rounded-full mr-4"
      />
      <div v-if="userInfo.userData">
        <h3 class="text-lg font-semibold">
          {{ userInfo.userData.fname || "" }} {{ userInfo.userData.lname }}
        </h3>
        <p class="text-gray-600">{{ userInfo.userData.department }}</p>
      </div>

      <div class="ml-auto">
        <p
          
          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-[4rem]"
        >
          {{selectedRequest.status}}
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
            <th scope="col" class="px-6 py-3"></th>
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
                {{ req.requestType }}
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
import { ref, onMounted } from "vue";
import useModal from "@/composables/useModal";
import useFirebase from "@/composables/useFirebase";

//
onMounted(() => {
  getUserRequests();
});

const selectedRequest = ref({});
const firebase = useFirebase();
const userRequests = ref({});

const { hideModal, showModal, showClosableModal } = useModal();
const { formatDate } = useFormatDate();

useHead({
  title: "Requests",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  // middleware: ["unauthemp"],
  layout: "userlayout",
});

const authStore = useAuthStore();
const userInfo = authStore.getUser;
// Update request status
const updateRequestStatus = async (id) => {
  if (!selectedRequest.value) return;

  const user = firebase.auth.currentUser;
  const req = selectedRequest.value;

  const updates = {};
  updates[`requests/${user.uid}/${req.requestid}/status`] = req.status;

  firebase
    .update(firebase.dbref(firebase.db), updates)
    .then(() => {
      // User role updated successfully
      alert("Request status updated successfully");
      closeModalGen(id);
      getUserRequests();
    })
    .catch((error) => {
      console.error("Error updating request status", error);
      alert("An error occurred");
    });
};

// get logged in user's requests
const getUserRequests = async () => {

  const uid = userInfo.userProfile.uid;
  console.log("🚀 ~ getUserRequests ~ user1:", uid);

  const requestsRef = firebase.dbref(firebase.db, "requests/" + uid);
  return new Promise((resolve, reject) => {
    firebase.onValue(
      requestsRef,
      (snapshot) => {
        const sn = snapshot.val();
        userRequests.value = sn;
        console.log("🚀 ~ returnnewPromise ~ userRequests:", userRequests.value)
        resolve(sn);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const showModalGen = (id, req) => {
  selectedRequest.value = req;
  showModal(id);
};

const closeModalGen = (id) => {
  hideModal(id);
  selectedRequest.value = {};
};
</script>
