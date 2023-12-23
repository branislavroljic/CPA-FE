import { useTheme } from "@mui/material/styles";
import {
  ListItemText,
  ListItemButton,
  List,
  Divider,
  ListItemIcon,
  Typography,
  Box,
  Avatar,
  Button,
  Stack,
  Chip,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { IconCheck, IconPremiumRights } from "@tabler/icons-react";
import { useProductFilterStore } from "@stores/productStore";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProductFilter = () => {
  const theme = useTheme();

  const {
    filter,
    updateFilterCategories,
    updateFilterCountryCode,
    updateFilterProductType,
    resetFilter,
  } = useProductFilterStore();

  const countries = ["BA", "RS"];

  const productTypes = ["BASIC", "REGULAR", "VIP"];

  const categories = ["ljepota", "zdravlje"];

  const handleCategoryChange = (
    event: SelectChangeEvent<typeof filter.categories>
  ) => {
    const {
      target: { value },
    } = event;
    updateFilterCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <List>
        {/* ------------------------------------------- */}
        {/* Category filter */}
        {/* ------------------------------------------- */}
        {productTypes.map((type, index) => {
          return (
            <ListItemButton
              sx={{ mb: 1, mx: 3 }}
              selected={filter && filter.type === type}
              onClick={() => updateFilterProductType(type)}
              key={index}
            >
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <IconPremiumRights
                  stroke="1.5"
                  size="19"
                  color={
                    type === "BASIC"
                      ? "grey"
                      : type === "REGULAR"
                      ? "green"
                      : "yellow"
                  }
                />
              </ListItemIcon>
              <ListItemText>{type}</ListItemText>
            </ListItemButton>
          );
        })}
        {/* <Box p={3}>
          <Typography variant="subtitle2" fontWeight={600}>
            By category
          </Typography>
          <br />
          <FormControl sx={{ m: 1, width: 300 }}>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={filter.categories}
              onChange={handleCategoryChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category}
                  value={category}
                  style={{ fontWeight: theme.typography.fontWeightMedium }}
                >
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box> */}
        <Divider></Divider>
        <Typography variant="h6" px={3} mt={3} pb={2}>
          By Country
        </Typography>
        {/* ------------------------------------------- */}
        {/* Filter By colors */}
        {/* ------------------------------------------- */}
        <Box p={3} pt={0}>
          <Stack direction={"row"} flexWrap="wrap" gap={1}>
            {countries.map((country: any) => {
              return (
                <Avatar
                  sx={{
                    backgroundColor: country,
                    width: 24,
                    height: 24,
                    cursor: "pointer",
                  }}
                  aria-label={country}
                  key={country}
                  onClick={() => updateFilterCountryCode(country)}
                >
                  {filter.country_code === country ? (
                    <IconCheck size="13" />
                  ) : (
                    ""
                  )}
                </Avatar>
              );
            })}
          </Stack>
        </Box>
        <Divider></Divider>
        {/* ------------------------------------------- */}
        {/* Reset */}
        {/* ------------------------------------------- */}
        <Box p={3}>
          <Button variant="contained" onClick={() => resetFilter()} fullWidth>
            Reset Filters
          </Button>
        </Box>
      </List>
    </>
  );
};

export default ProductFilter;
