import React from 'react';
import PropTypes from 'prop-types';

interface MainImage {
  url_570xN: string;
}

interface ItemProps {
  title?: string;
  url?: string;
  MainImage?: MainImage;
  currency_code?: string;
  price?: string;
  quantity?: number;
}

export class Item {
  title: string;
  url: string;
  MainImage: MainImage;
  currency_code: string;
  price: string;
  quantity: number;
  quantityClass: string;
  url_570xN: string;

  constructor({
    title = 'Undefined title',
    url = '#',
    MainImage = { url_570xN: './src/img/undefined.jpg' },
    currency_code = 'rub.',
    price = '0',
    quantity = 0,
  }: ItemProps) {
    // Handle title
    this.title = title.length > 50 ? `${title.substring(0, 50)}...` : title;

    // Handle currency
    this.currency_code = currency_code;
    if (currency_code === 'USD') {
      this.currency_code = '$';
    } else if (currency_code === 'EUR') {
      this.currency_code = '€';
    }

    // Handle quantity
    this.quantity = quantity;
    this.quantityClass = 'item-quantity ';
    if (quantity <= 10) {
      this.quantityClass += 'level-low';
    } else if (quantity > 10 && quantity <= 20) {
      this.quantityClass += 'level-medium';
    } else if (quantity > 20) {
      this.quantityClass += 'level-high';
    }

    // Handle image URL
    this.url_570xN = MainImage.url_570xN;

    // Other properties
    this.url = url;
    this.MainImage = MainImage;
    this.price = price;
  }
}

interface ListingProps {
  item: Item;
}

export const Listing: React.FC<ListingProps> = ({ item }) => {
  console.log(item);
  return (
    <div className="item">
      <div className="item-image">
        <a href={item.url}>
          <img src={item.url_570xN} alt={item.title} />
        </a>
      </div>
      <div className="item-details">
        <p className="item-title">{item.title}</p>
        {item.currency_code !== 'USD' && item.currency_code !== 'EUR' ? (
          <p className="item-price">{item.price} {item.currency_code}</p>
        ) : (
          <p className="item-price">{item.currency_code} {item.price}</p>
        )}
        <p className={item.quantityClass}>{item.quantity} left</p>
      </div>
    </div>
  );
};

Listing.propTypes = {
  item: PropTypes.instanceOf(Item).isRequired,
};
