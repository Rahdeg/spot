// index.js
import { renderCards } from "./cards.js";
import {
  handleEditProfileSubmit,
  handleNewPostSubmit,
  updateProfileDisplay,
} from "./forms.js";
import { openModal } from "./modals.js";

function initializeModals() {
  // Edit Profile Modal
  const editProfileButton = document.querySelector(".edit span");
  editProfileButton.addEventListener("click", () => {
    openModal("editProfileModal");
  });

  // New Post Modal
  const newPostButton = document.querySelector(".new-post-btn button");
  newPostButton.addEventListener("click", () => {
    openModal("modalBackdrop");
  });

  const newPostForm = document.getElementById("uploadForm");
  newPostForm.addEventListener("submit", handleNewPostSubmit);

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

function initializeApp() {
  renderCards();
  updateProfileDisplay();
  initializeModals();
}

document.addEventListener("DOMContentLoaded", initializeApp);
