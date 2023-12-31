import React, { useState, useEffect } from 'react';
import { Grid, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';

function App() {
  const [selectedButton, setSelectedButton] = React.useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(null);
  const [question, setQuestion] = useState(null);
  const [timer, setTimer] = useState(10);
  const [evidence, setEvidence] = useState(0);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/v1/next');
      const questions = response.data;
      console.log(questions);
      setIndex(0);
      setQuestions(questions);
      setQuestion(questions[0].question)
      setSelectedButton("?");
    };

    fetchData();
  }, []);

  useEffect(() => {
    let countdown = null;

    if (index < questions.length) {
      countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 10);
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [index, questions]);

  function bitsToConfidence(bits) {
    const odds = Math.pow(2, bits);
    return odds / (1 + odds);
  }

  const nextQuestion = async () => {
    const allAnswers = [...answers, { question: questions[index], answer: selectedButton }];
    setAnswers(allAnswers);

    const bits = evidence + questions[index].evidence[selectedButton];
    setEvidence(bits);

    const confidence = bitsToConfidence(bits) * 100;
    setConfidence(confidence);

    const next = index + 1;
    setIndex(next);

    if (next < questions.length) {
      setQuestion(questions[next].question);
      setSelectedButton("?");
    }
    else {
      console.log(allAnswers);
    }

  };

  useEffect(() => {
    if (timer === 0) {
      nextQuestion();
    }
  }, [timer]);

  const handleButtonChange = (event, newButton) => {
    setSelectedButton(newButton);
  };

  if (!question) {
    return (
      <p>Loading...</p>
    );
  }

  const buttonStyle = {
    marginRight: 1,
    textTransform: 'none',
    '&.Mui-selected': {
      backgroundColor: 'lightblue',
      '&:hover': {
        backgroundColor: 'lightblue',
      },
    },
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h4">Are You Conscious?</Typography>
      </Grid>
      <Grid item>
        <Typography>{question}</Typography>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          value={selectedButton}
          exclusive
          onChange={handleButtonChange}
        >
          <ToggleButton value="+" sx={buttonStyle}>
            <Typography>
              Yes<br />
              I agree<br />
              Affirmative
            </Typography>
          </ToggleButton>
          <ToggleButton value="?" sx={buttonStyle}>
            <Typography>
              I don't understand<br />
              or I don't know<br />
              or I'm indifferent
            </Typography>
          </ToggleButton>
          <ToggleButton value="-" sx={buttonStyle}>
            <Typography>
              No<br />
              I disagree<br />
              Negative
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <Typography>{timer} seconds until next question</Typography>
      </Grid>
      <Grid item>
        <Typography>evidence: {evidence} bits</Typography>
      </Grid>
      <Grid item>
        <Typography>confidence: {confidence.toFixed(2)}%</Typography>
      </Grid>
    </Grid>
  );
}

export default App;
