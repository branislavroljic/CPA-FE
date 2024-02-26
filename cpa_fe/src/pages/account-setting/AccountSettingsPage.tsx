import { Box, Card, styled } from "@mui/material";

// components
import PageContainer from "@ui/container/PageContainer";
import { useTranslation } from "react-i18next";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import BasicInfoForms from "./basic-info/BasicInfoForms";
import { SyntheticEvent, useMemo, useState } from "react";
import MuiTab, { TabProps } from "@mui/material/Tab";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { AccountCircleOutlined } from "@mui/icons-material";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import LinkForms from "./social-links/LinkForms";
import CompanyInfoForm from "./company-info/CompanyInfoForm";
import SecurityInfoForm from "./security/SecurityForm";
import SecurityIcon from "@mui/icons-material/Security";
import PaymentsPage from "@pages/payments/PaymentsPage";
import PaymentSettingsPage from "@pages/payment-settings/PaymentSettingsPage";

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

const AccountSetting = () => {
  const { t } = useTranslation();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: t("util.home"),
      },
      {
        title: t("user.accountSettings"),
      },
    ],
    [t]
  );

  const [value, setValue] = useState<string>("account");

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PageContainer
      title={t("user.accountSettings")}
      description="this is Account Setting page"
    >
      {/* breadcrumb */}
      <Breadcrumb title={t("user.accountSettings")} items={BCrumb} />
      {/* end breadcrumb */}

      <Card>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="account-settings tabs"
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Tab
              value="account"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccountCircleOutlined />
                  <TabName>{t("user.general")}</TabName>
                </Box>
              }
            />
            <Tab
              value="links"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ConnectWithoutContactIcon />
                  <TabName>{t("user.links")}</TabName>
                </Box>
              }
            />
            <Tab
              value="security"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SecurityIcon />
                  <TabName>{t("user.security")}</TabName>
                </Box>
              }
            />
            <Tab
              value="info"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ApartmentOutlinedIcon />
                  <TabName>{t("user.companySettings")}</TabName>
                </Box>
              }
            />
            <Tab
              value="payments"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ApartmentOutlinedIcon />
                  <TabName>{t("user.payments")}</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value="account">
            <BasicInfoForms />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="links">
            <LinkForms />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="security">
            <SecurityInfoForm />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="info">
            <CompanyInfoForm />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="payments">
            <PaymentSettingsPage />
          </TabPanel>
        </TabContext>
      </Card>
    </PageContainer>
  );
};

export default AccountSetting;
