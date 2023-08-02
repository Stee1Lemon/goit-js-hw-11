import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import axios from 'axios';
import { fetchImagesByName } from './pixabay-api';

const refs = {
  searchFormEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
};

refs.searchFormEl.addEventListener('submit', findImagesByName);

const lightbox = new SimpleLightbox('.gallery a');

function findImagesByName(event) {
  event.preventDefault();
  const name = event.currentTarget.searchQuery.value;
  fetchImagesByName(name).then(response => {
    if (response.data.hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    renderImages(response.data.hits);
  });
}

function renderImages(images) {
  const markup = images
    .map(image => {
      return `
    <div class="photo-card">
        <a href ="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
            <p class="info-item">
                <b>Likes</b> ${image.likes}
            </p>
            <p class="info-item">
                <b>Views</b> ${image.views}
            </p>
            <p class="info-item">
                <b>Comments</b> ${image.comments}
            </p>
            <p class="info-item">
                <b>Downloads</b> ${image.downloads}
            </p>
        </div>
    </div>`;
    })
    .join('');

  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
