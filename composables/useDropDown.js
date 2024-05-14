
import { ref } from "vue"; // Import ref for reactive variables
import { Dropdown } from 'flowbite';

export default function useDropDown() {
  const showDropDown = (dropDownId, trigId) => {
    const defaultOptions = {
        placement: 'top',
        triggerType: 'click',
        offsetSkidding: 0,
        offsetDistance: 10,
    };
    const $dropElement = document.querySelector(`#${dropDownId}`);
    const $triggerEl  = document.querySelector(`#${trigId}`);
    if ($dropElement) {
      const dropDown = new Dropdown($dropElement, $triggerEl, defaultOptions);
      dropDown.show();
    }
  };

  const hideDropDown = (dropDownId) => {
    const $dropElement = document.querySelector(`#${dropDownId}`);
    if ($dropElement) {
      const dropDown = new Dropdown($dropElement);
      dropDown.hide();
    }
  };


  return {
    showDropDown,
    hideDropDown,
  };
}
         