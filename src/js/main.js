import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImagesByName, fetchMoreImages } from './pixabay-api';
// import InfiniteScroll from 'infinite-scroll';

const refs = {
  searchFormEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
};

refs.searchFormEl.addEventListener('submit', findImagesByName);
refs.loadMoreBtnEl.addEventListener('click', showMoreImages);

let pageCount = 1;

const lightbox = new SimpleLightbox('.gallery a');
function findImagesByName(event) {
  event.preventDefault();

  const name = event.currentTarget.searchQuery.value;
  pageCount = 1;
  refs.galleryEl.innerHTML = '';

  fetchImagesByName(name)
    .then(response => {
      if (response.data.hits.length === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      renderImages(response.data.hits);
    })
    .catch();
}

function renderImages(images) {
  const markup = images
    .map(image => {
      return `
    <div class="photo-card">
        <div class="image-card"><a href ="${image.largeImageURL}">
           <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a></div>
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

function showMoreImages() {
  pageCount += 1;
  const name = refs.searchFormEl.searchQuery.value;
  fetchMoreImages(name, pageCount)
    .then(response => {
      renderImages(response.data.hits);
    })
    .catch();
}

// function turnOnInfScroll() {
//   pageCount += 1;
//   const name = refs.searchFormEl.searchQuery.value;
//   console.log(name);
//   let infScroll = new InfiniteScroll(refs.galleryEl, {
//     path: fetchMoreImages(name, pageCount)
//       .then(response => {
//         renderImages(response.data.hits);
//         console.log('show more img');
//       })
//       .catch(),
//   });
// }
