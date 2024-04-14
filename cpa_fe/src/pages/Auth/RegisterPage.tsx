import { SyntheticEvent, useState } from "react";
import { Grid, Box, Card, styled, useMediaQuery } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageContainer from "@ui/container/PageContainer";
import { useTranslation } from "react-i18next";
import Banner from "./Banner";
import TabPanel from "@mui/lab/TabPanel";
import RegisterUserForm from "./RegisterUserForm";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { AccountCircleOutlined } from "@mui/icons-material";
import MuiTab, { TabProps } from "@mui/material/Tab";
import RegisterCompanyForm from "./RegisterCompanyForm";
import BusinessIcon from "@mui/icons-material/Business";
import { GradientCard } from "@layout/LayoutUnauth";

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export default function RegisterPage() {
  const isSmOrLgOrXl = useMediaQuery(
    (theme: any) =>
      theme.breakpoints.up("sm") ||
      theme.breakpoints.up("lg") ||
      theme.breakpoints.up("xl")
  );

  const [value, setValue] = useState<string>("registerUser");
  const [isConfirmMail, setIsConfirmMail] = useState(false);

  const [searchParams] = useSearchParams();

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const isSuccessful = searchParams.get("successful") ?? false;

  const navigate = useNavigate();

  const { t } = useTranslation();

  let minHeight = "100vh";

  if (!isSuccessful && !isConfirmMail)
    minHeight = isSmOrLgOrXl ? "120vh" : "150vh";

  return (
    <PageContainer description="this is Register page">
      <Box
        sx={{
          // backgroundImage: 'url("/assets/backgrounds/background.png")',
          backgroundSize: "cover",
          minHeight: minHeight,
          position: "relative",
          "&:before": {
            content: '""',
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh", padding: isSmOrLgOrXl ? 10 : 4 }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {!isSuccessful ? (
              !isConfirmMail ? (
                <GradientCard
                  elevation={9}
                  sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "550px" }}
                >
                  <TabContext value={value}>
                    <TabList
                      centered={true}
                      onChange={handleChange}
                      aria-label="account-settings tabs"
                      sx={{
                        borderBottom: (theme) =>
                          `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      {" "}
                      <Tab
                        value="registerUser"
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <AccountCircleOutlined />
                            <TabName>{t("company.individual")}</TabName>
                          </Box>
                        }
                      />
                      <Tab
                        value="registerCompany"
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <BusinessIcon />
                            <TabName>{t("company.company")}</TabName>
                          </Box>
                        }
                      />
                    </TabList>
                    <TabPanel sx={{ p: 0 }} value="registerUser">
                      <RegisterUserForm setIsConfirmMail={setIsConfirmMail} />
                    </TabPanel>
                    <TabPanel sx={{ p: 0 }} value="registerCompany">
                      <RegisterCompanyForm
                        setIsConfirmMail={setIsConfirmMail}
                      />
                    </TabPanel>
                  </TabContext>
                </GradientCard>
              ) : (
                <Box
                  sx={{
                    backgroundImage:
                      'url("/assets/backgrounds/background.png")',
                  }}
                  margin={"0 auto"}
                >
                  <Banner
                    title={t("login.checkYourEmail")}
                    subtitle={t("login.checkYourEmailSubtitle")}
                    goToText={t("login.goToLogin")}
                    onGoToClick={() => navigate("/")}
                  />
                </Box>
              )
            ) : (
              <Box
                sx={{
                  backgroundImage: 'url("/assets/backgrounds/background.png")',
                }}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Banner
                  title={t("login.successfulVerification")}
                  subtitle={t("login.successfulVerificationSubtitle")}
                  goToText={t("login.goToLogin")}
                  onGoToClick={() => navigate("/")}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
