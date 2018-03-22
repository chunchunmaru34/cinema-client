/* eslint-disable no-param-reassign */
import axios from 'axios';
import { authService } from './index';
import { TICKETS_URL } from '../constants/api-endpoints';

export function pay() {
  const transactionId = 'grtgh4yhhdvvbge4';
  // fake payment
  const paymentProcess = new Promise(resolve => setTimeout(() => resolve(transactionId)), 500);
  return paymentProcess;
}

export function requestTicket(transactionId, order) {
  order.transactionId = transactionId;
  order.user = authService.getAuthenticatedUser().id;
  axios.post(TICKETS_URL, order);
}
