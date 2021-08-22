import React from 'react';
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";

function App() {
  const [visible, setVisibile] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favItems, setFavItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://61227cced446280017054894.mockapi.io/items')
      .then(res => res.json())
        .then(data => setItems(data))
  }, []);

  const addCartItemHandler = (item) => {
    setCartItems(
      [...cartItems, item]
    );
  }

  const removeItemHandler = (id) => {
    const filteredItems = cartItems.filter(item => item.id !== id);
    setCartItems(filteredItems);
  }

  // used Fetch to get post database 

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return response.json(); 
  }

  const addToFavHandler = async (item) => {
    await postData("https://61227cced446280017054894.mockapi.io/cart", item)
  }

  return (
    <div className="wrapper clear">
      <Header showDrawer={() => setVisibile(true)} />
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
        {visible && 
          <Drawer 
            cartItems={cartItems}
            hideDrawer={() => setVisibile(false)} 
            removeItem={removeItemHandler}
          />
        }
        <div className="content__row d-flex justify-between">
          {items &&
            items.filter(item => item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())) 
            .map(item => (
              <Card 
                key={item.id}
                fav={false}
                {...item}
                addToCart={addCartItemHandler}
                addToFav={addToFavHandler}
              />
            ))
            
          }
        
        </div>
      </div>
    </div>
  );
}

export default App;
