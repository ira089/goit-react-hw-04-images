import { Component } from 'react';
// import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

// const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };
  render() {
    // console.log(this.props);
    const { urlModal, alt } = this.props;
    return (
      <div onClick={this.closeModal} className={styles.overlay}>
        <div className={styles.modal}>
          <img src={urlModal} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
// return createPortal(
//     <div onClick={this.closeModal} className={styles.overlay}>
//       <div className={styles.modal}>
//         <img src={urlModal} />
//       </div>
//     </div>,
//     modalRoot
//   );