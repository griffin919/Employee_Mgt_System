<template>
  <div class="flex flex-col h-screen">
    <div class="bg-white text-gray p-4 flex items-center justify-between rounded-lg">
      <EmployeesEmsheader />
    </div>
    <div class="bg-white flex-1 mt-4 p-4 rounded-lg">
              <div class="relative overflow-x-auto shadow-md rounded-lg p-2">
        <div
          class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
        >
          <div class="flex items-center text-base font-semibold ml-4">
            <p>Listings</p>
            <button @click="refreshlisting" class="flex items-baseline">
              <i class="ml-4 text-lg bx bx-revision"></i>
            </button>
          </div>
          <div class="w-4/12 p-2">
            <button
              id="AllfilterTrig"
              @click="showDrop()"
              class="bg-white border py-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-30svh overflow-y-auto"
              type="button"
            >
              {{ buttonText }}
            </button>
            <!-- Dropdown menu -->
            <div
              id="allListFilter"
              class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700"
            >
              <div class="p-3">
                <label for="input-group-search" class="sr-only">Search</label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="input-group-search"
                    class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search listing"
                    v-model="searchQuery"
                  />
                </div>
              </div>
              <ul
                class="h-40 px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                aria-labelledby="dropdownSearchButton"
              >
                <li v-for="listing in filteredListings" :key="listing.job_id">
                  <div
                    @click.prevent="openListing(listing.job_id)"
                    class="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                  >
                    {{ listing.job_title }}
                  </div>
                </li>
              </ul>
              <a
                href="#"
                class="flex items-center p-3 text-xs font-medium text-bg-[#044013] border-t border-gray-200 rounded-b-lg bg-gray-50"
              >
                <img src="/assets/logo.png" class="h-4 mx-4" alt="Ciraq Logo" />
                Powered by ciraq inc
              </a>
            </div>
          </div>
        </div>
        <div class="overflow-y-auto h-[68svh]">
          <div v-if="getIsLoading">
            <LoadScreen />
          </div>
          <div v-else>
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="sticky top-0 bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3">Name</th>
                  <th scope="col" class="px-6 py-3">Applicants</th>
                  <th scope="col" class="px-6 py-3">Status</th>
                  <th scope="col" class="px-6 py-3">Deadline</th>
                  <th scope="col" class="px-6 py-3">Manage</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="bg-white border-b hover:bg-gray-50"
                  v-for="listing in getListings"
                  :key="listing.id"
                >
                  <th
                    scope="row"
                    class="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap"
                  >
                    <div class="text-base font-semibold">
                      {{ listing.job_title }}
                    </div>
                  </th>
                  <td class="px-6 py-1">{{ listing.num_applicants }}</td>
                  <td class="px-6 py-1">{{ listing.listing_status }}</td>
                  <td class="px-6 py-1">
                    {{ formatDate(listing.application_deadline) }}
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
</div>
    </div>
  </div>
</template>
<script setup>
import { useFormatDate } from "@/composables/useFormatDate";
const { formatDate } = useFormatDate();

useHead({
  title: "Dashboard",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  // middleware: ["unauthemp"],
  layout: "userlayout",
});

</script>