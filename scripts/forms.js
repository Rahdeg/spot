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

  function saveProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
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

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("hidden");
}
