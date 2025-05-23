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
  });

  // ...
}
