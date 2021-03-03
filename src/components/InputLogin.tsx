import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../contexts/ProfileContext';
import styles from '../styles/components/InputLogin.module.css';

export const InputLogin = () => {
  const { login, isFound, loading, cleanError } = useContext(ProfileContext);
  const [newLogin, setNewLogin] = useState();

  const handleInputChange = (e: any) => {
    setNewLogin(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    login(newLogin);
  };

  useEffect(() => {
    cleanError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newLogin]);

  return (
    <div className={styles.inputLoginContainer}>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Digite seu username"
          value={newLogin}
          onChange={handleInputChange}
        />
        {newLogin ? (
          <>
            {loading ? (
              <button type="submit">
                <img src="icons/loading.svg" alt="Carregando" />
              </button>
            ) : (
              <>
                {isFound ? (
                  <button type="submit" className={styles.buttonAble}>
                    <img src="icons/goArrow.svg" alt="Ir" />
                  </button>
                ) : (
                  <button type="submit" disabled className={styles.buttonError}>
                    <img src="icons/goArrow.svg" alt="Ir" />
                  </button>
                )}
              </>
            )}
          </>
        ) : (
          <button type="submit" disabled>
            <img src="icons/goArrow.svg" alt="Ir" />
          </button>
        )}
      </form>
    </div>
  );
};
