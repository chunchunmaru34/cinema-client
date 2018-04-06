import React from 'react';
import PropTypes from 'prop-types';
import Ticket from './ticket/ticket';
import styles from './styles.scss';
import LoadingBar from '../../util-component/loading-bar';

const TicketList = ({
  tickets, getTickets, isTicketsRelevant, isLoading,
}) => (
  <div className={styles.container}>
    <div className="text-center">
      <h4>Your tickets</h4>
    </div>
    <div className={styles.picker}>
      <span onClick={() => getTickets(false)}
            className={!isTicketsRelevant ? styles.selected : ''}>All</span>
      <span>|</span>
      <span onClick={() => getTickets(true)}
            className={isTicketsRelevant ? styles.selected : ''}>Relevant</span>
    </div>
    {
      isLoading ?
      <LoadingBar/>
        :
      tickets.map(ticket => <Ticket key={ticket.id} data={ticket}/>)
    }
  </div>
);

Ticket.propTypes = {
  getTickets: PropTypes.func,
  isTicketsRelevant: PropTypes.boolean,
  isLoading: PropTypes.boolean,
  tickets: PropTypes.arrayOf(PropTypes.shape({
    movieSession: PropTypes.shape({
      cinema: PropTypes.object,
      movie: PropTypes.object,
      date: PropTypes.string,
      roomCodeName: PropTypes.string,
    }),
    addedSeats: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      rowNumber: PropTypes.rowNumber,
    })),
    transactionId: PropTypes.string,
    user: PropTypes.string,
    additions: PropTypes.object,
  })),
};

export default TicketList;
