import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  CardContent,
  Grid,
  Divider,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import ChildCard from "@ui/shared/ChildCard";
import { LandingPage, ProductDetails } from "@api/product/product";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import { DefaultCopyField } from "@eisberg-labs/mui-copy-field";
import { IconExternalLink } from "@tabler/icons-react";

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

interface SubValues {
  sub1: string;
  sub2: string;
  sub3: string;
  sub4: string;
}

const ProductLinks = ({ product }: { product: ProductDetails }) => {
  const [value, setValue] = React.useState(0);
  product.offerURL = "https://www.google.com/";
  const initialOfferURL = useMemo(
    () => (product.offerURL ? new URL(product.offerURL) : null),
    [product.offerURL]
  );
  const [offerURL] = useState(initialOfferURL);

  const [subValues, setSubValues] = useState<SubValues>({
    sub1: "",
    sub2: "",
    sub3: "",
    sub4: "",
  });

  const [selectedLandingPage, setSelectedLandingPage] =
    useState<LandingPage | null>(null);

  const [selectedPrelandingPage, setSelectedPrelandingPage] =
    useState<LandingPage | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSubInputChange = (event: any, subKey: any) => {
    const { value } = event.target;
    setSubValues((prevValues) => ({
      ...prevValues,
      [subKey]: value,
    }));
    if (!value || value == "") offerURL?.searchParams.delete(subKey);
    else offerURL?.searchParams.set(subKey, value);
  };

  const handleLandingPageSeleted = (page: LandingPage) => {
    if (page === selectedLandingPage) {
      setSelectedLandingPage(null);
      offerURL?.searchParams.delete("lp");
    } else {
      setSelectedLandingPage(page);
      offerURL?.searchParams.set("lp", "" + page.id);
    }
  };

  const handlePrelandingPageSeleted = (page: LandingPage) => {
    if (page === selectedPrelandingPage) {
      setSelectedPrelandingPage(null);
      offerURL?.searchParams.delete("plp");
    } else {
      setSelectedPrelandingPage(page);
      offerURL?.searchParams.set("plp", "" + page.id);
    }
  };

  return (
    <ChildCard>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "grey.100" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
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
        {/* Reviews Tab */}
        {/* ------------------------------------------- */}
        <TabPanel value={value} index={0}>
          <Grid container>
            <Grid item xs={12} sm={7}>
              <CardContent>
                <Typography variant="h5" mb={3}>
                  {"ORDER"}
                </Typography>
                <Divider />
              </CardContent>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container>
            <Grid item xs={12} sm={7}>
              <CardContent>
                <Typography variant="h5" mb={3}>
                  {"LINK BUILDER"}
                </Typography>
                <Divider />

                <Grid container spacing={3} mt={1}>
                  {Object.keys(subValues).map((subKey) => (
                    <Grid item xs={12} sm={3} key={subKey}>
                      <CustomFormLabel sx={{ mt: 0 }} htmlFor={subKey}>
                        {`Sub${subKey.charAt(subKey.length - 1)}`}
                      </CustomFormLabel>
                      <TextField
                        id={subKey}
                        required
                        placeholder={`Enter sub ${subKey.charAt(
                          subKey.length - 1
                        )}`}
                        variant="outlined"
                        fullWidth
                        value={subValues[subKey as keyof SubValues]}
                        onChange={(event) =>
                          handleSubInputChange(event, subKey)
                        }
                      />
                    </Grid>
                  ))}
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
                      id="offerURL"
                      disabled={true}
                      value={offerURL}
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
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      gap={1}
                      mt={2}
                    >
                      {product.prelandingPages?.map((page, index) => (
                        <Button
                          key={page.id}
                          variant={
                            page === selectedPrelandingPage
                              ? "contained"
                              : "outlined"
                          }
                          color="primary"
                          onClick={() => handlePrelandingPageSeleted(page)}
                        >
                          {`Prelanding page ${index + 1}`}
                          <IconButton
                            edge="end"
                            aria-label="open link"
                            onClick={() => window.open(page.url, "_blank")}
                            color="secondary"
                          >
                            <IconExternalLink />
                          </IconButton>
                        </Button>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} mt={1}>
                    <Typography> {"LANDINGS"}</Typography>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      gap={1}
                      mt={2}
                    >
                      {product.landingPages.map((page, index) => (
                        <Button
                          key={page.id}
                          variant={
                            page === selectedLandingPage
                              ? "contained"
                              : "outlined"
                          }
                          color="primary"
                          onClick={() => handleLandingPageSeleted(page)}
                        >
                          {`Landing page ${index + 1}`}
                          <IconButton
                            edge="end"
                            aria-label="open link"
                            onClick={() => window.open(page.url, "_blank")}
                            color="secondary"
                          >
                            <IconExternalLink />
                          </IconButton>
                        </Button>
                      ))}
                    </Box>
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
