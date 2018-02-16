import { MOVIES_PATH } from "../../conf/api-paths";
import { CINEMAS_PATH } from "../../conf/api-paths";

export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export function requestMovies() {
    return {
        type: REQUEST_MOVIES,
    }
}

export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';
export function receiveMovies(json) {
    return {
        type: RECEIVE_MOVIES,
        movies: json,
    }
}

export const FETCH_MOVIES = 'FETCH_MOVIES';
export function fetchMovies() {
    return function (dispatch) {
        dispatch(requestMovies());
        return fetch(MOVIES_PATH)
            .then(
                res => res.json(),
                err => console.log(err)
            )
            .then(
                json => dispatch(receiveMovies(json))
            )
    }
}

export const REQUEST_MOVIE_DETAILS = 'REQUEST_MOVIE_DETAILS';
export function requestMovieDetails() {
    return {
        type: REQUEST_MOVIE_DETAILS,
    }
}

export const RECEIVE_MOVIE_DETAILS = 'RECEIVE_MOVIE_DETAILS';
export function receiveMovieDetails(json) {
    return {
        type: RECEIVE_MOVIE_DETAILS,
        movieDetails: json,
    }
}

export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS';
export function fetchMovieDetails(id) {
    return function (dispatch) {
        dispatch(requestMovieDetails());
        return fetch(MOVIES_PATH + "/" + id)
            .then(
                res => res.json(),
                err => console.log(err)
            )
            .then(
                json => {
                    dispatch(receiveMovieDetails(json));
                }
            )
    }
}

export const REQUEST_CINEMAS = 'REQUEST_CINEMAS';
export function requestCinemas() {
    return {
        type: REQUEST_CINEMAS,
    }
}

export const RECEIVE_CINEMAS = 'RECEIVE_CINEMAS';
export function receiveCinemas(json) {
    return {
        type: RECEIVE_CINEMAS,
        cinemas: json,
    }
}

export const FETCH_CINEMAS = 'FETCH_CINEMAS';
export function fetchCinemas() {
    return function (dispatch) {
        dispatch(requestCinemas());
        return fetch(CINEMAS_PATH)
            .then(
                res => res.json(),
                err => console.log(err)
            )
            .then(
                json => dispatch(receiveCinemas(json))
            )
    }
}