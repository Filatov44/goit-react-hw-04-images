import React from 'react';
import { useState, useEffect } from 'react';
import { searchPosts } from 'service/api-imageSearch';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { StyledBaseContainer } from './SearchImages.styled';
import { Loader } from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { StyledModalImg } from 'components/Modal/Modal.styled';
import ButtonLoadMore from 'components/Button/Button';


export default function SearchImages() {

  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  const isPosts = Boolean(pictures.length);

    useEffect(() => {
       if (!query) {
      return
      }
      async function fetchPosts() {
        setLoading(true);
        try {
          const data = await searchPosts(query, page);

          setPictures(prev =>[...prev, ...data.data.hits]);
        } catch (error) {
          setError({ error });
        } finally {
          setLoading(false);
        }
      }
      fetchPosts()
      
    }, [query, page]);

 
  const onSearch = query => {
    setQuery(query);
    setPage(1)
    setPictures([])
  };

  const closeModal = () => {
    setModalOpen(false);
    setLargeImageURL('')
    setAlt('')
  };

  const openModal = modalContent => {
    const { largeImageURL, tags } = modalContent;
    setModalOpen(true);
    setLargeImageURL(largeImageURL)
    setAlt(tags)
    
  };

  const loadMore = () => {
    setPage(page + 1)
    
  };


  return (
    <StyledBaseContainer>
        <ToastContainer autoClose={1000} />
        {modalOpen && (
          <Modal onClose={closeModal}>
            <StyledModalImg src={largeImageURL} alt={alt} />
          </Modal>
        )}
        <Searchbar onSubmit={onSearch}></Searchbar>
        {error && <p>An error has occurred. Try later</p>}
        {isPosts && <ImageGallery pictures={pictures} onClick={openModal} />}
        {loading && <Loader />}
        {isPosts && !loading && <ButtonLoadMore onClick={loadMore} />}
      </StyledBaseContainer>
  )
}





// export default class SearchImages extends Component {
//   state = {
//     pictures: [],
//     query: '',
//     page: 1,
//     loading: false,
//     error: null,
//     modalOpen: false,
//     largeImageURL: '',
//     alt: '',
//   };

//   componentDidUpdate(_, prevState) {
//     const { query, page, loading } = this.state;

//     const isNewQuery =
//       query !== prevState.query || (page === 1 && prevState.page !== 1);
//     if (isNewQuery || page !== prevState.page) {
//       isNewQuery && this.setState({ pictures: [] });
//       !loading && this.fetchPosts();
//     }
//   }

//   async fetchPosts() {
//     const { query, page } = this.state;
//     this.setState({
//       loading: true,
//     });
//     try {
//       const data = await searchPosts(query, page);
//       // console.log(data);

//       this.setState(({ pictures }) => {
//         return {
//           pictures: [...pictures, ...data.data.hits],
//         };
//       });
//     } catch (error) {
//       this.setState({ error });
//     } finally {
//       this.setState({
//         loading: false,
//       });
//     }
//   }

//   onSearch = query => {
//     this.setState({ query, page: 1 });
//   };

//   closeModal = () => {
//     this.setState({
//       modalOpen: false,
//       largeImageURL: '',
//       alt: '',
//     });
//   };

//   openModal = modalContent => {
//     // console.log(modalContent);
//     const { largeImageURL, tags } = modalContent;
//     this.setState({
//       modalOpen: true,
//       largeImageURL: largeImageURL,
//       alt: tags,
//     });
//   };

//   loadMore = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   render() {
//     const { pictures, loading, error, modalOpen, largeImageURL, alt } =
//       this.state;
//     const { onSearch, closeModal, openModal, loadMore } = this;
//     const isPosts = Boolean(pictures.length);
//     return (
//       <StyledBaseContainer>
//         <ToastContainer autoClose={1000} />
//         {modalOpen && (
//           <Modal onClose={closeModal}>
//             <StyledModalImg src={largeImageURL} alt={alt} />
//           </Modal>
//         )}
//         <Searchbar onSubmit={onSearch}></Searchbar>
//         {error && <p>An error has occurred. Try later</p>}
//         {isPosts && <ImageGallery pictures={pictures} onClick={openModal} />}
//         {loading && <Loader />}
//         {isPosts && !loading && <ButtonLoadMore onClick={loadMore} />}
//       </StyledBaseContainer>
//     );
//   }
// }
