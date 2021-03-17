import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { ProfileContext } from '../contexts/ProfileContext';
import styles from '../styles/components/Profile.module.css';
import { LogoutButton } from './LogoutButton';

export const Profile = () => {
  const { level } = useContext(ChallengesContext);
  const { username, avatar } = useContext(ProfileContext);

  return (
    <div className={styles.profileContainer}>
      <img src={avatar} alt={username} />
      <div>
        <strong>{username}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
        <LogoutButton />
      </div>
    </div>
  );
};
