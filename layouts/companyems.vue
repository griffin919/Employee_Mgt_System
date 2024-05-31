<template>
  <div>
    <Modals />
    <div :class="['sidebar', { open: isOpen }]">
      <div class="logo-details">
        <img
          src="../assets/RUCST_logo.jpg"
          class="icon w-10 h-10 rounded-full mr-4"
          alt="ciraq logo"
        />
        <div class="logo_name">Regent Admin</div>
        <button
          class="bx bx-menu mr-2"
          id="btn"
          @click="toggleSidebar"
        ></button>
      </div>
      <ul class="nav-list">
        <li>
          <nuxt-link to="/admin/Employees">
            <i class="bx bx-group"></i>
            <span class="links_name">Employees</span>
          </nuxt-link>
          <span class="tooltip">Employees</span>
        </li>
        <li>
          <nuxt-link to="/admin/timesheets">
            <i class="bx bx-time-five"></i>
            <span class="links_name">Timesheets</span>
          </nuxt-link>
          <span class="tooltip">Timesheets</span>
        </li>
        <li>
          <nuxt-link to="/admin/requests">
            <i class="bx bx-envelope-open"></i>
            <span class="links_name">Requests</span>
          </nuxt-link>
          <span class="tooltip">Requests</span>
        </li>
        <li>
          <nuxt-link to="/admin/newemployee">
            <i class="bx bx-user-plus"></i>
            <span class="links_name">New Employee</span>
          </nuxt-link>
          <span class="tooltip">New Employee</span>
        </li>
        <li>
          <nuxt-link to="/admin/profile">
            <i class="bx bx-user-circle"></i>
            <span class="links_name">Profile</span>
          </nuxt-link>
          <span class="tooltip">Profile</span>
        </li>

        <li class="profile" v-if="userInfo.userProfile">
          <div class="profile-details">
            <img :src="userInfo.userProfile.photoURL" alt="profileImg" />
            <div class="name_job">
              <div class="name">
                {{ userInfo.userProfile.displayName || "" }}
              </div>
              <div class="job"></div>
            </div>
          </div>
          <i @click="signOut" class="bx bx-log-out" id="log_out"></i>
        </li>
      </ul>
    </div>
    <section :class="['home-section', { open: isOpen }]">
      <div
        class="flex justify-between items-center w-full bg-white p-4 mb-2 rounded-lg"
      >
        <div class="flex items-center">
          <div class="mr-8">
            <img
              v-if="userInfo.userProfile"
              class="w-[5rem] h-[5rem] rounded-full"
              :src="userInfo.userProfile.photoURL"
              alt="Profile Image"
            />
          </div>
          <div v-if="userInfo.userData">
            <p class="text-xl font-bold">
              {{ userInfo.userData.fname || "" }}
              {{ userInfo.userData.lname || "" }}
            </p>
            <p class="text-sm text-gray-600">
              Department: {{ userInfo.userData.department }}
            </p>
            <p class="text-sm text-gray-600">
              Employee ID: {{ userInfo.userData.staffid }}
            </p>
          </div>
        </div>
        <div>
          <i @click="signOut" class="bx bx-log-out" id="log_out"></i>
        </div>
      </div>
      <slot />
    </section>
  </div>
</template>

<script setup>
import "boxicons/css/boxicons.min.css";
import Modals from "@/components/UI/Modals.vue";
import { useModalStore } from "@/stores/modalStore.js";
import { ref, onMounted } from "vue";
import useFirebase from "@/composables/useFirebase";

const modalStore = useModalStore();
const isOpen = ref(false);
const firebase = useFirebase();
const userInfo = ref("");

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  // get user data from local storage
  // check if data exists in local storage
  let usr = JSON.parse(localStorage.getItem("user"));
  if (usr) {
    userInfo.value = usr;
  }
});

const signOut = () => {
  let info = "Confirm signout?";
  modalStore.changeDialog(info);
  let func = {};
  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    try {
      // employerAuth.logout()
      await firebase.signOutUser();
    } catch (error) {
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  };

  modalStore.OpenYesOrNOClick(func);
};
</script>

<style>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 55px;
  background: #fff;
  padding: 10px;
  z-index: 5;
  transition: all 0.5s ease;
}
.sidebar.open {
  width: 250px;
}
.sidebar .logo-details {
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}
.sidebar .logo-details .icon {
  opacity: 0;
  transition: all 0.5s ease;
}
.sidebar .logo-details .logo_name {
  color: #132e35;
  font-size: 16px;
  font-weight: 600;
  opacity: 0;
  transition: all 0.5s ease;
}
.sidebar.open .logo-details .icon,
.sidebar.open .logo-details .logo_name {
  opacity: 1;
}
.sidebar .logo-details #btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}
.sidebar.open .logo-details #btn {
  text-align: right;
}
.sidebar i {
  color: #fff;
  padding-right: 1rem;
  padding-left: 0.6rem;
  line-height: 60px;
}
.sidebar .nav-list {
  margin-top: 20px;
  height: 100%;
}
.sidebar li {
  position: relative;
  margin: 8px 0;
  list-style: none;
  height: 35px;
}
.sidebar li .tooltip {
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 1;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: 0s;
}
.sidebar li:hover .tooltip {
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}
.sidebar.open li .tooltip {
  display: none;
}
.sidebar input {
  font-size: 15px;
  color: #fff;
  font-weight: 400;
  outline: none;
  height: 50px;
  width: 100%;
  width: 50px;
  border: none;
  border-radius: 12px;
  transition: all 0.5s ease;
  background: #132e35;
}
.sidebar.open input {
  padding: 0 20px 0 50px;
  width: 100%;
}

.sidebar li a {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  padding: 0;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: #11101d;
}
.sidebar li a:hover {
  background: #fff;
  border: 1px solid #132e35;
}
.sidebar li a .links_name {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}
.sidebar.open li a .links_name {
  opacity: 1;
  pointer-events: auto;
}
.sidebar li a:hover .links_name,
.sidebar li a:hover i {
  transition: all 0.5s ease;
  color: #132e35;
}
.sidebar li i {
  font-size: 14px;
  border-radius: 12px;
}
.sidebar li.profile {
  position: fixed;
  height: 60px;
  width: 55px;
  left: 0;
  bottom: -8px;
  padding: 10px;
  color: #132e35;
  transition: all 0.5s ease;
  overflow: hidden;
}
.sidebar.open li.profile {
  width: 250px;
}
.sidebar li .profile-details {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.sidebar li img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}
.sidebar li.profile .name,
.sidebar li.profile .job {
  font-size: 15px;
  font-weight: 400;
  color: #132e35;
  white-space: nowrap;
}
.sidebar li.profile .job {
  font-size: 12px;
}
.sidebar .profile #log_out {
  position: absolute;
  display: none;
  right: 0;
  transform: translateY(-50%);
  top: 50%;
  color: red;
  width: 100%;
  height: 60px;
  line-height: 60px;
  transition: all 0.5s ease;
}
.sidebar.open .profile #log_out {
  display: flex;
  width: 50px;
  background: none;
  color: red;
  font: 800;
  padding-left: 1rem;
  font-size: 24px;
  cursor: pointer;
}
.home-section {
  position: relative;
  padding: 1rem;
  background: #f7f7f7;
  min-height: 100vh;
  top: 0;
  left: 55px;
  width: calc(100% - 55px);
  transition: all 0.5s ease;
}
.sidebar.open ~ .home-section {
  left: 16rem;
  width: calc(100% - 16rem);
}
.home-section .text {
  display: inline-block;
  color: #132e35;
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
}
@media (max-width: 420px) {
  .sidebar li .tooltip {
    display: none;
  }
}

.nav-list .active {
  background-color: #fff;
}

/* Custom scrollbar styles */
/* For WebKit-based browsers (Chrome, Safari, Opera) */
::-webkit-scrollbar {
  width: 4px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: red;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: yellow;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* For Mozilla Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #f7f7f7 #f1f1f1;
}

/* For Internet Explorer and Edge */
body {
  scrollbar-face-color: #ebebeb;
  scrollbar-track-color: #f1f1f1;
}
</style>
