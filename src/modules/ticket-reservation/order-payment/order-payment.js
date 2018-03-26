import React from 'react';
import styles from './styles.scss';

export default class OrderPayment extends React.Component {
  handlePayment = (e) => {
    e.preventDefault();
    this.props.pay();
  };

  handleClosing = () => {
    this.props.finishOrder();
  };

  render() {
    return (
      <div className={styles.container}>
        <button className="close" onClick={this.handleClosing}>&times;</button>
        <h4>Payment information</h4>
        <form>
          <div>
            <label>Card</label>
            <input/>
          </div>
          <div>
            <label>Name</label>
            <input/>
          </div>
          <div>
            <button onClick={this.handlePayment} className="btn btn-primary">Pay</button>
          </div>
          { this.props.error &&
            <div className="alert alert-danger">
              {this.props.error.message}
            </div>
          }
          {
            this.props.ticket &&
              <div className="alert alert-secondary mt-3">
                <span>Your ticket id is:</span>
                <h4 className="mt-4 mb-4">{this.props.ticket.id}</h4>
                <div className={`${styles.secondaryInfo} text-secondary`}>
                  <span>You can see your full order history in the profile</span>
                </div>
              </div>
          }
        </form>
      </div>
    );
  }
}
