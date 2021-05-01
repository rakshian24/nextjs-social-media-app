import React from 'react';
import axios from 'axios';

const Index = ({ posts }) => {
  return (
    <>
      <h1>HomePage</h1>
      <div>
        {posts &&
          posts.length > 0 &&
          posts.map((post) => <p key={post._id}>{post.title}</p>)}
      </div>
    </>
  );
};

/* getInitialProps are used to get any data before the page loads. 
   Here we can see that the posts data is fetched before the Index page loads and 
   then the Index page can avail the post data*/
Index.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return { posts: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Index;
