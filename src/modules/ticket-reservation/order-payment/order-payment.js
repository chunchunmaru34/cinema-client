import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { PAYMENT_SUCCESS, PAYMENT_FAIL, PAYMENT_PENDING } from '../constants/payment-statuses';

export default class OrderPayment extends React.Component {
  render() {
    const {
      pay, ticket, error, finishOrder, paymentStatus,
    } = this.props;

    let paymentInfo;
    switch (paymentStatus) {
      case PAYMENT_SUCCESS:
        paymentInfo = <div className="alert alert-info">Payment succeed</div>;
        break;
      case PAYMENT_FAIL:
        paymentInfo = <div className="alert alert-danger">Payment failed, try again</div>;
        break;
      case PAYMENT_PENDING:
        paymentInfo = <div>Waiting for payment</div>;
        break;
      default:
        paymentInfo = null;
    }

    return (
      <div className={styles.container}>
        <button
          className="close"
          onClick={finishOrder}
        >
          &times;
        </button>

        <h4>Payment information</h4>

        <form className={styles.payForm}>
          <div>
            <label>Card</label>
            <input className="form-control"/>
          </div>
          <div>
            <label>Name</label>
            <input className="form-control"/>
          </div>
          <div>
            <button
              onClick={pay}
              className="btn btn-primary mt-3">
              Pay
            </button>
          </div>
        </form>

        {paymentInfo}
        { error &&
          <div className="alert alert-danger">
            {error}
          </div>
        }
        {ticket &&
          <div className="alert alert-secondary mt-3">
            <span>Your ticket id is:</span>
            <h4 className="mt-4 mb-4">{ticket.id}</h4>
            <div className={`${styles.secondaryInfo} text-secondary`}>
              <span>You can see your full order history in the profile</span>
            </div>
          </div>
        }
      </div>
    );
  }
}

OrderPayment.propTypes = {
  paymentStatus: PropTypes.string,
  pay: PropTypes.func,
  finishOrder: PropTypes.func,
  ticket: PropTypes.shape({
    user: PropTypes.string,
    movieSession: PropTypes.string,
    createdAd: PropTypes.string,
  }),
  error: PropTypes.string,
};

