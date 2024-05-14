<template>
    <div
  
>
      <h1 class="text-2xl font-bold mb-6">Employee Profile Management</h1>
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center mb-6">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile Picture"
            class="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h2 class="text-xl font-semibold">{{ employee.name }}</h2>
            <p class="text-gray-600">{{ employee.role }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">First Name</label>
            <input
              type="text"
              v-model="employee.firstName"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Last Name</label>
            <input
              type="text"
              v-model="employee.lastName"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <input
              type="text"
              v-model="employee.phoneNumber"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Email Address</label>
            <input
              type="email"
              v-model="employee.email"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Address</label>
            <input
              type="text"
              v-model="employee.address"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Region</label>
            <input
              type="text"
              v-model="employee.region"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">ID Type</label>
            <input
              type="text"
              v-model="employee.idType"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">ID Number</label>
            <input
              type="text"
              v-model="employee.idNumber"
              class="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
        <div class="flex items-center justify-between mt-6">
          <div>
            <span class="text-gray-700 font-semibold mr-4">Account Status:</span>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2"
            >
              Active
            </button>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Deactivate
            </button>
          </div>
          <div>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4"
            >
              Confirm Delete
            </button>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Update User Info
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        employee: {
          name: 'Raymond Oppong Asare',
          role: 'Accountant',
          firstName: 'Raymond',
          lastName: 'Oppong Asare',
          phoneNumber: '050 001 8533',
          email: 'rayopps@gmail.com',
          address: '12 la bawaleshi',
          region: 'Accra',
          idType: 'Ghana card',
          idNumber: 'GHA28839182732283-7',
        },
      };
    },
  };
  </script>