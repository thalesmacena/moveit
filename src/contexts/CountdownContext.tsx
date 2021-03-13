/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  hasFinished: boolean;
  isActive: boolean;
  resetCountdown: () => void;
  startCountdown: () => void;
  progress: number;
  minutes: number;
  seconds: number;
}

export const CountdownContext = createContext({} as CountdownContextData);

interface CountdownProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line no-undef
let countdownTimeout: NodeJS.Timeout;

export const CountdownProvider = ({ children }: CountdownProviderProps) => {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountdown = () => {
    setIsActive(true);
  };

  const resetCountdown = () => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25 * 60);
    setHasFinished(false);
    setProgress(0);
  };

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
        setProgress((1500 - time) / 15);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      setProgress(100);
      startNewChallenge();
    }
  }, [isActive, time, startNewChallenge]);

  return (
    <CountdownContext.Provider
      value={{
        hasFinished,
        isActive,
        resetCountdown,
        startCountdown,
        progress,
        minutes,
        seconds
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
};
