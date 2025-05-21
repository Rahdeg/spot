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

const newCards = [
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

let newCardIndex = 0;

const handleNewPostClick = () => {
  if (newCardIndex >= newCards.length) {
    alert("No more new posts to add!");
    return;
  }

  const card = newCards[newCardIndex];
  const gallery = document.querySelector(".gallery-one-section");

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = `
    <div class="grid-one-item">
      <img
        class="image-one-section"
        src="${card.image}"
        alt="${card.title}"
      />
      <div class="caption">
        <div>${card.title}</div>
        <div><img src="${card.icon}" alt="${card.iconName}" /></div>
      </div>
    </div>
  `;

  gallery.insertAdjacentElement("beforeend", tempDiv);
  alert("A new image has been added!!");

  newCardIndex++; // move to next card for the next click
};

const newPostBtn = document.querySelector(".new-post-btn");
newPostBtn.addEventListener("click", handleNewPostClick);
