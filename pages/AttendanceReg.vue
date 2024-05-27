<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">
          Attendance
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2" for="email">
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              v-model="formData.email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2" for="password">
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              v-model="formData.password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div class="flex justify-between items-center">
            <button
              @click.prevent="signInUser('clockIn')"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
              type="button"
            >
              Clock In
            </button>
            <button
              @click.prevent="signInUser('clockOut')"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
              type="button"
            >
              Clock Out
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { initializeApp } from 'firebase/app';
  import { getDatabase, ref as rtref, update } from "firebase/database";
  import {
    getAuth,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import validator from 'validator';
  import validate from 'validate.js';
  import { useFormatDate } from "@/composables/useFormatDate";
  import { ref } from "vue";
  
  const firebaseConfig = {
    apiKey: "AIzaSyBs1h8eoXvh-zlXLGpcPcmhuWBKB4cB8Fw",
    authDomain: "regent-ems-fbdb.firebaseapp.com",
    projectId: "regent-ems-fbdb",
    storageBucket: "regent-ems-fbdb.appspot.com",
    messagingSenderId: "934240113327",
    appId: "1:934240113327:web:e8366bc770eb46f151ba5a",
    measurementId: "G-P773FHDS9J",
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth(app);
  
  const { formatDate } = useFormatDate();
  
  const formData = ref({
    email: "",
    password: "",
  });
  

  // sign in and log attendance
  const signInUser = async (logType) => {
    console.log("🚀 ~ signInUser ~ logType:", logType)
    const { email, password } = formData.value;
    console.log("🚀 ~ signInUser ~ email, password:", email, password)
  
    // Validate email and password
    const constraints = {
      email: {
        presence: true,
        email: true,
      },
      password: {
        presence: true,
        length: {
          minimum: 6,
          message: "must be at least 6 characters",
        },
      },
      logType: {
        presence: true,
      },
    };
  
    const data = {
      logType: logType,
      email: email,
      password: password,
    };
  
    const errors = validate(data, constraints);
  
    if (errors) {
      console.error("Please enter a valid email and password", errors);
      return;
    }
    
    // Sanitize email and password
    const sanitizedData = {
      email: validator.escape(email),
      password: validator.escape(password),
      logType: validator.escape(logType),
    };
    console.log("🚀 ~ signInUser ~ sanitizedData:", sanitizedData)
    
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            sanitizedData.email,
            sanitizedData.password
        );
        console.log("🚀 ~ signInUser ~ userCredential:", userCredential)
  
      // Clock in or out
      logAttendance(sanitizedData.logType);
    } catch (error) {
      const errorMessage = error.message;
      console.error(errorMessage);
    }
  };
  
  const logAttendance = (logType) => {
    console.log("🚀 ~ logAttendance ~ logType:", logType)
    const user = auth.currentUser;
    console.log("🚀 ~ logAttendance ~ user:", user)
  
    // Sanitize data
    const data = {
      time: new Date().toISOString(),
      userId: user.uid,
      user: user.displayName,
      logType: logType,
    };
  
  
    update(rtref(db, "attendance/" + user.uid + "/" + Date.now()), {
      ...data
    })
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response)
        // Set user role and status
        alert("Attendance logged successfully");
        console.log("Attendance logged successfully");
        auth.signOut();
      })
      .catch((error) => {
        console.error("Error logging attendance:", error);
        console.error("An error occurred");
        alert("An error occurred while logging attendance");
      });
  };
  </script>