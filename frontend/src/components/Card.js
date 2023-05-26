import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Card({ id, ...props }) {
console.log(props.data)
  const context = React.useContext(CurrentUserContext);
  
  const isLiked = true
 // const isLiked = props.data.likes.some(i => i === context._id);

  const owner = props.data.owner === context._id;

  const handleClickDelete = () => {
    props.deleteCard(props.data._id)
  };
  const handleClickCard = () => {
    props.onClickCard(props.data);
  };
  const handleLikeClick = () => {
    props.onCardLike(props.data, props.data._id);
  };
  return (
    <article className="element" lang="en ru" id={props.data_id}>
      <img className="element__photo" id="photo"
        src={props.data.link} onClick={handleClickCard}
        alt={props.data.alt} />
      {owner && <button className="element__delete-button" type="button"
        id="deletePhoto" onClick={handleClickDelete}></button>}
      <div className="element__text-zone">
        <h2 className="element__title">{props.data.name}</h2>
      </div>
      {props.data.likes &&<button className={isLiked ? "element__like element__like_active" : "element__like"} type="button" name="like" onClick={handleLikeClick}></button>}
    {props.data.likes && <span className="element__number-likes">{props.data.likes.length}</span>}
    </article>
  );
}
//
