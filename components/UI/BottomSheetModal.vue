<template>
  <div class="bottom-sheet" :ref="bottomSheetRef">
    <div class="sheet-overlay" @click="hideBottomSheet"></div>
    <div class="content" :ref="sheetContentRef">
      <div class="header">
        <div class="drag-icon" @mousedown="dragStart" @touchstart="dragStart">
          <span></span>
        </div>
      </div>
      <div class="body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import useBottomSheetModal from '@/composables/useBottomSheetModal';

export default defineComponent({
  setup() {
    const {
      bottomSheetRef,
      sheetContentRef,
      showBottomSheet,
      hideBottomSheet,
      dragStart,
      dragging,
      dragStop,
    } = useBottomSheetModal();

    return {
      bottomSheetRef,
      sheetContentRef,
      showBottomSheet,
      hideBottomSheet,
      dragStart,
      dragging,
      dragStop,
    };
  },
});
</script>


