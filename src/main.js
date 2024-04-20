"use strict";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { fetchImages } from './js/pixabay-api';
import { PER_PAGE } from './js/pixabay-api';
import { getGallery } from './js/render-functions.js';

const searchForm = document.querySelector('.js-search-form');
const input = document.querySelector('.search-input');
const galleryList = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader-wrapper');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage = 1;
let currentSearchValue = '';


searchForm.addEventListener('submit', handleSearch);

loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSearch(event) {
    event.preventDefault();
    galleryList.innerHTML = '';
    currentPage = 1;
    currentSearchValue = input.value.trim();

    loadMoreBtn.classList.add('is-hidden');

    if (currentSearchValue === '') {
        errorMessage(`Please fill out the input field!`);
        return;
    }

    loader.classList.remove('is-hidden');

    try {
        const data = await fetchImages(currentSearchValue, currentPage);
        
        if (data.hits.length === 0) {
            errorMessage(`Sorry, there are no images matching your search query. Please try again!`);
            return;
        }

        getGallery(galleryList, data.hits);
        showLoadMoreBtn(data.totalHits);
    } catch (error) {
        console.error(error);
    } finally {
        loader.classList.add('is-hidden');
        searchForm.reset();
    }
}

async function loadMoreImages() {
    currentPage +=1;

    loader.classList.remove('is-hidden');

    try {
        const data = await fetchImages(currentSearchValue, currentPage);

        // Перевірка на випадок пустої відповіді від API
        
        if (data.hits.length === 0) {
            loadMoreBtn.classList.add('is-hidden');
            errorMessage(`We're sorry, but you've reached the end of search results.`);
            return;
        }

        getGallery(galleryList, data.hits);
        smoothScrollByGalleryHeight();

        const totalPages = Math.ceil(data.totalHits / PER_PAGE);
        if (currentPage >= totalPages) {
            loadMoreBtn.classList.add('is-hidden');
            iziToast.info({
                ...iziToastParam,
                message: `We're sorry, but you've reached the end of search results.`,
            });
        }
    } catch (error) {
        console.error(error);
    } finally {
        loader.classList.add('is-hidden');
    }
}

function showLoadMoreBtn(totalHits) {
    if (totalHits > PER_PAGE) {
        loadMoreBtn.classList.remove('is-hidden');
    }
}

function smoothScrollByGalleryHeight() {
    const galleryHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
    window.scrollBy({
        top: galleryHeight * 2,
        behavior: 'smooth',
    })
}

const iziToastParam = {
    title: '',
    position: 'topRight',
    backgroundColor: '#ef4040',
    messageColor: '#fff',
    titleColor: '#fff',
    timeout: 3000,
    pauseOnHover: false,
}

function errorMessage(message) {
    iziToast.error({
        ...iziToastParam,
        message: `${message}`,
    })
}

