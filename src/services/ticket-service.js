/* eslint-disable no-param-reassign */
import axios from 'axios';
import { authService } from './index';
import { TICKETS_URL } from '../constants/api-endpoints';

export function pay() {
  const transactionId = 'grtgh4yhhdvvbge4';
  // fake payment
  // const paymentProcess = new Promise(resolve => setTimeout(() => resolve(transactionId)), 2000);
  return new Promise(resolve => resolve(transactionId));
}

export function requestTicket(order) {
  order.user = authService.getAuthenticatedUser().id;
  return axios.post(TICKETS_URL, order);
}
