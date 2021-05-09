import App from 'next/app';
import Layout from '../components/Layout/Layout';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import baseUrl from '../utils/baseUrl';
import { redirectUser } from '../utils/authUser';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  const protectedRoutes = ctx.pathname === '/';
  if (!token) {
    protectedRoutes && redirectUser(ctx, '/login');
  } else {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    try {
      const loggedInUserData = await axios.get(`${baseUrl}/api/auth`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { user, followStats } = loggedInUserData.data;

      //If user is already logged in and tries to hit login or signup page, redirecting him to home page
      if (user) {
        !protectedRoutes && redirectUser(ctx, '/');
      }

      pageProps.user = user;
      pageProps.followStats = followStats;
    } catch (error) {
      destroyCookie(ctx, 'token');
      redirectUser(ctx, '/login');
    }
  }

  return { pageProps };
};

export default MyApp;
