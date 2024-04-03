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
  Stack,
  Chip,
} from "@mui/material";
import ChildCard from "@ui/shared/ChildCard";
import { LandingPage, ProductDetails } from "@api/product/product";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import { DefaultCopyField } from "@eisberg-labs/mui-copy-field";
import { IconExternalLink } from "@tabler/icons-react";
import OrderForm from "./OrderForm";
import useAuthStore from "@stores/authStore";
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

interface SubValues {
  sub1: string;
  sub2: string;
  sub3: string;
  sub4: string;
}

const ProductLinks = ({ product }: { product: ProductDetails }) => {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const initialOfferURL = useMemo(() => {
    let url = null;
    if (product.offerUrl) {
      url = new URL(product.offerUrl);
      url.searchParams.set("prelp", "" + -1);
    }
    return url;
  }, [product.offerUrl]);
  const [offerURL] = useState(initialOfferURL);

  const [subValues, setSubValues] = useState<SubValues>({
    sub1: "",
    sub2: "",
    sub3: "",
    sub4: "",
  });

  const [selectedLandingPage, setSelectedLandingPage] =
    useState<LandingPage | null>(null);

  const [selectedPrelandingPage, setSelectedPrelandingPage] = useState<
    LandingPage | number
  >(-1);

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
      offerURL?.searchParams.set("lp", "" + page.landingIdOnServer);
    }
  };

  const handlePrelandingPageSeleted = (page: LandingPage) => {
    if (page === selectedPrelandingPage) {
      setSelectedPrelandingPage(-1);
      // offerURL?.searchParams.delete("prelp");
      offerURL?.searchParams.set("prelp", "" + -1);
    } else {
      setSelectedPrelandingPage(page);
      offerURL?.searchParams.set("prelp", "" + page.landingIdOnServer);
    }
  };

  return (
    <ChildCard>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "grey.100" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs exam e"
            textColor="primary"
            allowScrollButtonsMobile
            scrollButtons
            indicatorColor="primary"
          >
            <Tab label="Link builder" {...a11yProps(0)} />
            <Tab label="Api request" {...a11yProps(1)} />
            <Tab label= {t("order.order")} {...a11yProps(2)} />
          </Tabs>
        </Box>
        {/* ------------------------------------------- */}
        {/* Reviews Tab */}
        {/* ------------------------------------------- */}
        <TabPanel value={value} index={2}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <CardContent>
                <Typography variant="h5" mb={3}>
                  {t("order.order")}
                </Typography>
                <Divider />
                <OrderForm product={product} />
              </CardContent>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={0}>
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
        <TabPanel value={value} index={1}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="h5" mb={3}>
                  {"API REQUEST"}
                </Typography>
                <Divider />

                <Grid container spacing={3} mt={1}>
                  <Grid item xs={12} sm={12} lg={12}>
                    <Typography>REQUEST BODY PARAMS</Typography>
                    <pre
                      style={{
                        backgroundColor: "rgb(242, 244, 244)",
                        whiteSpace: "pre-line",
                        padding: "20px",
                        fontSize: "small",
                      }}
                    >
                      {`"apiKey": "${user?.apiKey}", 
                      "name":STRING ("Donald"),
                      "phoneNumber": STRING || NUMBER ("479-200-8330" || 4792008330), 
                      "productId": "653",
                      "countryCode": STRING ("US"), 
                      "baseUrl": STRING ("https || http"://domain.com), 
                      "referrer": STRING ("https ||http"://domain.com?page=order), 
                      "userIp": STRING ("20.174.42.73")`}
                    </pre>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Typography>REQUEST EXAMPLE</Typography>
                      <Chip label="HTTP" color="primary" />
                    </Stack>
                    <pre
                      style={{
                        backgroundColor: "rgb(242, 244, 244)",
                        whiteSpace: "pre-line",
                        padding: "20px",
                        fontSize: "small",
                      }}
                    >
                      {` POST /api/v1/orders/create/ HTTP/1.1
                          Host: https://api.klixlead.com
                          Content-Type: application/json
                          {
                          "apiKey": "54a42b948d9c93bcc638eaa4ff550836",
                          "name": "INSERT_NAME_FROM_FORM",
                          "phoneNumber": "INSERT_PHONE_FROM_FORM",
                          "offerId": "653",
                          "countryCode": "INSERT_COUNTRY_CODE_FROM_LP",
                          "baseUrl": "INSERT_YOUR_DOMAIN",
                          "referrer": "INSERT_YOUR_REFERRER_DOMAIN",
                          "userIp": "INSERT_CLIENT_IP_FROM_LP"
                          }`}
                    </pre>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="h5" mb={3}>
                  {"API RESPONSE"}
                </Typography>
                <Divider />
                <Grid container spacing={3} mt={1}>
                  <Grid item xs={12} sm={12} lg={12}>
                    <Typography>RESPONSE CODE 200</Typography>
                    <pre
                      style={{
                        backgroundColor: "rgb(242, 244, 244)",
                        whiteSpace: "pre-line",
                        padding: "20px",
                        fontSize: "small",
                      }}
                    >
                      {`{
                          "type": "success",
                          "orderId": RETURNED_ORDER_ID
                        }`}
                    </pre>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <Typography>RESPONSE CODE 400</Typography>
                    <pre
                      style={{
                        backgroundColor: "rgb(242, 244, 244)",
                        whiteSpace: "pre-line",
                        padding: "20px",
                        fontSize: "small",
                      }}
                    >
                      {`{
                      "type": "error",
                      "field": "FIRST_FOUND_INVALID_FIELD",
                      "reason": "the field is incorrect||empty||wrong format||not found"
                    }`}
                    </pre>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <Typography>RESPONSE CODE 405</Typography>
                    <pre
                      style={{
                        backgroundColor: "rgb(242, 244, 244)",
                        whiteSpace: "pre-line",
                        padding: "20px",
                        fontSize: "small",
                      }}
                    >
                      {`Only POST method allowed`}
                    </pre>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <Typography>RESPONSE CODE 406</Typography>
                    <pre
                      style={{
                        backgroundColor: "rgb(242, 244, 244)",
                        whiteSpace: "pre-line",
                        padding: "20px",
                        fontSize: "small",
                      }}
                    >
                      {`Wrong request body (form data, binary...). Only JSON body allowed`}
                    </pre>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <Typography>RESPONSE CODE 500</Typography>
                    <pre
                      style={{
                        backgroundColor: "rgb(242, 244, 244)",
                        whiteSpace: "pre-line",
                        padding: "20px",
                        fontSize: "small",
                      }}
                    >
                      {`Something went very wrong!!!`}
                    </pre>
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
