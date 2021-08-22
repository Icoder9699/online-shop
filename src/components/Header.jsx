import React from 'react'

export default function Header({showDrawer}) {
    return (
        <header className="header d-flex justify-between">
            <div className="header__logo d-flex align-center">
                <img width={40} heigth={40} src='./images/logo.png' alt="logo" />
                <div className="header__info ml-10">
                    <h2>REACT SNEAKERS</h2>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="header__icons d-flex align-center">
                <li 
                    className="header__icon d-flex align-center"
                    onClick={showDrawer}
                >
                    <img 
                        height={15} 
                        width={15} 
                        className="mr-10" 
                        src="./images/cart.svg" 
                        alt="cart"
                    />
                    <b>1205 руб.</b>
                </li>
                <li className="header__icon">
                    <img height={15} width={15} src="./images/heartt.svg" alt="cart"/>
                </li>
                <li className="header__icon">
                    <img height={15} width={15} src="./images/person.svg" alt="cart"/>
                </li>
            </ul>
      </header>
    )
}
