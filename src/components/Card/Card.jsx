import React from 'react'
import classes from './Card.module.scss'

export default function Card({title, imgUrl, price, id, addToCart, addToFav, favorite, added}) {
    const [isFav, setFav] = React.useState(favorite);
    
    const onAddToCart = () => {
        addToCart({imgUrl, title, price, id});
        added();
    }
    
    const onAddToFav = () => {
        addToFav({imgUrl, title, price, id})
        setFav(true)
    }
    
    return (
        <div className={classes.card}>
            <img 
                onClick={() => onAddToFav()} 
                className={classes.favorite} 
                src={isFav ? './images/favorite.png' : './images/unliked.svg' }
                alt="fav" 
            />
            <img width="100%" height={112} src={imgUrl} alt="keda" />
            <h3>{title}</h3>
            <div className="d-flex align-center justify-between">
                <div className={classes.cardInfo}>
                    <span>Цена:</span>
                    <br/>
                    <b>
                    {price} руб.
                    </b>
                </div>
                <img 
                    src={added(id) ? "./images/btn-checked.svg" : "./images/btn-plus.svg" }
                    alt="plus"
                    onClick={() => onAddToCart()}
                />
            </div>
        </div>
    )
}
