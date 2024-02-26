import { Box, Card, styled } from "@mui/material";

// components
import PageContainer from "@ui/container/PageContainer";
import { useTranslation } from "react-i18next";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import { SyntheticEvent, useMemo, useState } from "react";
import MuiTab, { TabProps } from "@mui/material/Tab";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import BasicPaymentInfoForm from "./BasicPaymentInfoForm";
import WirePaymentInfoForm from "./WirePaymentInfoForm";

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

const PaymentSettingsPage = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState<string>("WIRE");

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PageContainer
      title={t("payments.settings")}
      description="this is Payment Settings page"
    >
      <Card>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="payment-settings tabs"
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Tab
              value="WIRE"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TabName>{"WIRE"}</TabName>
                </Box>
              }
            />
            <Tab
              value="PAYONEER"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TabName>{"PAYONEER"}</TabName>
                </Box>
              }
            />
            <Tab
              value="WEB_MONEY"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TabName>{"WEB MONEY"}</TabName>
                </Box>
              }
            />
            <Tab
              value="PAYPAL"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TabName>{"PAYPAL"}</TabName>
                </Box>
              }
            />
            <Tab
              value="PAXUM"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TabName>{"PAXUM"}</TabName>
                </Box>
              }
            />
            <Tab
              value="CAPITALIST"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TabName>{"CAPITALIST"}</TabName>
                </Box>
              }
            />
            <Tab
              value="BITCOIN"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TabName>{"BITCOIN"}</TabName>
                </Box>
              }
            />
            <Tab
              value="USDT_TRC20"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TabName>{"USDT_TRC20"}</TabName>
                </Box>
              }
            />
            <Tab
              value="USDT_ERC20"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TabName>{"USDT_ERC20"}</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value="WIRE">
            <WirePaymentInfoForm />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="PAYONEER">
            <BasicPaymentInfoForm method="PAYONEER" fieldName={"E-mail"} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="WEB_MONEY">
            <BasicPaymentInfoForm method="WEB_MONEY" fieldName={"Wallet ID"} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="PAYPAL">
            <BasicPaymentInfoForm method="PAYPAL" fieldName={"E-mail"} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="PAXUM">
            <BasicPaymentInfoForm method="PAXUM" fieldName={"E-mail"} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="CAPITALIST">
            <BasicPaymentInfoForm method="CAPITALIST" fieldName={"E-mail"} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="BITCOIN">
            <BasicPaymentInfoForm method="BITCOIN" fieldName={"E-mail"} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="USDT_TRC20">
            <BasicPaymentInfoForm method="USDT_TRC20" fieldName={"E-mail"} />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="USDT_ERC20">
            <BasicPaymentInfoForm method="USDT_ERC20" fieldName={"E-mail"} />
          </TabPanel>
        </TabContext>
      </Card>
    </PageContainer>
  );
};

export default PaymentSettingsPage;
