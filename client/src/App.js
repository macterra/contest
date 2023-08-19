import React, { useState, useEffect } from 'react';
import { Grid, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';

function App() {
  const [selectedButton, setSelectedButton] = React.useState("mu");
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(null);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/v1/next');
      const questions = response.data;
      console.log(questions);
      setIndex(0);
      setQuestions(questions);
      setQuestion(questions[0].question)
    };

    fetchData();
  }, []);

  const handleButtonChange = (event, newButton) => {
    setSelectedButton(newButton);
  };

  if (!question) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h4">Are You Conscious?</Typography>
      </Grid>
      <Grid item>
        <Typography>{ question }</Typography>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          value={selectedButton}
          exclusive
          onChange={handleButtonChange}
        >
          <ToggleButton value="yes" sx={{ marginRight: 1, textTransform: 'none' }}>
            <Typography>
              Yes<br />
              I agree<br />
              Affirmative
            </Typography>
          </ToggleButton>
          <ToggleButton value="mu" sx={{ marginRight: 1, textTransform: 'none' }}>
            <Typography>
              I don't understand<br />
              or I don't know<br />
              or I'm indifferent
            </Typography>
          </ToggleButton>
          <ToggleButton value="no" sx={{ textTransform: 'none' }}>
            <Typography>
              No<br />
              I disagree<br />
              Negative
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <Typography>a countdown timer</Typography>
      </Grid>
    </Grid>
  );
}

export default App;
