/* eslint-disable no-param-reassign */
import axios from 'axios';
import { authService } from './index';
import { RESERVATIONS_URL, TICKETS_URL } from '../constants/api-endpoints';

export function pay() {
  const transactionId = 'grtgh4yhhdvvbge4';
  // fake payment
  const paymentProcess = new Promise(resolve => setTimeout(() => resolve(transactionId)), 2000);
  // return new Promise(resolve => resolve(transactionId));
  return paymentProcess;
}

export function requestTicket(order) {
  const payload = {
    user: authService.getAuthenticatedUser().id,
    movieSession: order.selectedMovieSession.id,
    transactionId: order.transactionId,
    addedSeats: order.addedSeats,
    additions: order.additions,
  };
  return axios.post(TICKETS_URL, payload);
}

export function reserveSeats({ seats, movieSession }) {
  const payload = {
    seats,
    movieSessionId: movieSession.id,
    userId: authService.getAuthenticatedUser().id,
  };
  return axios.post(RESERVATIONS_URL, payload);
}
