<template>
  <div class="flex flex-wrap justify-between"  v-if="selectedEmployee">
    <div class="bg-white rounded-lg shadow-md p-6 mb-6 w-full flex">
      <div class="flex items-center mb-4 w-1/2">
        <img
          :src="selectedEmployee.userProfile.photoURL"
          alt="Profile Picture"
          class="w-28 h-28 rounded-full mr-4"
        />

        <div>
          <h2 class="text-lg font-semibold">Employee profile</h2>
          <p class="text-gray-600">
            Name:
            {{
              selectedEmployee.userProfile.displayName
            }}
          </p>
          <p class="text-gray-600">
            Mobile:
          </p>
          <span>
            Email:
            {{ selectedEmployee.userProfile.email  }}
          </span>
        </div>
      </div>
      <div class="flex items-center mb-4 w-1/2">
        <div>
          <p class="text-gray-600">
            Gender:
            {{ selectedEmployee.userData.gender }}
          </p>
          <p class="text-gray-600">
            Date of Birth:
            {{ selectedEmployee.userData.dateOfBirth  }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6 w-1/2 m-1">
        <h2 class="text-lg font-semibold mb-4">Emploment Profile</h2>
        <div class="text-gray-600 mb-4">
          
          <p class="text-gray-600">
            Staff ID:
            {{ selectedEmployee.userData.staffid || "" }}
          </p>
          <p class="text-gray-600">
            Department:
            {{ selectedEmployee.userData.department || "" }}
          </p>
          <p class="text-gray-600">
            Job Title:
            {{ selectedEmployee.userData.jobTitle || "" }}
          </p>
        </div>
        <div class="flex items-center mb-4"></div>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6 mb-6 w-1/2 m-1">
        <h2 class="text-lg font-semibold mb-4">User Privilage</h2>
        <div class="flex items-center mb-4">
          <div class="text-2xl mr-4">🔓</div>
          <div>
            <h3 class="text-base font-semibold">Account Role</h3>
            <p class="text-gray-600">
              Role: {{ selectedEmployee.userProfile.customClaims.role }}
            </p>
          </div>
          <button
            class="bg-orange-500 text-white py-2 px-4 rounded ml-auto"
            @click="showModalGen('UpdateUserRole')"
          >
            Update
          </button>
        </div>
        <div class="flex items-center mb-4">
          <div class="text-2xl mr-4">🔓</div>
          <div>
            <h3 class="text-base font-semibold">Account Status</h3>
            <p class="text-gray-600">
              Status:
              {{ selectedEmployee.userProfile.customClaims.accountStatus }}
            </p>
          </div>
          <button
            class="bg-orange-500 text-white py-2 px-4 rounded ml-auto"
            @click="showModalGen('updateAccountStatusModal')"
          >
            Update
          </button>
        </div>
      </div>
    </div>

    <div class="flex w-full bg-white rounded-lg" >
      <button @click="deleteAccount(selectedEmployee.userProfile.uid)" class=" bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4">Delete Account</button>
    </div>

    <!-- Update User Role Modal -->
    <div
      id="UpdateUserRole"
      data-modal-target="UpdateUserRole"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden overflow-hidden md:inset-0"
    >
      <div
        class="flex align-center p-4 w-2/6 bg-gray-500 rounded-2xl relative max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >
        <div class="w-1/3 mr-5">
          <select
            v-model="selectedEmployee.userProfile.customClaims.role"
            class="block appearance-none bg-gray-200 w-100 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="root">Root</option>
          </select>
        </div>
        <div class="flex justify-end w-1/3">
          <button
            @click="updateUserAccessRole(selectedEmployee.userProfile.uid, selectedEmployee.userProfile.customClaims.role)"
            class="bg-gray-200 border py-1 px-6 text-sm rounded-lg block"
            type="button"
          >
            Update
          </button>
        </div>
        <div class="w-1/3">
          <i
            @click="closeModalGen('UpdateUserRole')"
            class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"
          ></i>
        </div>
      </div>
    </div>

    <!-- Update Account Status Modal -->
    <div
      id="updateAccountStatusModal"
      data-modal-target="updateAccountStatusModal"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden overflow-hidden md:inset-0"
    >
      <div
        class="flex align-center p-4 w-2/6 bg-gray-500 rounded-2xl relative max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >
        <div class="w-1/3 mr-5">
          <select
            v-model="selectedEmployee.userProfile.customClaims.accountStatus"
            class="block appearance-none bg-gray-200 w-100 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div class="flex justify-end w-1/3">
          <button
            @click="updateAccountStatus(selectedEmployee.userProfile.uid, selectedEmployee.userProfile.customClaims.accountStatus)"
            class="bg-gray-200 border py-1 px-6 text-sm rounded-lg block"
            type="button"
          >
            Update
          </button>
        </div>
        <div class="w-1/3">
          <i
            @click="closeModalGen('updateAccountStatusModal')"
            class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import useModal from "@/composables/useModal";
import { defineProps, onMounted, computed, ref } from "vue";
import useAuth from "@/composables/useAuth";
import useFirebase from "@/composables/useFirebase";
import { toRefs } from "vue";

const { hideModal, showModal } = useModal();

const {selectedEmployee} = defineProps({
  selectedEmployee: {
    type: Object,
    required: true,
  },
});

const { closeModal } = useModal();
const authComp = useAuth();
const firebase = useFirebase();

const modalStore = useModalStore();

const deleteAccount = (uid) => {
  if(!uid) return;

  hideModal('userInfoModal')
  let info = "Confirm delete, this action is irreversible?";
  modalStore.changeDialog(info);
  let func = {};
  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    try {
      await authComp.deleteUserById(uid);

      // reload page after delete
      window.location.reload();
   
    } catch (error) {
      throw error; 
    }
  };
  modalStore.OpenYesOrNOClick(func);
};

const showModalGen = (id) => {
  showModal(id);
};
const closeModalGen = (id) => {
  hideModal(id);
};

const userRecordExists = selectedEmployee && selectedEmployee.userProfile;
const userDataExists = selectedEmployee && selectedEmployee.value;

const logit = () => {
  console.log("logit", selectedEmployee.value);
};


const updateUserAccessRole = (userid, value) => {

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
  hideModal('UpdateUserRole')
};


const updateAccountStatus = (userid, value) => {

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
  hideModal('updateAccountStatusModal')
};




</script>
