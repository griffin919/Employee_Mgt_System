<template>
<div
      id="userInfoModal"
      data-modal-target="userInfoModal"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-fulloverflow-hidden md:inset-0"
    >
      <div
        class="bg-white p-4 rounded-2xl relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >
        <!-- TODO: UPDATE TO  -->
        <ManageUserProfile/>
      </div>
    </div>
    <div
      class="bg-white relative overflow-x-auto shadow-md rounded-lg p-2"
    >
      <div
        class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
      >
        <div class="flex py-2 items-center text-base font-semibold ml-4">
          <p>Employees</p>
          <button @click="refresh" class="flex items-baseline">
            <i class="ml-4 text-lg bx bx-revision"></i>
          </button>
        </div>
        <div class="w-4/12 p-2">
        <input
         @input="filterEmployees($event)"
            type="text"
            placeholder="search employee name"
            class="w-full border bg-gray-200 border-gray-300 rounded-md px-3 py-1"
          /></div>
      </div>
      <div class="overflow-y-auto h-[74svh]">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="sticky top-0 bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Name</th>
              <th scope="col" class="px-6 py-3">Department</th>
              <th scope="col" class="px-6 py-3">Role</th>
              <th scope="col" class="px-6 py-3">Manage
                <button
             @click="showUserInfoModal"
              class="bg-gray-200 border py-2 border-gray-200  text-white text-sm rounded-lg block w-full p-2.5"
              type="button"
            >
              View
            </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b hover:bg-gray-50"
               v-for="employee in filteredEmployees" :key="employee.id"
            >
              <th
                scope="row"
                class="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap"
              >
                <div class="text-base font-semibold">
                  {{ employee.name }}
                </div>
              </th>
              <td class="px-6 py-1">{{ employee.department }}</td>
              <td class="px-6 py-1">{{ employee.role }}</td>
              <td class="px-6 py-1">
                <button
             @click="showUserInfoModal(employee)"
              class="bg-gray-200 border py-2 border-gray-200  text-white text-sm rounded-lg block w-full p-2.5"
              type="button"
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
import useModal from "@/composables/useModal";
import { useEmsStore } from '@/stores/emsStore';
 import useFirebase from '@/composables/useFirebase';

const emsStore = useEmsStore();

const { hideModal, showModal, showClosableModal } = useModal();
const { formatDate } = useFormatDate();
  const firebase  = useFirebase();


useHead({
  title: "Timesheets",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  // middleware: ["unauthemp"],
  layout: "companyems",
});


onMounted(() => {
    const users = firebase.getUsers();
    firebase.getAllUsers().then((users) => {
      console.log("🚀 ~ onMounted ~ users:", users)
    });
  });
  const employees = ref(emsStore.employees);
  const filteredEmployees = ref(employees.value);
  
  const filterEmployees = (e) => {
    filteredEmployees.value = employees.value.filter((employee) =>
      employee.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
  };
  
  
const personalAttendance = ref([]);

const refresh = () => {
  // employerListStore.loadAllListings();
};



const showUserInfoModal = () => {
  showModal('userInfoModal');
};


const closeModal = () => {
  // Initialize useModal composable
  const modalId = "userInfoModal";
  hideModal(modalId);
};

import { useModalStore } from "@/stores/modalStore.js";
const modalStore = useModalStore();

const submitRequest = () => {

    closeModal();
  
  let info = "Confirm submit";
    modalStore.changeDialog(info);
  let func = {};
  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
     try {
        // employerAuth.logout()
      } catch (error) {
        throw error; // Rethrow the error to handle it elsewhere if needed
      }
  };

  modalStore.OpenYesOrNOClick(func);
};

</script>