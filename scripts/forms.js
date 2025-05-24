import {
  loadCards,
  loadProfile,
  saveCards,
  saveProfile,
} from "../scripts/data.js";
import { renderCards } from "../scripts/cards.js";
import { closeModal } from "../scripts/modals.js";

export function handleEditProfileSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById("editName");
  const occupationInput = document.getElementById("editOccupation");
  const bio = document.getElementById("editBio");
  const imageUploadInput = document.getElementById("imageUpload");
  const imagePreview = document.getElementById("imagePreview");
  const saveBtn = document.getElementById("save-btn");

  const name = nameInput.value.trim();
  const occupation = occupationInput.value.trim();
  const bioValue = bio.value.trim();
  const imageFile = imageUploadInput.files[0];

  // Enable or disable save button based on input values and image content
  const isValid =
    name.length >= 2 &&
    occupation.length >= 2 &&
    (imageFile || imagePreview.src);
  saveBtn.disabled = !isValid;

  if (name.length < 2 || occupation.length < 2) {
    alert("Name and occupation must be at least 2 characters.");
    return;
  }

  if (
    (imageFile && !imageFile.type.startsWith("image/")) ||
    (!imageFile && !imagePreview.src)
  ) {
    alert("Please provide a valid image file.");
    return;
  }

  const currentProfile = loadProfile();
  const newProfile = {
    name,
    occupation,
    bioValue,
    image: currentProfile.image || "",
  };

  const file = imageUploadInput.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      newProfile.image = reader.result;
      saveProfile(newProfile);
      updateProfileDisplay();
      closeModal("editProfileModal");
    };
    reader.readAsDataURL(file);
  } else {
    if (imagePreview && imagePreview.src) {
      newProfile.image = imagePreview.src;
    }
    saveProfile(newProfile);
    updateProfileDisplay();
    closeModal("editProfileModal");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const imageUpload = document.getElementById("imageUpload");
  const imagePreview = document.getElementById("imagePreview");
  const cancelBtn = document.getElementById("cancel-btn");

  if (imageUpload && imagePreview) {
    imageUpload.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          imagePreview.src = reader.result;
          imagePreview.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      document.getElementById("editProfileModal").classList.add("hidden");
    });
  }
});

export function updateProfileDisplay() {
  const profile = loadProfile();
  const nameElement = document.querySelector(".about h1");
  const occupationElement = document.querySelector(".about p");
  const bio = document.getElementById("profile-bio");
  const avatarImage = document.querySelector(".avatar img");

  if (nameElement) nameElement.textContent = profile.name || "";
  if (occupationElement)
    occupationElement.textContent = profile.occupation || "";
  if (bio) bio.textContent = profile.bioValue || "";
  if (profile.image && avatarImage) avatarImage.src = profile.image;
}

// Handle new post form submission (with image file support)
export function handleNewPostSubmit(event) {
  event.preventDefault();

  const titleInput = document.getElementById("imageName");
  const imageInput = document.getElementById("newPostImage");
  const title = titleInput.value.trim();
  const file = imageInput.files[0];

  // Enable or disable save button based on input values and image content

  if (!title || !file || !file.type.startsWith("image/")) {
    alert("Please provide a valid title and image file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const image = reader.result;

    const cards = loadCards();
    const newCard = {
      id: Date.now(),
      title,
      image,
      liked: false,
    };

    cards.unshift(newCard);
    saveCards(cards);
    renderCards();
    closeModal("modalBackdrop");

    event.target.reset();
    document.getElementById("newPostImagePreview").classList.add("hidden");
  };

  reader.readAsDataURL(file);
}

// Preview post image and cancel new post modal
document.addEventListener("DOMContentLoaded", () => {
  const newPostImageInput = document.getElementById("newPostImage");
  const newPostImagePreview = document.getElementById("newPostImagePreview");
  const cancelNewPostBtn = document.getElementById("newPostCancelBtn");

  if (newPostImageInput && newPostImagePreview) {
    newPostImageInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          newPostImagePreview.src = reader.result;
          newPostImagePreview.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (cancelNewPostBtn) {
    cancelNewPostBtn.addEventListener("click", () => {
      document.getElementById("modalBackdrop").classList.add("hidden");
    });
  }
});
