import React from 'react';
import styles from './styles.css';

export default class Movie extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <img src={this.props.data.posterUrl} className={styles.poster} width='320px'/>
                <div className={styles.title}>
                    {this.props.data.title}
                </div>
            </div>
        )
    }
}