import React from 'react';
import { connect } from 'react-redux';
import { fetchTickets } from '../actions';
import TicketList from './ticket-list';

class TicketListContainer extends React.Component {
  componentDidMount() {
    const { userId, dispatch } = this.props;
    dispatch(fetchTickets({ user: userId, relevant: true }));
  }

  onGetTickets = (relevant) => {
    const { dispatch, userId } = this.props;
    dispatch(fetchTickets({ user: userId, relevant }));
  };

  render() {
    const {
      tickets, isTicketsRelevant, isTicketsLoading, error,
    } = this.props;
    return !error && <TicketList getTickets={this.onGetTickets}
                                 isLoading={isTicketsLoading}
                                 isTicketsRelevant={isTicketsRelevant}
                                 tickets={tickets}/>;
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  tickets: state.profile.tickets,
  isTicketsRelevant: state.profile.isTicketsRelevant,
  isTicketsLoading: state.profile.isTicketsLoading,
  error: state.profile.error,
});

export default connect(mapStateToProps)(TicketListContainer);
