import React from 'react'
import { AppContext } from '../App'
import Card from '../components/Card/Card'

export default function Home({ addCartItemHandler, addToFavHandler, searchValue, setSearchValue}) {

    const {items, onAddHandler} = React.useContext(AppContext);

    return (
        <div className="content p-50">
            <div className="content__title d-flex align-center justify-between pb-50" >
            <h2 className="title">
            {searchValue 
                ? `Поиск по запросу: "${searchValue}"` 
                : "Все кроссовки"
            }
            </h2>
            <div className="search d-flex align-center">
                <img src="./images/search.svg" alt="search"/>
                <input 
                    placeholder="search..." 
                    type='text' 
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
        </div>
        <div className="content__row d-flex">
        {items &&
            items.filter(item => item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())) 
            .map(item => (
                <Card 
                    key={item.id}
                    {...item}
                    addToCart={addCartItemHandler}
                    addToFav={addToFavHandler}
                    fav={false}
                    added={onAddHandler}
                />
            ))
        }
        </div>
        </div>
    )
}
