// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { fetchImagesByName, fetchMoreImages } from './pixabay-api';

// const refs = {
//   searchFormEl: document.querySelector('#search-form'),
//   galleryEl: document.querySelector('.gallery'),
//   loadMoreBtnEl: document.querySelector('.load-more'),
//   footerEl: document.querySelector('.footer'),
// };

// refs.searchFormEl.addEventListener('submit', findImagesByName);
// refs.loadMoreBtnEl.addEventListener('click', showMoreImages);

// let pageCount = 1;
// let totalHits = 0;
// let hits = 0;

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
// });

// function findImagesByName(event) {
//   event.preventDefault();

//   const name = event.currentTarget.searchQuery.value.trim();
//   pageCount = 1;
//   totalHits = 0;
//   hits = 0;
//   refs.galleryEl.innerHTML = '';
//   refs.footerEl.classList.add('is-hidden');

//   if (name === '') {
//     return;
//   }

//   fetchImagesByName(name)
//     .then(response => {
//       if (response.data.hits.length === 0) {
//         return Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       }
//       totalHits = response.data.totalHits;
//       hits += response.data.hits.length;

//       if (totalHits > 40) {
//         refs.footerEl.classList.remove('is-hidden');
//       }

//       Notify.success(`Hooray! We found ${totalHits} images.`);
//       renderImages(response.data.hits);
//     })
//     .catch(error => console.log(error.message));
// }

// function renderImages(images) {
//   const markup = images
//     .map(image => {
//       return `
//     <div class="photo-card">
//         <div class="image-card"><a href ="${image.largeImageURL}">
//            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//         </a></div>
//         <div class="info">
//             <p class="info-item">
//                 <b>Likes</b> ${image.likes}
//             </p>
//             <p class="info-item">
//                 <b>Views</b> ${image.views}
//             </p>
//             <p class="info-item">
//                 <b>Comments</b> ${image.comments}
//             </p>
//             <p class="info-item">
//                 <b>Downloads</b> ${image.downloads}
//             </p>
//         </div>
//     </div>`;
//     })
//     .join('');

//   refs.galleryEl.insertAdjacentHTML('beforeend', markup);
//   lightbox.refresh();
// }

// function showMoreImages() {
//   pageCount += 1;
//   const name = refs.searchFormEl.searchQuery.value;
//   fetchMoreImages(name, pageCount)
//     .then(response => {
//       hits += response.data.hits.length;
//       renderImages(response.data.hits);
//       makeSmoothScroll();
//       if (hits >= totalHits) {
//         refs.footerEl.classList.add('is-hidden');
//         return Notify.info(
//           `We're sorry, but you've reached the end of search results.`
//         );
//       }
//     })
//     .catch(error => console.log(error.message));
// }

// function makeSmoothScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 1.7,
//     behavior: 'smooth',
//   });
// }
