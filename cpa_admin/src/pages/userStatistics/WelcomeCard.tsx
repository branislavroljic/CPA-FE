import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
} from "@mui/material";

import welcomeImg from "/src/assets/images/backgrounds/welcome-bg2.png";
import { useTranslation } from "react-i18next";
import { IconArrowUpRight } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

export interface WelcomeCardProps {
  conversionToday: number;
  conversionRateToday: number;
}

const WelcomeCard = ({
  conversionToday,
  conversionRateToday,
}: WelcomeCardProps) => {
  const { state } = useLocation();

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
                  xs: "center",
                  sm: "left",
                },
              }}
            >
              <Typography variant="h5">{state?.username}</Typography>
              <Stack direction={"row"} gap={2} pt={3}>
                <Box>
                  <Stack direction={"row"} gap={1}>
                    <Typography variant="h2">{conversionToday}</Typography>
                    <IconArrowUpRight color="#39B69A" />
                  </Stack>
                  <Typography variant="caption" color="GrayText">
                    Conversion today
                  </Typography>
                </Box>
                <Divider orientation="vertical" sx={{ color: "black" }} />
                <Box>
                  <Stack direction={"row"} gap={1}>
                    <Typography variant="h2">{conversionRateToday}</Typography>
                    <IconArrowUpRight color="#39B69A" />
                  </Stack>
                  <Typography variant="caption" color="GrayText">
                    Conversion rate today
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item sm={5}>
            <Box mb="-90px">
              <img src={welcomeImg} alt={welcomeImg} width={"300px"} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
