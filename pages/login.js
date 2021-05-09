import React, { useEffect, useState } from 'react';
import {
  FooterMessage,
  HeaderMessage,
} from '../components/Common/WelcomeMessage';
import { Form, Message, Button, Segment, Divider } from 'semantic-ui-react';
import { loginUser } from '../utils/authUser';
import cookie from 'js-cookie';
import { setTitle } from '../common/functions';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;
  const [errorMsg, setErroMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setTitle(`Login`);
  });

  useEffect(() => {
    const userEmail = cookie.get('email');
    if (userEmail) {
      setUser(prev => ({ ...prev, email: userEmail }));
    }
  }, []);

  useEffect(() => {
    const isFormDataFilled = Object.values(user).every(field => Boolean(field));
    isFormDataFilled ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const handleOnFormSubmit = async e => {
    e.preventDefault();
    setFormLoading(true);
    await loginUser(user, setErroMsg, setFormLoading);
  };

  const handleOnChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleOnFormSubmit}
      >
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErroMsg(null)}
        />
        <Segment>
          <Form.Input
            label="Email"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={handleOnChange}
            fluid
            icon="envelope"
            iconPosition="left"
            type="email"
            required
          />
          <Form.Input
            label="Password"
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={handleOnChange}
            fluid
            icon={{
              name: 'eye',
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition="left"
            type={showPassword ? 'text' : 'password'}
            required
          />

          <Divider hidden />
          <Button
            icon="sign-in"
            content="Sign In"
            color="orange"
            type="submit"
            disabled={submitDisabled}
          />
        </Segment>
      </Form>

      <FooterMessage />
    </>
  );
};

export default Login;
