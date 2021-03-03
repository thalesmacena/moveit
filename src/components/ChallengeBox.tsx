import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export const ChallengeBox = () => {
  const {
    activeChallenge,
    resetActiveChallenge,
    completeChallenge,
  } = useContext(ChallengesContext);

  const { resetCountdown } = useContext(CountdownContext);

  const handleChallengeSucceeded = () => {
    completeChallenge();
    resetCountdown();
  };

  const handleChallengeFailed = () => {
    resetActiveChallenge();
    resetCountdown();
  };

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            {activeChallenge.type === 'body' ? (
              <img src="icons/body.svg" alt="Exercicio Fisico" />
            ) : (
              <>
                {activeChallenge.type === 'eye' ? (
                  <img src="icons/eye.svg" alt="Exercicio de Visão" />
                ) : null}
              </>
            )}
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avança de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
};
