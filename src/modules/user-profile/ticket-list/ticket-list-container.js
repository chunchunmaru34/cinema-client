import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchTickets } from '../actions';
import TicketList from './ticket-list';

class TicketListContainer extends React.Component {
  componentDidMount() {
    const { userId, dispatch } = this.props;

    dispatch(fetchTickets({ user: userId, relevant: true }));
  }

  onGetTickets = (isRelevant) => {
    const { dispatch, userId } = this.props;

    dispatch(fetchTickets({ user: userId, isRelevant }));
  };

  render() {
    const {
      tickets, isTicketsRelevant, isTicketsLoading,
    } = this.props;

    return (
      <TicketList
        getTickets={this.onGetTickets}
        isLoading={isTicketsLoading}
        isTicketsRelevant={isTicketsRelevant}
        tickets={tickets}
      />
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  tickets: state.profile.tickets,
  isTicketsRelevant: state.profile.isTicketsRelevant,
  isTicketsLoading: state.profile.isTicketsLoading,
});

TicketListContainer.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.shape({
    movieSession: PropTypes.shape({
      cinema: PropTypes.object,
      movie: PropTypes.object,
      date: PropTypes.string,
      roomCodeName: PropTypes.string,
    }),
    addedSeats: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      rowNumber: PropTypes.number,
    })),
    transactionId: PropTypes.string,
    user: PropTypes.string,
    additions: PropTypes.object,
  })),
  isTicketsRelevant: PropTypes.bool,
  isTicketsLoading: PropTypes.bool,
};

export default connect(mapStateToProps)(TicketListContainer);
