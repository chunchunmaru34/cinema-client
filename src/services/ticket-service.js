import axios from 'axios';
import qs from 'qs';

import { filter } from './utils/paramsFilter';
import { TICKETS_URL } from '../../conf/api-endpoints';

export function getTickets(params) {
  const query = qs.stringify(filter(params));
  return axios.get(`${TICKETS_URL}?${query}`);
}

export function createTicket(ticket) {
  return axios.post(TICKETS_URL, ticket);
}

export function deleteTicket(ticketId) {
  return axios.delete(`${TICKETS_URL}/${ticketId}`);
}

export function updateTickets(tickets) {
  return axios.put(TICKETS_URL, tickets);
}
