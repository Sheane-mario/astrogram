import React, { useState } from 'react';
import { InputBase, IconButton, Paper, Popper, Typography, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const handleSearch = async (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);

    try {
      const response = await fetch(`http://localhost:3001/search?query=${searchTerm}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleResultClick = (type, id) => {
    setSearchResults(null);
    setSearchTerm('');
    if (type === 'user') navigate(`/profile/${id}`);
    else if (type === 'event') navigate(`/event/${id}`);
  };

  return (
    <>
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Astrogram"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Popper open={Boolean(searchResults)} anchorEl={anchorEl} placement="bottom-start">
        <Paper sx={{ p: 2, maxWidth: 400 }}>
          {searchResults && (
            <>
              {/* <Typography variant="h6">Users</Typography> */}
              {searchResults.users.map((user) => (
                <Box key={user._id} onClick={() => handleResultClick('user', user._id)}>
                  <Typography sx={{cursor: 'pointer'}}>{`${user.firstName} ${user.lastName}`}</Typography>
                </Box>
              ))}
              {/* <Typography variant="h6">Events</Typography>
              {searchResults.events.map((event) => (
                <Box key={event._id} onClick={() => handleResultClick('event', event._id)}>
                  <Typography>{event.title}</Typography>
                </Box>
              ))} */}
            </>
          )}
        </Paper>
      </Popper>
    </>
  );
};

export default SearchBar;