import React from 'react';
import { Menu, Container, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { logoutUser } from '../../utils/authUser';

function Navbar({ user }) {
  const router = useRouter();

  const isActive = route => {
    return router.pathname === route;
  };

  return (
    <Menu fluid borderless>
      <Container text>
        {!user ? (
          <>
            <Link href="/login">
              <Menu.Item header active={isActive('/login')}>
                <Icon size="large" name="sign in" />
                Login
              </Menu.Item>
            </Link>
            <Link href="/signup">
              <Menu.Item header active={isActive('/signup')}>
                <Icon size="large" name="signup" />
                Sign up
              </Menu.Item>
            </Link>
          </>
        ) : (
          <>
            <Link href="/">
              <Menu.Item header active={isActive('/')}>
                <Icon size="large" name="home" />
                Home
              </Menu.Item>
            </Link>

            <Menu.Item header onClick={() => logoutUser(user.email)}>
              <Icon size="large" name="log out" />
              Log out
            </Menu.Item>
          </>
        )}
      </Container>
    </Menu>
  );
}

export default Navbar;
