// cards.js

import { openImagePreviewModal } from "./modals.js";
import { loadCards, saveCards } from "./data.js";

export function createCard(cardData) {
  const card = document.createElement("div");
  card.classList.add("grid-one-item");

  const img = document.createElement("img");
  img.classList.add("image-one-section");
  img.src = cardData.image;
  img.alt = cardData.title;
  img.addEventListener("click", () => openImagePreviewModal(cardData));

  const caption = document.createElement("div");
  caption.classList.add("caption");

  const titleDiv = document.createElement("div");
  titleDiv.textContent = cardData.title;

  const heartDiv = document.createElement("div");
  const heartIcon = document.createElement("i");
  heartIcon.classList.add("fa-solid", "fa-heart");
  heartIcon.style.cursor = "pointer";
  heartIcon.style.color = cardData.liked ? "red" : "gray";
  heartIcon.addEventListener("click", () => toggleLike(cardData.id));
  heartDiv.appendChild(heartIcon);

  caption.appendChild(titleDiv);
  caption.appendChild(heartDiv);

  card.appendChild(img);
  card.appendChild(caption);

  return card;
}

export function renderCards() {
  const gallerySection = document.querySelector(".gallery-one-section");
  gallerySection.innerHTML = "";
  const cards = loadCards();
  cards.forEach((cardData) => {
    const card = createCard(cardData);
    gallerySection.appendChild(card);
  });
}

export function toggleLike(cardId) {
  const cards = loadCards();
  const card = cards.find((c) => c.id === cardId);
  if (card) {
    card.liked = !card.liked;
    saveCards(cards);
    renderCards();
  }
}
