import { Box, Card, Icon, styled } from "@mui/material";

// components
import PageContainer from "@ui/container/PageContainer";
import { useTranslation } from "react-i18next";
import { SyntheticEvent, useState } from "react";
import MuiTab, { TabProps } from "@mui/material/Tab";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import BasicPaymentInfoForm from "./BasicPaymentInfoForm";
import WirePaymentInfoForm from "./WirePaymentInfoForm";

import WireLogo from "../../assets/images/svgs/noun-wire-transfer-1414626.svg";
import PayoneerLogo from "../../assets/images/svgs/payoneer-svgrepo-com.svg";
import PaxumLogo from "../../assets/images/svgs/Paxum-logo-1.svg";
import PayPalLogo from "../../assets/images/svgs/paypal.svg";
import WebMoneyLogo from "../../assets/images/svgs/web-money-svgrepo-com.svg";
import CapitalistLogo from "../../assets/images/svgs/cap-logo-black.svg";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import TetherLogo from "../../assets/images/svgs/tether.svg";

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
      title={"Klix Lead"}
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
            variant="scrollable"
            allowScrollButtonsMobile
          >
            <Tab
              value="WIRE"
              // label={
              //   <Box sx={{ display: "flex", alignItems: "center" }}>
              //     <Icon>
              //       <img src={WireLogo} height={32} width={32} />
              //     </Icon>
              //     {/* <TabName>{"WIRE"}</TabName> */}
              //   </Box>
              // }
              icon={<img src={WireLogo} height={36} width={36} />}
            />
            <Tab
              value="PAYONEER"
              // label={
              //   <Box sx={{ display: "flex", alignItems: "center" }}>
              //     <Icon>
              //       <img src={PayoneerLogo} height={32} width={32} />
              //     </Icon>
              //   </Box>
              // }
              icon={<img src={PayoneerLogo} height={54} width={54} />}
            />
            <Tab
              value="WEB_MONEY"
              // label={
              //   <Box sx={{ display: "flex", alignItems: "center" }}>
              //     <Icon>
              //       <img src={WebMoneyLogo} height={32} width={32} />
              //     </Icon>
              //     {/* <TabName>{"WEB MONEY"}</TabName> */}
              //   </Box>
              // }
              icon={<img src={WebMoneyLogo} height={54} width={54} />}
            />
            <Tab
              value="PAYPAL"
              // label={
              //   <Box sx={{ display: "flex", alignItems: "center" }}>
              //     <Icon>
              //       <img src={PayPalLogo} height={32} width={32} />
              //     </Icon>
              //     {/* <TabName>{"PAYPAL"}</TabName> */}
              //   </Box>
              // }
              icon={<img src={PayPalLogo} height={34} width={34} />}
            />
            <Tab
              value="PAXUM"
              // label={
              //   <Box sx={{ display: "flex", alignItems: "center" }}>
              //     <Icon>
              //       <img src={PaxumLogo} height={32} width={32} />
              //     </Icon>
              //     {/* <TabName>{"PAXUM"}</TabName> */}
              //   </Box>
              // }
              icon={<img src={PaxumLogo} height={28} width={44} />}
            />
            <Tab
              value="CAPITALIST"
              // label={
              //   <Box sx={{ display: "flex", alignItems: "center" }}>
              //     <Icon>
              //       <img src={CapitalistLogo} height={32} width={32} />
              //     </Icon>
              //     {/* <TabName>{"CAPITALIST"}</TabName> */}
              //   </Box>
              // }
              icon={<img src={CapitalistLogo} height={54} width={54} />}
            />
            <Tab
              value="BITCOIN"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CurrencyBitcoinIcon />
                  {/* <Icon>
                    <img src={BitcoinLogo} height={32} width={32} />
                  </Icon> */}
                  {/* <TabName>{"BITCOIN"}</TabName> */}
                </Box>
              }
            />
            <Tab
              value="USDT_TRC20"
              // label={
              //   <Box sx={{ display: "flex", alignItems: "center" }}>
              //     <TetherLogo />
              //     {/* <Icon>
              //       <img src={BitcoinLogo} height={32} width={32} />
              //     </Icon> */}
              //     {/* <TabName>{"USDT TRC20"}</TabName> */}
              //   </Box>
              // }
              icon={<img src={TetherLogo} height={30} width={30} />}
            />
            <Tab
              value="USDT_ERC20"
              // label={
              //   <Box sx={{ display: "flex", alignItems: "center" }}>
              //     <TetherLogo />
              //     {/* <Icon>
              //       <img src={BitcoinLogo} height={32} width={32} />
              //     </Icon> */}
              //     {/* <TabName>{"USDT ERC20"}</TabName> */}
              //   </Box>
              // }
              icon={<img src={TetherLogo} height={30} width={30} />}
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value="WIRE">
            <WirePaymentInfoForm />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="PAYONEER">
            <BasicPaymentInfoForm
              title="PAYONEER"
              method="PAYONEER"
              fieldName={"E-mail"}
            />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="WEB_MONEY">
            <BasicPaymentInfoForm
              title="WEB MONEY"
              method="WEB_MONEY"
              fieldName={"Wallet ID"}
            />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="PAYPAL">
            <BasicPaymentInfoForm
              title="PAYPAL"
              method="PAYPAL"
              fieldName={"E-mail"}
            />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="PAXUM">
            <BasicPaymentInfoForm
              title="PAXUM"
              method="PAXUM"
              fieldName={"E-mail"}
            />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="CAPITALIST">
            <BasicPaymentInfoForm
              title="CAPITALIST"
              method="CAPITALIST"
              fieldName={"Wallet ID"}
            />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="BITCOIN">
            <BasicPaymentInfoForm
              title="BITCOIN"
              method="BITCOIN"
              fieldName={"BTC address"}
            />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="USDT_TRC20">
            <BasicPaymentInfoForm
              title="USDT TRC 20"
              method="USDT_TRC20"
              fieldName={"USDT address"}
            />
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="USDT_ERC20">
            <BasicPaymentInfoForm
              title="USDT ERC 20"
              method="USDT_ERC20"
              fieldName={"USDT address"}
            />
          </TabPanel>
        </TabContext>
      </Card>
    </PageContainer>
  );
};

export default PaymentSettingsPage;
