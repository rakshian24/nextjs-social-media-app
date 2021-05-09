import React, { useEffect, useState } from 'react';
import { Image, Search, List } from 'semantic-ui-react';
import axios from 'axios';
import cookie from 'js-cookie';
import Router from 'next/router';
import baseUrl from '../../utils/baseUrl';

let cancel;

const SearchBox = () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = async e => {
    const { value } = e.target;
    if (value.trim().length === 0) return setSearchText(value);
    setSearchText(value);
    setLoading(true);
    try {
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const token = cookie.get('token');
      const res = await axios.get(`${baseUrl}/api/search/${value}`, {
        headers: { Authorization: `Bearer ${token}` },
        cancelToken: new CancelToken(canceler => (cancel = canceler)),
      });
      if (res.data.length === 0) {
        results.length > 0 && setResults([]);
        return setLoading(false);
      }
      setResults(res.data);
    } catch (error) {
      console.log('Error While Searching for users.');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (searchText.length === 0 && loading) setLoading(false);
  }, [searchText]);

  return (
    <Search
      onBlur={() => {
        results.length > 0 && setResults([]);
        loading && setLoading(false);
        setSearchText('');
      }}
      loading={loading}
      value={searchText}
      resultRenderer={ResultRenderer}
      results={results}
      onSearchChange={handleChange}
      minCharacters={1}
      onResultSelect={(e, data) => {
        Router.push(`/${data.result.userName}`);
      }}
      placeholder="Search Users"
    />
  );
};

const ResultRenderer = ({ _id, profilePicUrl, name }) => {
  return (
    <List key={_id}>
      <List.Item>
        <Image src={profilePicUrl} alt="profilePic" avatar></Image>
        <List.Content header={name} as="a" />
      </List.Item>
    </List>
  );
};

export default SearchBox;
