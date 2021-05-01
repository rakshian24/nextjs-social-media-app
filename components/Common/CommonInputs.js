import React from 'react';
import {
  Form,
  Message,
  Button,
  Segment,
  TextArea,
  Divider,
  ButtonOr,
} from 'semantic-ui-react';

const CommonInputs = ({
  user: { bio, facebook, twitter, youtube, instagram },
  handleOnChange,
  showSocialLinks,
  setShowSocialLinks,
}) => {
  return (
    <>
      <Form.Field
        label="Bio"
        required
        control={TextArea}
        name="bio"
        value={bio}
        onChange={handleOnChange}
        placeholder="Bio"
      />
      <Button
        content="Add Social Links"
        color="red"
        icon="at"
        type="button"
        onClick={() => setShowSocialLinks(!showSocialLinks)}
      />

      {showSocialLinks && (
        <>
          <Divider />
          <Form.Input
            icon="facebook f"
            iconPosition="left"
            name="facebook"
            value={facebook}
            onChange={handleOnChange}
          />
          <Form.Input
            icon="twitter"
            iconPosition="left"
            name="twitter"
            value={twitter}
            onChange={handleOnChange}
          />
          <Form.Input
            icon="instagram"
            iconPosition="left"
            name="instagram"
            value={instagram}
            onChange={handleOnChange}
          />
          <Form.Input
            icon="youtube"
            iconPosition="left"
            name="youtube"
            value={youtube}
            onChange={handleOnChange}
          />
          <Message
            icon="attention"
            info
            size="small"
            header="Social Media Links are optional!"
          />
        </>
      )}
    </>
  );
};

export default CommonInputs;
