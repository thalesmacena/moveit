import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface ProfileContextData {
  login: (loginUserName: string) => void;
  username: string;
  avatar: string;
  isFound: boolean;
  loading: boolean;
  cleanError: () => void;
}

export const ProfileContext = createContext({} as ProfileContextData);

interface ProfileProviderProps {
  children: ReactNode;
  username: string;
  avatar: string;
}

export const ProfileProvider = ({
  children,
  ...rest
}: ProfileProviderProps) => {
  const [username, setUsername] = useState(rest.username ?? 'teste');
  const [avatar, setAvatar] = useState(rest.avatar ?? 'teste');
  const [isFound, setIsFound] = useState(true);
  const [loading, setLoading] = useState(false);

  const Router = useRouter();

  useEffect(() => {
    Cookies.set('username', String(username));
    Cookies.set('avatar', String(avatar));
  }, [username, avatar]);

  const cleanError = () => {
    setIsFound(true);
  };

  const login = async (LoginUserName: string) => {
    let response = null;
    setLoading(true);

    try {
      response = await axios.get(
        `https://api.github.com/users/${LoginUserName}`
      );
    } catch {
      setIsFound(false);
      setLoading(false);
      return;
    }

    if (response) {
      setIsFound(true);

      const { data } = response;
      setUsername(data.name);
      setAvatar(data.avatar_url);

      Router.push('moveit');

      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        login,
        username,
        avatar,
        isFound,
        loading,
        cleanError
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
