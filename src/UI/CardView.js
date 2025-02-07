import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import './CardView.css';  // Import custom CSS

const CardView = ({ title, imageUrl, description, handleClick, result_url, news_url,
  player_url, scedule_url, photos_url }) => {

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', width: 500, padding: 2, borderRadius: 8, boxShadow: 3 }}>
      {/* Circular Image */}
      <CardMedia
        component="img"
        height="80"
        image={imageUrl}
        alt={title}
        className="card-image"
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <Typography gutterBottom variant="h5" component="div" className="card-title">
          {title}
        </Typography>
        {/* First row of buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Button variant="contained" sx={{ whiteSpace: 'nowrap' }} onClick={() => handleClick(result_url, 'result')} className="card-button">
            Result
          </Button>
          <Button variant="contained" sx={{ whiteSpace: 'nowrap' }} onClick={() => handleClick(news_url, 'news')} className="card-button">
            News
          </Button>
        </Box>

        {/* Second row of buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, marginTop: 1 }}>
          <Button variant="contained" sx={{ whiteSpace: 'nowrap' }} onClick={() => handleClick(player_url, 'player')} className="card-button">
            Player
          </Button>
          <Button variant="contained" sx={{ whiteSpace: 'nowrap' }} onClick={() => handleClick(photos_url, 'photos')} className="card-button">
            Photos
          </Button>
          <Button variant="contained" sx={{ whiteSpace: 'nowrap' }} onClick={() => handleClick(scedule_url, 'schedule')} className="card-button">
            Schedule
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardView;
