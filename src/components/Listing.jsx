import PropTypes from 'prop-types';

export class Item {
  constructor({ title = 'Undefined title', url = '#', MainImage = { url_570xN: './src/img/undefined.jpg' }, currency_code = 'руб.', price = '0', quantity = 0 }) {
    // обработка названия
    this.title = title;
    if (title.length > 50) {
      this.title = title.substring(0, 50) + '...';
    }

    // обработка валюты
    this.currency_code = currency_code;
    if (currency_code === 'USD') {
      this.currency_code = '$';
    } else if (currency_code === 'EUR') {
      this.currency_code = '€';
    }

    // обработка количества
    this.quantity = quantity;
    this.quantityClass = 'item-quantity ';
    if (quantity <= 10) {
      this.quantityClass += 'level-low';
    } else if (quantity > 10 && quantity <= 20) {
      this.quantityClass += 'level-medium';
    } else if (quantity > 20) {
      this.quantityClass += 'level-high';
    }

    // обработка URL картинки
    this.url_570xN = MainImage.url_570xN;

    // остальное
    this.url = url;
    this.MainImage = MainImage;
    this.price = price;
  }
}

export function Listing({ item }) {
  console.log(item);
  return (
    <div className="item">
      <div className="item-image">
        <a href={item.url}>
          <img src={item.url_570xN}></img>
        </a>
      </div>
      <div className="item-details">
        <p className="item-title">{item.title}</p>

        {(item.currency_code !== 'USD' && item.currency_code !== 'EUR') ? (
          <p className="item-price">{item.price} {item.currency_code}</p>
        ) : (
          <p className="item-price">{item.currency_code} {item.price}</p>
        )}
        
        <p className={item.quantityClass}>{item.quantity} left</p>
      </div>
    </div>
  );
}

Listing.propTypes = {
  item: PropTypes.instanceOf(Item).isRequired,
};
