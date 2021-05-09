import React, { useState, useRef, useEffect } from 'react';
import { Form, Message, Button, Segment, Divider } from 'semantic-ui-react';
import CommonInputs from '../components/Common/CommonInputs';
import ImageDropZone from '../components/Common/ImageDropZone';
import {
  FooterMessage,
  HeaderMessage,
} from '../components/Common/WelcomeMessage';
import { regexUserName, registerUser } from '../utils/authUser';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import uploadPic from '../utils/uploadPicToCloudinary';
import {setTitle} from "../common/functions";


let cancel;

const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
  });

  const { name, email, password, bio } = user;
  const handleOnChange = e => {
    const { name, value, files } = e.target;
    if (name === 'media') {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErroMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [userName, setUserName] = useState('');
  const [userNameLoading, setUserNameLoading] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState(true);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    setTitle(`Sign Up`);
  });

  const inputRef = useRef();

  const handleOnFormSubmit = async e => {
    e.preventDefault();
    setFormLoading(true);
    let profilePicUrl = null;
    if (media !== null) {
      profilePicUrl = await uploadPic(media);
    }

    if (media !== null && !profilePicUrl) {
      setFormLoading(false);
      return setErroMsg('Error Uploading Image!');
    }
    await registerUser(user, profilePicUrl, setErroMsg, setFormLoading);
  };

  const checkUserName = async () => {
    setUserNameLoading(true);
    try {
      //CancelToken is used for canceling the token which is pending and make a new request.
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const res = await axios.get(`${baseUrl}/api/signup/${userName}`, {
        cancelToken: new CancelToken(canceler => (cancel = canceler)),
      });
      if (errorMsg !== null) setErroMsg(null);
      if (res.data === 'Available') {
        setUserNameAvailable(true);
        setUser(prev => ({ ...prev, userName }));
      }
    } catch (error) {
      setUserNameAvailable(false);
      setErroMsg('UserName Not Available!');
    }
    setUserNameLoading(false);
  };

  useEffect(() => {
    userName === '' ? setUserNameAvailable(false) : checkUserName();
  }, [userName]);

  useEffect(() => {
    //To check if all the required inputs are not empty and if the fields are empty disabling the submit button
    const isUser = Object.values({ name, email, password, bio }).every(item =>
      Boolean(item),
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

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
          <ImageDropZone
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            inputRef={inputRef}
            handleOnChange={handleOnChange}
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
          />
          <Form.Input
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleOnChange}
            fluid
            icon="user"
            iconPosition="left"
            required
          />
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
          <Form.Input
            loading={userNameLoading}
            error={!userNameAvailable}
            label="User Name"
            placeholder="User Name"
            value={userName}
            onChange={e => {
              setUserName(e.target.value);
              if (regexUserName.test(e.target.value)) {
                setUserNameAvailable(true);
              } else {
                setUserNameAvailable(false);
              }
            }}
            fluid
            icon={userNameAvailable ? 'check' : 'close'}
            iconPosition="left"
            required
          />
          <CommonInputs
            user={user}
            handleOnChange={handleOnChange}
            showSocialLinks={showSocialLinks}
            setShowSocialLinks={setShowSocialLinks}
          />
          <Divider hidden />
          <Button
            icon="sign-in"
            content="Sign up"
            color="orange"
            type="submit"
            disabled={submitDisabled || !userNameAvailable}
          />
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
};

export default SignUp;
