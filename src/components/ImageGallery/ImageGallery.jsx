// import { Component } from 'react';
// import Searchbar from 'components/Searchbar/Searchbar';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { getImages } from 'Api/api';
// import { Button } from 'components/Button/Button';
// import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  //   state = {};
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </ul>
  );
};
