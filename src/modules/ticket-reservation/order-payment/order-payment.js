import React from 'react';

export default class OrderPayment extends React.Component {
  handlePayment = (e) => {
    e.preventDefault();
    this.props.pay();
    // pay
    // wait for response
    // handle response
    // send info to server
  };

  render() {
    return (
      <div className="text-center">
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
        </form>
      </div>
    );
  }
}
