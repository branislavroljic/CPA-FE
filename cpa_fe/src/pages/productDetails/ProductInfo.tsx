import { Box, Typography, Tabs, Tab, Stack } from "@mui/material";
import ChildCard from "@ui/shared/ChildCard";
import { ProductDetails } from "@api/product/product";
import { CircleFlag } from "react-circle-flags";
import React from "react";
import { useTranslation } from "react-i18next";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

interface TabProps {
  children: React.ReactNode;
  index: number;
  value?: number;
}

const TabPanel = (props: TabProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const ProductInfo = ({ product }: { product: ProductDetails }) => {
  const [value, setValue] = React.useState(0);

  const { t } = useTranslation();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ChildCard>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "grey.100" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="primary"
            allowScrollButtonsMobile
            scrollButtons
            indicatorColor="primary"
          >
            <Tab label="Info" {...a11yProps(0)} />
            <Tab label={t("products.country")} {...a11yProps(1)} />
          </Tabs>
        </Box>
        {/* ------------------------------------------- */}
        {/* Decription */}
        {/* ------------------------------------------- */}
        <TabPanel value={value} index={0}>
          <Stack direction="row" alignItems="center" gap={4}>
            <Stack>
              <Typography variant="overline" color={"lightgray"}>
                {t("products.approveRate")}
              </Typography>
              <Typography variant="h6">{`${
                product.approve_rate ?? "N/A"
              } %`}</Typography>
            </Stack>
            <Stack>
              <Typography variant="overline" color={"lightgray"}>
                {t("products.conversionRate")}
              </Typography>
              <Typography variant="h6">{`${
                product.conversion_rate ?? "N/A"
              } %`}</Typography>
            </Stack>
            <Stack>
              <Typography variant="overline" color={"lightgray"}>
                {t("products.earnPerClick")}
              </Typography>
              <Typography variant="h6">{`${product.earn_per_click ?? "N/A"} ${
                product.currency
              }`}</Typography>
            </Stack>
            <Stack>
              <Typography variant="overline" color={"lightgray"}>
                {t("products.flow")}
              </Typography>
              <Typography variant="h6">{product.flow ?? "N/A"}</Typography>
            </Stack>
          </Stack>
          <Typography color="textSecondary" mt={4}>
            {product.description}
          </Typography>
        </TabPanel>
        {/* ------------------------------------------- */}
        {/* Reviews Tab */}
        {/* ------------------------------------------- */}
        <TabPanel value={value} index={1}>
          <Stack direction="row" alignItems="center" gap={4}>
            <Stack>
              <Typography variant="overline" color={"lightgray"}>
                {t("products.country")}
              </Typography>
              <CircleFlag
                countryCode={product.country_code.toLowerCase()}
                height="25"
              />
            </Stack>
            <Stack>
              <Typography variant="overline" color={"lightgray"}>
                {t("products.price")}
              </Typography>
              <Typography variant="h6">{`${product.price} ${product.currency}`}</Typography>
            </Stack>
            <Stack>
              <Typography variant="overline" color={"lightgray"}>
                {t("products.payout")}
              </Typography>
              <Typography variant="h6">{`${product.payout} ${product.currency}`}</Typography>
            </Stack>
            <Stack>
              <Typography variant="overline" color={"lightgray"}>
              {t("products.limit")}
              </Typography>
              <Typography variant="h6">{`${product.limit_per_day}/day`}</Typography>
            </Stack>
          </Stack>
        </TabPanel>
      </Box>
    </ChildCard>
  );
};

export default ProductInfo;
