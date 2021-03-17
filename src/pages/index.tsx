import { GetServerSideProps } from 'next';
import { InputLogin } from '../components/InputLogin';
import { ProfileProvider } from '../contexts/ProfileContext';
import styles from '../styles/pages/Login.module.css';

interface LoginProps {
  username: string;
  avatar: string;
}

const Login = (props: LoginProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/logo.svg" alt="Moove.it" />
      </div>

      <div className={styles.containerRight}>
        <div className={styles.containerLogo}>
          <img src="/logo-full-white.svg" alt="Moove.it" />
        </div>

        <div className={styles.containerLogin}>
          <strong>Bem-Vindo</strong>

          <div className={styles.containerGithub}>
            <img src="/icons/github.svg" alt="Github" />
            Faça Login com seu Github
            <br />
            para começar
          </div>

          <ProfileProvider username={props.username} avatar={props.avatar}>
            <InputLogin />
          </ProfileProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { username, avatar } = ctx.req.cookies;

  if (username) {
    return {
      redirect: {
        destination: '/moveit',
        permanent: false
      }
    };
  }

  return {
    props: {
      username: String(username),
      avatar: String(avatar)
    }
  };
};
