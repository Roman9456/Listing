import { Listing, Item } from './components/Listing';
import * as items from './data/etsy.json';

function App() {
  // const parsedItems = items.default.filter(el => el.state === 'active');
  const parsedItems = items.default;
  return (
    <div className='item-list'>
      {parsedItems.map(el => 
        <Listing key={el.listing_id} item={new Item(el)} />
      )}
      
    </div>
  )
}

export default App
