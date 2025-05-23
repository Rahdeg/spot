const cards = [
  {
    id: 1,
    image: "./assets/pexels-kassandre-pedro-8639743-1-(1).png",
    title: "Val Thorens",
    icon: "./assets/Union.svg",
    iconName: "love-icon",
  },
  {
    id: 2,
    image: "./assets/pexels-kassandre-pedro-8639743-1-(1).svg",
    title: "Restaurant terrace",
    icon: "./assets/Union.svg",
    iconName: "love-icon",
  },
  {
    id: 3,
    image: "./assets/pexels-kassandre-pedro-8639743-1-(2).svg",
    title: "An outdoor cafe",
    icon: "./assets/Union.svg",
    iconName: "love-icon",
  },
  {
    id: 4,
    image: "./assets/pexels-kassandre-pedro-8639743-1-(3).svg",
    title: "A very long bridge, over the forest...",
    icon: "./assets/Union.svg",
    iconName: "love-icon",
  },
  {
    id: 5,
    image: "./assets/pexels-kassandre-pedro-8639743-1-(4).svg",
    title: "Tunnel with morning light",
    icon: "./assets/Union.svg",
    iconName: "love-icon",
  },
  {
    id: 6,
    image: "./assets/pexels-kassandre-pedro-8639743-1-(5).svg",
    title: "Mountain house",
    icon: "./assets/Union.svg",
    iconName: "love-icon",
  },
];

function loadCards() {
  const gallery = document.querySelector(".gallery-one-section");
  cards.map((card) => {
    const tempDiv = document.createElement("div"); // Create a new element
    tempDiv.innerHTML = `
            <div class="grid-one-item">
                <img
                class="image-one-section"
                src= ${card.image}
                alt= ${card.title}
                />
                <div class="caption">
                <div>${card.title}</div>
                <div><img src=${card.icon} alt=${card.iconName} /></div>
                </div>
            </div>
        `;
    gallery.insertAdjacentElement("beforeend", tempDiv);
  });
}
loadCards();

const imageName = document.getElementById("imageName");
const imageFile = document.getElementById("imageFile");

imageName.addEventListener("change", (e) => console.log(e.target.value));
imageFile.addEventListener("change", (e) => console.log(e.target.files[0]));

const modal = document.getElementById("modalBackdrop");

const handleHide = () => {
  modal.classList.remove("hidden"); // Show modal
};

const addImage = document.querySelector(".new-post-btn");
addImage.addEventListener("click", handleHide);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Handle form submission to add image to the gallery
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent actual form submission

  const name = imageName.value.trim();
  const file = imageFile.files[0];

  if (!name || !file) {
    alert("Please enter an image name and select a file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const gallery = document.querySelector(".gallery-one-section");
    const newCard = document.createElement("div");

    newCard.innerHTML = `
      <div class="grid-one-item">
        <img
         class="image-one-section"
         src="${event.target.result}"
         alt="${name}"
       />
        <div class="caption">
          <div>${name}</div>
          <div><img src="./assets/Union.svg" alt="love-icon" /></div>
        </div>
      </div>
    `;

    gallery.insertAdjacentElement("afterbegin", newCard);

    // Reset form and hide modal
    modal.classList.add("hidden");
    imageName.value = "";
    imageFile.value = "";
  };

  reader.readAsDataURL(file);
});
