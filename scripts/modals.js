export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("hidden");
  initializeModals();
  modal.dispatchEvent(new Event("show"));
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("hidden");
}

function loadProfile() {
  const storedProfile = localStorage.getItem("profile");
  return storedProfile
    ? JSON.parse(storedProfile)
    : {
        name: "Bessie Coleman",
        occupation: "Civil Aviator",
        bio: "Bessie Coleman was the first African American",
        image: "./assets/image 2.svg",
      };
}

function initializeModals() {
  // ...

  const editProfileModal = document.getElementById("editProfileModal");
  editProfileModal.addEventListener("show", () => {
    const currentProfile = loadProfile();
    const nameInput = document.getElementById("editName");
    const occupationInput = document.getElementById("editOccupation");
    const bioInput = document.getElementById("editBio");
    const imagePreview = document.getElementById("imagePreview");

    nameInput.value = currentProfile.name;
    occupationInput.value = currentProfile.occupation;
    bioInput.value = currentProfile.bioValue;
    imagePreview.src = currentProfile.image;
    imagePreview.classList.remove("hidden");
    nameInput.focus();
  });

  // ...
}

export function openImagePreviewModal(cardData) {
  const modal = document.getElementById("preview-modal");
  const previewImage = document.getElementById("preview-image");
  const previewTitle = document.getElementById("preview-title");

  previewImage.src = cardData.image;
  previewTitle.textContent = cardData.title;

  modal.classList.remove("hidden");
  // Small delay to allow transition
  setTimeout(() => modal.classList.add("show"), 10);

  // Optional: close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeImagePreviewModal();
  });

  // Optional: ESC key to close
  document.addEventListener("keydown", handleEscKey);
}

export function closeImagePreviewModal() {
  const modal = document.getElementById("preview-modal");
  modal.classList.remove("show");
  setTimeout(() => modal.classList.add("hidden"), 300);
  document.removeEventListener("keydown", handleEscKey);
}

function handleEscKey(e) {
  if (e.key === "Escape") {
    closeImagePreviewModal();
  }
}

// Hook up close button
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("close-preview-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeImagePreviewModal);
  }
});
