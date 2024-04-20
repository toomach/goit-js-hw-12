"use strict";

import axios from 'axios';

const API_KEY = "43236176-8efbdba212834d112cbf0fa21";
const BASE_URL = 'https://pixabay.com/api/?';
export const PER_PAGE = 15;

export async function fetchImages(searchValue, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: PER_PAGE,
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response.statusText);
  }
}

  

