import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={10}>
          <Grid  xs={6} direction="column" spacing={4}>
              <Typography
                variant="h1"
                sx={{
                  font: 'bold',
                  color: 'GrayText',
                  fontSize: '4rem',
                }}
              >
                {' '}
                {t('error.notFoundMessage')}{' '}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'gray',
                }}
              >
                {t('error.notFoundExplanation')}
              </Typography>
              <Button sx={{marginTop : 4}} variant="contained" onClick={() => navigate('/')}>
                {t('util.goBackHome')}
              </Button>
          </Grid>
          <Grid xs={6}>
            <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
