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
      <i
        @click="closeModal('userInfoModal')"
        class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"
      ></i>
      <!-- TODO: UPDATE TO  -->
      <!-- <ManageUserProfile /> -->
      <EmployeesUserProfile :selectedEmployee="selectedEmployee" />
    </div>
  </div>


  <div class="bg-white relative overflow-x-auto shadow-md rounded-lg p-2">
    <div
      class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
    >
      <div class="flex py-2 items-center text-base font-semibold ml-4">
        <p>Employees</p>
        <button @click="refresh" class="flex items-baseline">
          <i class="ml-4 text-lg bx bx-revision" @click="fetchUsers"></i>
        </button>
      </div>
      <div class="w-4/12 p-2">
        <input
          @input="filterEmployees($event)"
          type="text"
          placeholder="search employee name"
          class="w-full border bg-gray-200 border-gray-300 rounded-md px-3 py-1"
        />
      </div>
    </div>
    <div class="overflow-y-auto h-[74svh]">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="sticky top-0 bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3"></th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Staff ID</th>
            <th scope="col" class="px-6 py-3">Department</th>
            <th scope="col" class="px-6 py-3">Role</th>
            <th scope="col" class="px-6 py-3">Account Status</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="(employee, index) in employees"
            :key="employee.userRecord.uid"
          >
            <td class="px-6 py-1">
              <!-- <img class="w-[2rem] h-[2rem] rounded-full" src="../../assets/images/generic_userimg.jpg" alt="Profile Image"> -->
              <img
                class="w-[2rem] h-[2rem] rounded-full"
                :src="
                  employee.userRecord.photoURL
                    ? employee.userRecord.photoURL
                    : '../../assets/images/generic_userimg.jpg'
                "
                alt="Profile Image"
              />
            </td>
            <td
              scope="row"
              class="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap"
            >
              <div class="text-base font-semibold">
                {{ employee.userRecord?.displayName }}
              </div>
            </td>
            <td class="px-6 py-1">
              {{ employee.userData?.staffid }}
            </td>
            <td class="px-6 py-1">{{ employee.userData?.department }}</td>
            <td class="px-6 py-1">
              {{ employee.userRecord.customClaims?.role }}
            </td>

            <td class="px-6 py-1">
              {{ employee.userRecord.customClaims?.accountStatus }}
            </td>
            <td class="px-6 py-1">
              <button
                @click="showUserInfoModal(employee)"
                class="bg-gray-200 border py-1 px-4 text-sm rounded-lg block"
                type="button"
              >
                Manage
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Update User Role Modal -->
  </div>
</template>
<script setup>
import { useFormatDate } from "@/composables/useFormatDate";
import useModal from "@/composables/useModal";
import useFirebase from "@/composables/useFirebase";
import { onMounted, ref, nextTick } from "vue";
import useAuth from "@/composables/useAuth";

const authComp = useAuth();

const { hideModal, showModal, showClosableModal } = useModal();
const { formatDate } = useFormatDate();
const firebase = useFirebase();
const employees = ref([]);
const personalAttendance = ref([]);
const roleValue = ref("");
// const filteredEmployees = ref(employees.value);
// const allEmployeeIds =  employees ? Object.keys(employees.value) : [];
const accountStatusValue = ref([]);
const userRoleValue = ref([]);
const selectedEmployee = ref(null);

onMounted(() => {
  //fetch ll users on page load
  // const users = firebase.getUsers();
  authComp.fetchAllUsers();
  firebase.getUsers();
  console.log("Employees1:", employees);
});

const logit = () => {
  // authComp.fetchAllUsers();
  firebase.getUsers();
  // console.log("Users:", users);
};

const fetchUsers = async () => {
  const users = firebase.getUsers();
};

useHead({
  title: "Timesheets",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  // middleware: ["unauthemp"],
  layout: "companyems",
});

// const filterEmployees = (e) => {
//   filteredEmployees.value = employees.value.filter((employee) =>
//     employee.name.toLowerCase().includes(e.target.value.toLowerCase())
//   );
// };

const updateAccountStatus = (userid) => {
  const value = accountStatusValue.value[userid];

  console.log("updateAccountStatus:", value);

  if (!value || !userid) {
    alert("Please fill in all fields");
    return;
  }

  // validate
  if (!["accepted", "pending", "rejected"].includes(value)) {
    alert("Invalid account status value provided");
    return;
  }

  authComp.updateUserAccessRole(userid, "accountStatus", value);
};

const updateUserAccessRole = (userid) => {
  const value = userRoleValue.value[userid];

  console.log("updateUserRole:", value);

  if (!value || !userid) {
    alert("Please fill in all fields");
    return;
  }

  // validate
  if (!["user", "admin", "root"].includes(value)) {
    alert("Invalid user role value provided");
    return;
  }

  authComp.updateUserAccessRole(userid, "role", value);
};

// const updateAccountStatus = (userid) => {
//   const value = accountStatusValue.value[userid];

//   console.log("updateAccountStatus:", value);

//   if (!value || !userid) {
//     alert("Please fill in all fields");
//     return;
//   }

//   // validate
//   if (!["accepted", "pending", "rejected"].includes(value)) {
//     alert("Invalid account status value provided");
//     return;
//   }

//   firebase.updateUserRole(userid, "accountStatus", value);
// };

// const updateUserRole = (userid) => {
//   const value = userRoleValue.value[userid];
//   console.log("🚀 ~ updateUserRole ~ value:", value)

//   console.log("updateUserRole:", value);

//   if (!value || !userid) {
//     alert("Please fill in all fields");
//     return;
//   }

//   // validate
//   if (!["user", "admin"].includes(value)) {
//     alert("Invalid user role value provided");
//     return;
//   }

//   firebase.updateUserRole(userid, "role", value);
// };
const showUserInfoModal = (employee) => {
  selectedEmployee.value = employee;
  if (!selectedEmployee.value) {
    alert("Please select an employee to manage");
    return;
  }
  showModal("userInfoModal");

  // Re-render the child component after selectedEmployee is updated
  // nextTick(() => {
  //   // Trigger a re-render by modifying a reactive data property
  //   console.log("🚀 ~ showUserInfoModal ~ selectedEmployee:", selectedEmployee.value);

  //   selectedEmployee.value = { ...selectedEmployee.value };
  // });
};

const closeModal = () => {
  // Initialize useModal composable
  const modalId = "userInfoModal";
  hideModal(modalId);
};

const showModalGen = (id) => {
  showModal(id);
};

const closeModalGen = (id) => {
  // Initialize useModal composable
  hideModal(id);
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
