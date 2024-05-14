// useBottomSheetModal.js

export default function useBottomSheetModal() {
  const bottomSheetRef = ref(null);
  const sheetContentRef = ref(null);
  const isDragging = ref(false);
  let startY = null;
  let startHeight = null;

  const showBottomSheet = () => {
    bottomSheetRef.value.classList.add("show");
    document.body.style.overflowY = "hidden";
    updateSheetHeight(50);
  };

  const hideBottomSheet = () => {
    bottomSheetRef.value.classList.remove("show");
    document.body.style.overflowY = "auto";
  };

  const updateSheetHeight = (height) => {
    sheetContentRef.value.style.height = `${height}vh`;
    bottomSheetRef.value.classList.toggle("fullscreen", height === 100);
  };

  const dragStart = (e) => {
    isDragging.value = true;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContentRef.value.style.height);
    bottomSheetRef.value.classList.add("dragging");

    document.addEventListener("mousemove", dragging);
    document.addEventListener("touchmove", dragging);
    document.addEventListener("mouseup", dragStop);
    document.addEventListener("touchend", dragStop);
  };

  const dragging = (e) => {
    if (!isDragging.value) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    const newHeight = startHeight + (delta / window.innerHeight) * 100;
    updateSheetHeight(newHeight);
  };

  const dragStop = () => {
    isDragging.value = false;
    bottomSheetRef.value.classList.remove("dragging");
    const sheetHeight = parseInt(sheetContentRef.value.style.height);
    sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);

    document.removeEventListener("mousemove", dragging);
    document.removeEventListener("touchmove", dragging);
    document.removeEventListener("mouseup", dragStop);
    document.removeEventListener("touchend", dragStop);
  };

  return {
    bottomSheetRef,
    sheetContentRef,
    showBottomSheet,
    hideBottomSheet,
    dragStart,
    dragging,
    dragStop,
  };
}
