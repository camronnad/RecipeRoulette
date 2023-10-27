import React from 'react';
import '../styles/PhotoDetailsModal.scss';
import closeSymbol from '../assets/closeSymbol.svg';
import PhotoFavButton from 'components/PhotoFavButton';
import PhotoList from 'components/PhotoList';
const PhotoDetailsModal = (props) => {

  const handleClick = () => {
    props.handleClick();
  };

  let similarImages = [];
  for (let photoItem in props.selectedPhoto.similar_photos) {
    similarImages.push(props.selectedPhoto.similar_photos[photoItem].urls.regular);

  }

  return (
    <div className="photo-details-modal">
      <img className="photo-details-modal__close-button" src={closeSymbol} alt="close symbol" onClick={handleClick} />
      <div className='photo-details-modal__images'>

        <PhotoFavButton toggleFav={props.toggleFav} favourites={props.favourites} id={props.selectedPhoto.id} />
        <img className="photo-details-modal__image" src={props.selectedPhoto.urls.full} />
        <div className='photo-details-modal__header'>
          <h3>Similar Photos</h3>
        </div>
        <div className='photo-details-modal__images'>
          <PhotoList photos={props.selectedPhoto.similar_photos} toggleFav={props.toggleFav} favourites={props.favourites} />
        </div>
      </div>
    </div>

  );


};

export default PhotoDetailsModal;
