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

export function createItem({
  title = 'Undefined title',
  url = '#',
  MainImage = { url_570xN: './src/img/undefined.jpg' },
  currency_code = 'rub.',
  price = '0',
  quantity = 0,
}: ItemProps) {
  const processedTitle = title.length > 50 ? `${title.substring(0, 50)}...` : title;

  let processedCurrencyCode = currency_code;
  if (currency_code === 'USD') {
    processedCurrencyCode = '$';
  } else if (currency_code === 'EUR') {
    processedCurrencyCode = '€';
  }

  let quantityClass = 'item-quantity ';
  if (quantity <= 10) {
    quantityClass += 'level-low';
  } else if (quantity > 10 && quantity <= 20) {
    quantityClass += 'level-medium';
  } else if (quantity > 20) {
    quantityClass += 'level-high';
  }

  return {
    title: processedTitle,
    url,
    MainImage,
    currency_code: processedCurrencyCode,
    price,
    quantity,
    quantityClass,
    url_570xN: MainImage.url_570xN,
  };
}

interface ListingProps {
  item: ReturnType<typeof createItem>;
}

export const Listing: React.FC<ListingProps> = ({ item }) => {
  return (
    <div className="item">
      <div className="item-image">
        <a href={item.url}>
          <img src={item.url_570xN} alt={item.title} />
        </a>
      </div>
      <div className="item-details">
        <p className="item-title">{item.title}</p>
        {item.currency_code !== '$' && item.currency_code !== '€' ? (
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
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    MainImage: PropTypes.shape({
      url_570xN: PropTypes.string.isRequired,
    }).isRequired,
    currency_code: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    quantityClass: PropTypes.string.isRequired,
    url_570xN: PropTypes.string.isRequired,
  }).isRequired,
};