<template>
  <div>
    <div class="mb-4 flex items-center justify-center">
      <div class="relative">
        <img
          v-if="previewImageUrl"
          :src="previewImageUrl"
          class="w-32 h-32 rounded-full object-cover"
          alt="Preview Image"
        />
        <div
          v-else
          class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center"
        >
          <svg
            class="text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            style="width: 2rem; height: 2rem"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
        <label
          for="profileImage"
          class="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </label>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleProfileImageUpload"
        />
      </div>
    </div>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded-md"
      @click="updateProfileImage"
      :disabled="!previewImageUrl"
    >
      Update Profile Image
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useFirebase from "@/composables/useFirebase";

const { updateProfile, uploadImage } = useAuth();
const firebase = useFirebase();
const previewImageUrl = ref(null);
const imageFile = ref(null);

const authStore = useAuthStore();

const handleProfileImageUpload = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    previewImageUrl.value = URL.createObjectURL(file);
    imageFile.value = file;
  } else {
    previewImageUrl.value = null;
    imageFile.value = null;
  }
};

const updateProfileImage = async () => {
  try {
    if (!imageFile.value) {
      alert("Please upload an image");
      return;
    }

    const imageUrl = await firebase.uploadImage(imageFile.value);

    //   await firebase.updateProfile({ photoURL: imageUrl })
    await firebase.updateProfile(firebase.auth.currentUser, {
      photoURL: imageUrl,
    });
    alert("Profile image updated successfully");
    firestore.getUserClaims();
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("An error occurred while updating the profile.");
  }
};
</script>
