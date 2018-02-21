import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './styles.scss';

function getDate(data) {
  return new Date(data).toDateString();
}

class MovieSessionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSeatsArrangementsToggled: false,
    };
  }
  handleClick = () => {
    this.toggleSeatsArrangements();
  };

  toggleSeatsArrangements() {
    const { id } = this.props.data;
    const { match } = this.props;
    if (!this.state.isSeatsArrangementsToggled) {
      this.props.history.push(`${match.url}/movieSessions/${id}`);
      this.setState({ isSeatsArrangementsToggled: true });
    } else {
      this.props.history.push(match.url);
      this.setState({ isSeatsArrangementsToggled: false });
    }
  }

  render() {
    const { date } = this.props.data;
    return (
        <div onClick={this.handleClick} className={styles.container}>
            <span>{getDate(date)}</span>
        </div>
    );
  }
}

export default withRouter(MovieSessionCard);

