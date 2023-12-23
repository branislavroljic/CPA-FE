import React from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Stack,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import ChildCard from "@ui/shared/ChildCard";
import { ProductDetails } from "@api/product/product";
import { CircleFlag } from "react-circle-flags";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@ui/forms/theme-elements/CustomTextField";
import { t } from "i18next";
import { DefaultCopyField } from "@eisberg-labs/mui-copy-field";

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

const ProductLinks = ({ product }: { product: ProductDetails }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
            <Tab label="Order" {...a11yProps(0)} />
            <Tab label="Link builder" {...a11yProps(1)} />
            <Tab label="Api request" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {/* ------------------------------------------- */}
        {/* Decription */}
        {/* ------------------------------------------- */}
        <TabPanel value={value} index={0}></TabPanel>
        {/* ------------------------------------------- */}
        {/* Reviews Tab */}
        {/* ------------------------------------------- */}
        <TabPanel value={value} index={1}>
          <Grid container>
            <Grid item xs={12} sm={7}>
              <CardContent>
                <Typography variant="h5" mb={3}>
                  {"LINK BUILDER"}
                </Typography>
                <Divider />

                <Grid container spacing={3} mt={1}>
                  <Grid item xs={12} sm={3}>
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="firstname"
                    >
                      {t("user.firstname")}
                    </CustomFormLabel>

                    <CustomTextField
                      id="name"
                      required
                      placeholder={"Enter sub 1"}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="firstname"
                    >
                      {t("user.firstname")}
                    </CustomFormLabel>

                    <CustomTextField
                      id="name"
                      required
                      placeholder={"Enter sub 1"}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="firstname"
                    >
                      {t("user.firstname")}
                    </CustomFormLabel>

                    <CustomTextField
                      id="name"
                      required
                      placeholder={"Enter sub 1"}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="firstname"
                    >
                      {t("user.firstname")}
                    </CustomFormLabel>

                    <CustomTextField
                      id="name"
                      required
                      placeholder={"Enter sub 1"}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="offerURL"
                    >
                      {"Offer URL"}
                    </CustomFormLabel>
                    <DefaultCopyField
                      disabled={true}
                      value={product.offerURL}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>

            <Grid item xs={12} sm={5}>
              <CardContent>
                <Typography variant="h5" mb={3}>
                  {"PAGES"}
                </Typography>
                <Divider />
                <Grid container>
                  <Grid item xs={12} sm={6} mt={1}>
                    <Typography>{"PRELANDINGS"}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} mt={1}>
                    {"LANDINGS"}
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </ChildCard>
  );
};

export default ProductLinks;
