import React from 'react';
import { Card } from '../components/Card.js'
import iconEdit from '../images/edit-icon.svg';
import photoIcon from '../images/addPhoto-icon.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Main(props) {
    const context = React.useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="author">
                    <img className="author__avatar" src={context.avatar}
                        alt="Он живет на дне" />
                    <button className="author__avatar-button" onClick={props.onClickAvatar}></button>
                    <div className="author__info-zone">
                        <div className="author__title-zone">
                            <h1 className="author__name">{context.name}</h1>
                            <button type="button" onClick={props.onClickUserInfo}
                                className="author__edit"><img
                                    className="author__edit-icon"
                                    src={iconEdit}
                                    alt="изменить" />
                            </button>
                        </div>
                        <p className="author__work">{context.about}</p>
                    </div>

                </div>
                <button className="profile__add-photo" type="button"
                    onClick={props.onClickAddPhoto}><img
                        className="profile__add-photo-icon"
                        src={photoIcon}
                        alt="добавить фото" /></button>
            </section>
            <section className="elements">
                {props.cards.map(item => (
                    <Card
                        key={item._id}
                        onClickCard={props.onClickCard}
                        data={item}
                        deleteCard={props.deleteCard}
                        onCardLike={props.onClickLike}
                    />))}
            </section>
        </main>
    )
};
