import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useScrollTo } from 'react-use-window-scroll';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import * as API from '../services/api';
import css from '../components/Api.module.css';

class App extends Component {
  state = {
    cards: [],
    isLoading: false,
    page: 1,
    searchQuery: '',
    totalImages: 0,
    showModal: false,
    modalCard: '',
    modalAlt: '',
  };

  handleSubmit = async e => {
    e.preventDefault();

    const searchQuery = e.target.serchQuery.value.trim();

    if (searchQuery === '') {
      toast.info('Please, fill in the field', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    this.setState({
      isLoading: true,
    });

    try {
      const cards = await API.fetchCards(searchQuery, this.state.page);

      if (cards.hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          }
        );
        return;
      }
      const totalPages = Math.ceil(cards.totalHits / 12);
      if (totalPages - 1 <= this.state.page) {
        toast.info(
          "We're sorry, but you've reached the end of search results.",
          {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        );
      }
      toast.success(`Hooray! We found ${cards.totalHits} images.`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      this.setState({
        cards: cards.hits,
        isLoading: false,
        page: 1,
        searchQuery: searchQuery,
        totalImages: totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onLoadMore = async e => {
    this.setState({ isLoading: true });

    try {
      const cards = await API.fetchCards(
        this.state.searchQuery,
        this.state.page + 1
      );

      this.setState(prevState => ({
        cards: [...prevState.cards, ...cards.hits],
        page: this.state.page + 1,
        isLoading: false,
      }));

      if (this.state.totalImages - 1 <= this.state.page) {
        toast.info(
          "We're sorry, but you've reached the end of search results.",
          {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.onCloseModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.onCloseModal();
    }
  };

  handleCardClick = e => {
    console.log(this.state.cards);
    this.setState({
      showModal: true,
      modalAlt: e.target.alt,
      modalCard: e.target.src,
    });
  };

  render() {
    const {
      page,
      totalImages,
      isLoading,
      cards,
      showModal,
      modalCard,
      modalAlt,
    } = this.state;

    const hideBtn = page === totalImages;

    return (
      <div className={css.API}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery cards={cards} onClick={this.handleCardClick} />
        <ToastContainer />
        {cards.length > 0 && !hideBtn && <Button onClick={this.onLoadMore} />}
        {isLoading && <Loader />}

        {showModal && (
          <Modal
            onClick={this.handleBackdropClick}
            src={modalCard}
            alt={modalAlt}
          />
        )}
      </div>
    );
  }
}
export default App;
