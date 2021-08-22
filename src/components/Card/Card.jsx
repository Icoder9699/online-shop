import React from 'react'
import classes from './Card.module.scss'

export default function Card({title, imgUrl, price, id, fav, addToCart, addToFav}) {
    const [isAdded, setAdded] = React.useState(false)
    const [isFav, setFav] = React.useState(false);
    
    const onAddToCart = () => {
        addToCart({imgUrl, title, price, id});
        setAdded(true)
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
                    src={isAdded ? "./images/btn-checked.svg" : "./images/btn-plus.svg" }
                    alt="plus"
                    onClick={() => onAddToCart()}
                />
            </div>
        </div>
    )
}
