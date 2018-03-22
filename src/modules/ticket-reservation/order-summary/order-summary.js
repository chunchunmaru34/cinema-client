import React from 'react';
import styles from './styles.scss';

export default class OrderSummary extends React.Component {
  render() {
    let price = 0;
    const seats = this.props.addedSeats.map((item) => {
      price += this.props.movieSession.price * (item.priceMultiplier || 1);
      return <div>Row: {item.rowNumber} Number: {item.number}</div>;
    });
    const additions = this.props.movieSession.additions
      .map(item => <div>{item.addition.name}: {item.price}$</div>)
    return (
      <div className={styles.container}>
        <div className={styles.orderInfo}>
          <div>
            {seats}
          </div>
          <div>
            Additions: {additions}
          </div>
          <div>
            <h4>Total price: {price}$</h4>
          </div>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-primary">Checkout</button>
        </div>
      </div>
    );
  }
}
