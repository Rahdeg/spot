// index.js
import { handleEditProfileSubmit, updateProfileDisplay } from "./forms.js";
import { openModal } from "./modals.js";
import { loadCards } from "./script.js";

function initializeModals() {
  // Edit Profile Modal
  const editProfileButton = document.querySelector(".edit span");
  editProfileButton.addEventListener("click", () => {
    openModal("editProfileModal");
  });

  // Close modals on Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll(".modal").forEach((modal) => {
        modal.classList.add("hidden");
      });
    }
  });

  // Close modals on outside click
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.add("hidden");
      }
    });
  });

  const editProfileForm = document.getElementById("editProfileForm");
  editProfileForm.addEventListener("submit", handleEditProfileSubmit);

  // Image upload preview
  const imageUploadInput = document.getElementById("imageUpload");
  const imagePreview = document.getElementById("imagePreview");

  imageUploadInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        imagePreview.src = reader.result;
        imagePreview.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.classList.add("hidden");
      imagePreview.src = "";
    }
  });
}

function initializeApp() {
  updateProfileDisplay();
  loadCards();
  initializeModals();
}

document.addEventListener("DOMContentLoaded", initializeApp);
