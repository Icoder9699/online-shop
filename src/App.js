import React from 'react';
import { Route } from 'react-router-dom';
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import axios from 'axios';


export const AppContext = React.createContext({});

function App() {
  const [visible, setVisibile] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favItems, setFavItems] = React.useState([]);

  React.useEffect(() => {
    async function fetchData(){
     try{
      const [itemsResponse, favResponse] = await Promise.all([
        axios.get('https://61227cced446280017054894.mockapi.io/items'),
        axios.get('https://61227cced446280017054894.mockapi.io/favorite')
      ]);
      setFavItems(favResponse.data);
      setItems(itemsResponse.data);
     }catch(e){
       alert("Что-то пошло не так :(")
       console.log(e);
     }
    }
    fetchData()
  }, []);

  const addCartItemHandler = (item) => {
    console.log(cartItems);
    setCartItems(
      [...cartItems, item]
    );
  }

  const onAddHandler = (id) => {
    return cartItems.some(item => Number(item.id) === Number(id))
  }

  const removeItemHandler = (id) => {
    const filteredItems = cartItems.filter(item => item.id !== id);
    setCartItems(filteredItems);
  }

  // used Fetch to get and post database 

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
    if(favItems.find(favItem => favItem.id === item.id)){
      setFavItems(favItems.filter(fav => Number(fav.id )!== Number(item.id)))
      fetch('https://61227cced446280017054894.mockapi.io/favorite/' + item.id, {
        method: 'DELETE'
      })
    }else{
        const data = await postData("https://61227cced446280017054894.mockapi.io/favorite", item)
        setFavItems([...favItems, data])
      }
    }

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      setCartItems,
      favItems,
      onAddHandler,
    }}>
      <div className="wrapper clear">
        <Header showDrawer={() => setVisibile(true)} />
          {visible && 
            <Drawer 
              visible={visible}
              cartItems={cartItems}
              hideDrawer={() => setVisibile(false)} 
              removeItem={removeItemHandler}
              setCartItems={setCartItems}
            />
          }
          <Route path="/" exact>
            <Home
              searchValue={searchValue}
              addToFavHandler={addToFavHandler}
              addCartItemHandler={addCartItemHandler}
              setSearchValue={setSearchValue}
            />
          </Route>
          <Route path="/favorite">
            <Favorite
              addToFav={addToFavHandler}
            />
          </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
