import { Grid, Typography, Box, Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import useAuthStore from "@stores/authStore";
import welcomeImg from "/src/assets/images/backgrounds/welcome-bg2.png";

const WelcomeCardV2 = () => {
  const user = useAuthStore((state) => state.user);
  const { t } = useTranslation();

  return (
    <Grid
      container
      sx={{
        backgroundColor: "primary.light",
        borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
        p: "30px 25px 20px",
        marginBottom: "30px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Grid item xs={12} sm={6} lg={8} mb={1}>
        <Typography variant="h4">
          {t("statistics.welcomeBack", {
            name: `${user?.username}`,
          })}
        </Typography>
        {/* <Typography
          color="textSecondary"
          variant="h6"
          fontWeight={400}
          mt={0.8}
          mb={0}
        >
          {subtitle}
        </Typography> */}
        {/* <Breadcrumbs
          separator={
            <IconCircle
              size="5"
              fill="textSecondary"
              fillOpacity={"0.6"}
              style={{ margin: "0 5px" }}
            />
          }
          sx={{ alignItems: "center", mt: items ? "10px" : "" }}
          aria-label="breadcrumb"
        ></Breadcrumbs> */}
      </Grid>
      <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
        <Box
          sx={{
            display: { xs: "none", md: "block", lg: "flex" },
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
          }}
          padding={4 }
        >
          <>
            <Box sx={{ top: "8px", position: "absolute" }}>
              <img src={welcomeImg} alt={welcomeImg} width={"165px"} />
            </Box>
          </>
        </Box>
      </Grid>
    </Grid>
  );
};

export default WelcomeCardV2;
