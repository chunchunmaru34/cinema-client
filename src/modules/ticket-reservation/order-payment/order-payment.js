import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

export default class OrderPayment extends React.Component {
  render() {
    const {
      confirmedTickets, error, finishOrder,
    } = this.props;

    const ticketCards = confirmedTickets && confirmedTickets.map(ticket => (
      <div
        key={ticket.id}
        className="alert alert-secondary mt-3"
      >
        <span>Ticket id:</span>
        <h4 className="mt-4 mb-4">{ticket.id}</h4>
      </div>
    ));

    return (
      <div className={styles.container}>
        <button
          className="close"
          onClick={finishOrder}
        >
          &times;
        </button>

        {error &&
          <div className="alert alert-danger">
            {error}
          </div>
        }
        {confirmedTickets &&
          <div>
            <span>Your tickets are ready</span>
            {ticketCards}
          </div>
        }
      </div>
    );
  }
}

OrderPayment.propTypes = {
  finishOrder: PropTypes.func,
  tickets: PropTypes.array,
  error: PropTypes.string,
};

