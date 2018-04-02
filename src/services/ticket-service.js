/* eslint-disable no-param-reassign */
import axios from 'axios';
import { authService } from './index';
import { RESERVATIONS_URL, TICKETS_URL } from '../constants/api-endpoints';

export function pay() {
  // fake payment
  const transactionId = 'grtgh4yhhdvvbge4';
  const paymentProcess = new Promise((resolve) => {
    setTimeout(() => resolve(transactionId), 2000);
  });
  return paymentProcess;
}

export function requestTicket(order) {
  const payload = {
    user: authService.getAuthenticatedUser().id,
    movieSession: order.selectedMovieSession.id,
    transactionId: order.transactionId,
    addedSeats: order.addedSeats,
    additions: order.additions,
    totalPrice: order.totalPrice,
  };
  return axios.post(TICKETS_URL, payload);
}

export function reserveSeat({ seat, movieSession }) {
  const payload = {
    seat,
    movieSessionId: movieSession.id,
    userId: authService.getAuthenticatedUser().id,
  };
  return axios.put(RESERVATIONS_URL, payload);
}


export function unreserveSeat({ seat, movieSession }) {
  const payload = {
    seat,
    movieSessionId: movieSession.id,
    userId: authService.getAuthenticatedUser().id,
  };
  return axios.patch(RESERVATIONS_URL, payload);
}
