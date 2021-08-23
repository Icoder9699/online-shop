import React from 'react'
import classes from './Drawer.module.scss';
import { useCart } from '../../hooks/useCart';

export default function Drawer({hideDrawer, removeItem, setCartItems, visible}) {
    const [isOrdered, setIsOrdered] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const {cartItems, totalPrice} = useCart();

    const orderProductHandler = () => {
        setLoading(true)
        setIsOrdered(false)
        const timeout = window.setTimeout(() => {
            setIsOrdered(true);
            clearTimeout(timeout)
            setLoading(false)
            setCartItems([])
        }, 1000)
    }

    return (
        <div className={`${classes.overlay} ${visible ? classes.overlayVisible : ""}`}>
            <div className={classes.drawer}>
                <h2 
                    сlassName="d-flex justify-between align-center"
                    onClick={() => hideDrawer()}
                >
                <span>Корзина</span>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#F2F2F2"/>
                        <path d="M20.6653 15.1312H17.2021V11.6682C17.2021 10.3328 15.1311 10.3328 15.1311 11.6682V15.1312H11.668C10.3329 15.1312 10.3329 17.2022 11.668 17.2022H15.1311V20.6652C15.1311 22.0005 17.2021 22.0005 17.2021 20.6652V17.2022H20.6653C22.0005 17.2022 22.0005 15.1312 20.6653 15.1312Z" fill="#D3D3D3"/>
                    </svg>
                </h2>

            {/* если пустая корзина */}
            { !cartItems.length > 0 
                ?
                <div className={classes.drawerEmpty}>
                    <img src={!isOrdered ? "./images/empty.png" : "./images/complete-order.jpg"} alt="empty"/>
                    <h3>{!isOrdered ? "Корзина пустая" : "Заказ оформлен!"}</h3>
                    <p>{!isOrdered ? "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." : "Ваш заказ #18 скоро будет передан курьерской доставке"}</p>
                    <button className="order" onClick={() => hideDrawer()}>Вернуться назад</button>
                </div>
                :
                <div className={classes.drawerOrder}>
                    <div className={classes.flex}>
                       {cartItems && 
                            cartItems.map((item => (
                                <div 
                                    className={`${classes.drawerItem} drawer__item d-flex align-center justify-between`}
                                    key={item.id}
                                >
                                    <img width={70} height={70} src={item.imgUrl} alt='ked'/>
                                    <div className="drawer__item-info ml-15">
                                        <p>{item.title}</p>
                                        <b>{item.price} руб.</b>
                                    </div>
                                    <svg onClick={() => removeItem(item.id)} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#F2F2F2"/>
                                        <path d="M20.6653 15.1312H17.2021V11.6682C17.2021 10.3328 15.1311 10.3328 15.1311 11.6682V15.1312H11.668C10.3329 15.1312 10.3329 17.2022 11.668 17.2022H15.1311V20.6652C15.1311 22.0005 17.2021 22.0005 17.2021 20.6652V17.2022H20.6653C22.0005 17.2022 22.0005 15.1312 20.6653 15.1312Z" fill="#D3D3D3"/>
                                    </svg>
                                </div>
                            )))
                       }
                    </div>
                    <div className={classes.drawerInfo}>
                        <ul>
                            <li className="d-flex justify-between">
                                    <span>Итоги:</span>
                                    <div></div>
                                    <b>{totalPrice} руб. </b>
                                </li>
                                <li className="d-flex justify-between">
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{totalPrice / 100 * 5} руб.</b>
                                </li>
                        </ul>
                        <button 
                            onClick={() => orderProductHandler()}
                            className="order mt-20">{!isLoading ? "Оформить заказ" : "Оформляем заказ..."}
                        </button>
                    </div>
                </div>
            }
            </div>
        </div>
    )
}
