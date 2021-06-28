import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css';
export const successToast = () => {
  toast.success(
    <i
      className='fa fa-check-circle'
      aria-hidden='true'
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <span
        style={{ marginLeft: '0.5rem', fontFamily: 'Open Sans, sans-serif' }}
      >
        Added To Cart
      </span>
    </i>,
    {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      hideProgressBar: true,
      className: 'Toastify__toast--success',
    }
  );
};
export const errorToast = () => {
  toast.error(
    <i
      className='fa fa-exclamation-circle mr-sm'
      aria-hidden='true'
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <span
        style={{ marginLeft: '0.5rem', fontFamily: 'Open Sans, sans-serif' }}
      >
        Removed From Cart
      </span>
    </i>,
    {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      hideProgressBar: true,
      className: 'Toastify__toast--error',
    }
  );
};
export const successToastWishlist = () => {
  toast.success(
    <i
      className='fa fa-check-circle'
      aria-hidden='true'
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <span
        style={{ marginLeft: '0.5rem', fontFamily: 'Open Sans, sans-serif' }}
      >
        Added To Wishlist
      </span>
    </i>,
    {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      hideProgressBar: true,
      className: 'Toastify__toast--success',
    }
  );
};
export const errorToastWishlist = () => {
  toast.error(
    <i
      className='fa fa-exclamation-circle mr-sm'
      aria-hidden='true'
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <span
        style={{ marginLeft: '0.5rem', fontFamily: 'Open Sans, sans-serif' }}
      >
        Removed From Wishlist
      </span>
    </i>,
    {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      hideProgressBar: true,
      className: 'Toastify__toast--error',
    }
  );
};
