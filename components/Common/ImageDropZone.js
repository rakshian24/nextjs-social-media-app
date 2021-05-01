import React from 'react';
import { Form, Segment, Image, Icon, Header } from 'semantic-ui-react';

const ImageDropZone = ({
  highlighted,
  setHighlighted,
  inputRef,
  handleOnChange,
  mediaPreview,
  setMediaPreview,
  setMedia,
}) => {
  return (
    <>
      <Form.Field>
        <Segment placeholder basic secondary>
          <input
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            onChange={handleOnChange}
            name="media"
            ref={inputRef}
          />
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setHighlighted(true);
              console.log('DataTransfer = ', e.dataTransfer.files);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setHighlighted(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setHighlighted(true);
              const droppedFile = Array.from(e.dataTransfer.files);
              setMedia(droppedFile[0]);
              setMediaPreview(URL.createObjectURL(droppedFile[0]));
            }}
          >
            {mediaPreview === null ? (
              <>
                <Segment color={highlighted ? 'green' : ''} placeholder basic>
                  <Header icon>
                    <Icon
                      name="file image outline"
                      style={{ cursor: 'pointer' }}
                      onClick={() => inputRef.current.click()}
                    />
                    Drag and drop or click to upload image.
                  </Header>
                </Segment>
              </>
            ) : (
              <>
                <Segment color="green" basic placeholder>
                  <Image
                    src={mediaPreview}
                    size="medium"
                    centered
                    style={{ cursor: 'pointer' }}
                    onClick={() => inputRef.current.click()}
                  />
                </Segment>
              </>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  );
};

export default ImageDropZone;