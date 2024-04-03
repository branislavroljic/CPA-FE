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
import useAuthStore from "@stores/authStore";
import { IconArrowUpRight } from "@tabler/icons-react";

export interface WelcomeCardProps {
  conversionToday: number;
  conversionRateToday: number;
}

const WelcomeCard = ({
  conversionToday,
  conversionRateToday,
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
                  xs: "center",
                  sm: "left",
                },
              }}
            >
              <Typography variant="h5">
                {t("statistics.welcomeBack", {
                  name: `${user?.username}`,
                })}
              </Typography>
              <Stack direction={"row"} gap={2} pt={3}>
                <Box>
                  <Stack direction={"row"} gap={1}>
                    <Typography variant="h2">{conversionToday}</Typography>
                    <IconArrowUpRight color="#39B69A" />
                  </Stack>
                  <Typography variant="caption" color="GrayText">
                    {t("statistics.conversionToday")}
                  </Typography>
                </Box>
                <Divider orientation="vertical" sx={{ color: "black" }} />
                <Box>
                  <Stack direction={"row"} gap={1}>
                    <Typography variant="h2">{`${conversionRateToday.toFixed(2)}%`}</Typography>
                    <IconArrowUpRight color="#39B69A" />
                  </Stack>
                  <Typography variant="caption" color="GrayText">
                    {t("statistics.conversionRateToday")}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item sm={5}>
            <Box mb="-50px">
              <img src={welcomeImg} alt={welcomeImg} width={"300px"} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
