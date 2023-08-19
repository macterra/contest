
import React from 'react';
import { Grid, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

function App() {
  const [selectedButton, setSelectedButton] = React.useState("mu");

  const handleButtonChange = (event, newButton) => {
    setSelectedButton(newButton);
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h4">Title</Typography>
      </Grid>
      <Grid item>
        <Typography>A long question goes here</Typography>
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
