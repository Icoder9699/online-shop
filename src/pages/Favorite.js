import React from 'react'
import { AppContext } from '../App'
import Card from '../components/Card/Card'

export default function Favorite({addToFav}) {
    const {favItems, onAddHandler} = React.useContext(AppContext);

    return (
        <div className="content p-50">
            <div className="content__title d-flex align-center justify-between pb-50" >
                <h2 className="title">
                    Мои закладки
                </h2>
            </div>
            <div className="content__row d-flex justify-center">
                {favItems.length > 0 ?
                    favItems.map(item => (
                        <Card
                            addToFav={addToFav}
                            added={onAddHandler}
                            favorite={true} 
                            key={item.id}
                            fav={false}
                            {...item}
                        />
                    ))
                    : <div className="text-center">
                        <img src='./images/empty-cart.jpg' alt="empty"/>
                        <h3>Закладок нет :(</h3>
                        <p style={{color: '#ccc'}}>Вы ничего не добавляли в закладки</p>
                        <button className="order mt-10">Вернуться назад</button>
                    </div>
                }
            </div>
        </div>
    )
}
