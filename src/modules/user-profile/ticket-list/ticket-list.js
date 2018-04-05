import React from 'react';
import Ticket from './ticket/ticket';
import styles from './styles.scss';
import LoadingBar from '../../utils/loading-bar';

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
      tickets.map(ticket => <Ticket data={ticket}/>)
    }
  </div>
);

export default TicketList;
