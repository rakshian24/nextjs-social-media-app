import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logoutUser } from '../../utils/authUser';

const SideMenu = ({
  user: { unreadMessage, unreadNotification, userName, email },
}) => {
  const router = useRouter();
  const isActive = route => router.pathname === route;
  return (
    <>
      <List
        style={{ paddingTop: '1rem' }}
        size="big"
        verticalAlign="middle"
        selection
      >
        <Link href="/">
          <List.Item active={isActive('/')}>
            <Icon name="home" size="large" color={isActive('/') && 'teal'} />
            <List.Content>
              <List.Header content="Home" />
            </List.Content>
          </List.Item>
        </Link>
        <br />

        <Link href="/messages">
          <List.Item active={isActive('/messages')}>
            <Icon
              name={unreadMessage ? 'hand point right' : 'mail outline'}
              size="large"
              color={
                (isActive('/messages') && 'teal') || (unreadMessage && 'orange')
              }
            />
            <List.Content>
              <List.Header content="Messages" />
            </List.Content>
          </List.Item>
        </Link>
        <br />
        <Link href="/notifications">
          <List.Item active={isActive('/notifications')}>
            <Icon
              name={unreadNotification ? 'hand point right' : 'bell outline'}
              size="large"
              color={
                (isActive('/notifications') && 'teal') ||
                (unreadNotification && 'orange')
              }
            />
            <List.Content>
              <List.Header content="Notifications" />
            </List.Content>
          </List.Item>
        </Link>
        <br />
        <Link href={`/${userName}`}>
          <List.Item active={router.query.userName === userName}>
            <Icon
              name="user"
              size="large"
              color={router.query.userName === userName && 'teal'}
            />
            <List.Content>
              <List.Header content="Account" />
            </List.Content>
          </List.Item>
        </Link>
        <br />
        <List.Item onClick={() => logoutUser(email)}>
          <Icon size="large" name="log out" />
          <List.Content>
            <List.Header content="Log out" />
          </List.Content>
        </List.Item>
        <br />
      </List>
    </>
  );
};

export default SideMenu;
