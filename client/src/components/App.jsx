/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from 'react';
import Modal from 'react-modal';
import LazyLoad from 'react-lazyload';

import styles from '../styles/style.css';
import Parser from './Parser.js';
import Reviews from './Reviews.jsx';
import Scores from './Scores.jsx';
import ModalReviews from './Modal/ModalReviews.jsx';

const roomId = Math.floor(Math.random() * 4999999 + 1);

// const roomId = Math.floor(Math.random() * 100 + 1);
// Number((window.location.pathname).slice(1, window.location.pathname.length - 1));

Modal.setAppElement('#reviews');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      overall: 0,
      totalReviews: 0,
      cleanliness: 0,
      accuracy: 0,
      communication: 0,
      location: 0,
      checkIn: 0,
      value: 0,
      modal: false,
      roomId: roomId
    };

    this.hideReviews = this.hideReviews.bind(this);
    this.showReviews = this.showReviews.bind(this);
    this.disableScroll = this.disableScroll.bind(this);
    this.enableScroll = this.enableScroll.bind(this);
  }

  componentDidMount() {
    Parser.getReviews(roomId, (data) => {
      console.log(data);
      this.setState({
        reviews: data
      });
    });
    Parser.getReviewScores(roomId, (data) => {
      this.setState({
        cleanliness: data[0].total_cleanliness.toFixed(1),
        accuracy: data[0].total_accuracy.toFixed(1),
        communication: data[0].total_communication.toFixed(1),
        location: data[0].total_location.toFixed(1),
        checkIn: data[0].total_check_in.toFixed(1),
        value: data[0].total_value.toFixed(1)
      });
    });
    Parser.getReviewOverall(roomId, (data) => {
      this.setState({
        overall: (data[0].total_score).toFixed(2),
        totalReviews: data[0].total_reviews
      });
    });
  }

  showReviews() {
    this.setState({
      modal: true
    });
  }

  hideReviews() {
    this.setState({
      modal: false
    });
  }

  disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  enableScroll() {
    document.body.style.overflow = 'scroll';
  }

  render() {
    return (
      <div>
        <Modal
          className={styles.modalReviews}
          closeTimeoutMS={500}
          isOpen={this.state.modal}
          onRequestClose={this.hideReviews}
          onAfterOpen={this.disableScroll}
          onAfterClose={this.enableScroll}
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(18, 16, 10, 0.5)'
            },
            content: {
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '10px',
              outline: 'none',
              padding: '20px'
            }
          }}
        >
          <ModalReviews
            roomId={this.state.roomId}
            hideModal={this.hideReviews}
            overall={this.state.overall}
            totalReviews={this.state.totalReviews}
            cleanliness={this.state.cleanliness}
            accuracy={this.state.accuracy}
            communication={this.state.communication}
            location={this.state.location}
            checkIn={this.state.checkIn}
            value={this.state.value}
          />
        </Modal>
        <h3 className={styles.overview}>
          <span className={styles.star}>★</span>{this.state.overall} <span>({this.state.totalReviews} reviews)</span>
        </h3>
        <table className={styles.scoresTable}>
          <LazyLoad>
            <Scores
              cleanliness={this.state.cleanliness}
              accuracy={this.state.accuracy}
              communication={this.state.communication}
              location={this.state.location}
              checkIn={this.state.checkIn}
              value={this.state.value}
            />
          </LazyLoad>
        </table>
        <table>
          <LazyLoad>
            <Reviews reviews={this.state.reviews} totalReviews={this.state.totalReviews} />
          </LazyLoad>
        </table>
        <div>
          <button className={styles.reviewsButton} type="button" onClick={this.showReviews}> Show all {this.state.totalReviews} reviews </button>
        </div>
      </div>
    );
  }
}

export default App;
