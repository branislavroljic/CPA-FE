import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
} from '@mui/material';

import welcomeImg from '/src/assets/images/backgrounds/welcome-bg2.png';
import { useTranslation } from 'react-i18next';
import useAuthStore from '@stores/authStore';
import { IconArrowUpRight } from '@tabler/icons-react';

export interface WelcomeCardProps {
  totalSpentByWorkers: string;
  totalDiscountSavingsByWorkers: string;
}

const WelcomeCard = ({
  totalSpentByWorkers: totalIncome,
  totalDiscountSavingsByWorkers: totalDiscountSavings,
}: WelcomeCardProps) => {
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();

  return (
    <Card
      elevation={0}
      sx={{ backgroundColor: (theme) => theme.palette.primary.light, py: 0 }}
    >
      <CardContent sx={{ py: 2 }}>
        <Grid container spacing={5} justifyContent="space-between">
          <Grid item sm={6} display="flex" alignItems="center">
            <Box
              sx={{
                textAlign: {
                  xs: 'center',
                  sm: 'left',
                },
              }}
            >
              <Typography variant="h5">
                {t('statistic.welcomeBack', {
                  name: `${user?.firstname} ${user?.lastname}`,
                })}
              </Typography>
              <Stack direction={'row'} gap={2} pt={3}>
                <Box>
                  <Stack direction={'row'} gap={1}>
                    <Typography variant="h2">{totalIncome}</Typography>
                    <IconArrowUpRight color="#39B69A" />
                  </Stack>
                  <Typography variant="caption" color="GrayText">
                    {t('statistic.totalSpentByWorkers')}
                  </Typography>
                </Box>
                <Divider orientation="vertical" sx={{ color: 'black' }} />
                <Box>
                  <Stack direction={'row'} gap={1}>
                    <Typography variant="h2">{totalDiscountSavings}</Typography>
                    <IconArrowUpRight color="#39B69A" />
                  </Stack>
                  <Typography variant="caption" color="GrayText">
                    {t('statistic.totalDiscountSavingsByWorkers')}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item sm={5}>
            <Box mb="-90px">
              <img src={welcomeImg} alt={welcomeImg} width={'300px'} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
