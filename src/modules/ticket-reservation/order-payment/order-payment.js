import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default class OrderPayment extends React.Component {
  render() {
    const {
      pay, ticket, error, finishOrder,
    } = this.props;
    return (
      <div className={styles.container}>
        <button className="close" onClick={finishOrder}>&times;</button>
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
            <button onClick={pay} className="btn btn-primary mt-3">Pay</button>
          </div>
        </form>
        { error &&
          <div className="alert alert-danger">
            {error.message}
          </div>
        }
        {
         ticket &&
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
  pay: PropTypes.func,
  finishOrder: PropTypes.func,
  ticket: PropTypes.shape({
    user: PropTypes.string,
    movieSession: PropTypes.string,
    createdAd: PropTypes.string,
  }),
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

