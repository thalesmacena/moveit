import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/components/LogoutButton.module.css';

export const LogoutButton = () => {
  const [isFocus, setIsFocus] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('username');
    Cookies.remove('avatar');
    router.push('/');
  };

  const handleEnter = () => {
    setIsFocus(true);
  };

  const handleLeave = () => {
    setIsFocus(false);
  };

  return (
    <div className={styles.logoutButtonContainer}>
      <button
        onMouseEnter={() => handleEnter()}
        onMouseLeave={() => handleLeave()}
        onClick={() => handleLogout()}
        type="button"
      >
        <p>
          {isFocus ? (
            <img src="/icons/logout-focus.svg" alt="Sair" />
          ) : (
            <img src="/icons/logout.svg" alt="Sair" />
          )}
          Sair
        </p>
      </button>
    </div>
  );
};
