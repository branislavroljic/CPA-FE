import { Box, CardContent, Grid, Typography } from "@mui/material";

export interface AnalyticsStatisticCardType {
  icon: string;
  title: string;
  digits: string;
  bgcolor: string;
}

export interface AnalyticsTopCardsProps {
  data: AnalyticsStatisticCardType[];
}

const AnalyticsTopCards = ({ data }: AnalyticsTopCardsProps) => {
  return (
    <Grid container spacing={3} alignItems={"center"} justifyContent={"center"}>
      {data.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <Box bgcolor={topcard.bgcolor + ".light"} textAlign="center">
            <CardContent>
              <img src={topcard.icon} alt={topcard.icon} width="50" />
              <Typography
                color={topcard.bgcolor + ".main"}
                mt={1}
                variant="subtitle1"
                fontWeight={200}
              >
                {topcard.title}
              </Typography>
              <Typography
                color={topcard.bgcolor + ".main"}
                variant="h4"
                fontWeight={600}
              >
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
          {/* </Link> */}
        </Grid>
      ))}
    </Grid>
  );
};

export default AnalyticsTopCards;
