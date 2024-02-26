// material
import { TextField, InputAdornment } from "@mui/material";
import { useProductFilterStore } from "@stores/productStore";
import { IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------
export default function ProductSearch() {
  const { filter, updateFilterNameSearch } = useProductFilterStore();
  const {t} = useTranslation();
  return (
    <TextField
      id="outlined-search"
      placeholder={t('products.search')}
      size="small"
      type="search"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconSearch size="14" />
          </InputAdornment>
        ),
      }}
      fullWidth
      onChange={(e) => updateFilterNameSearch(e.target.value)}
      value={filter.nameSearch ?? ""}
    />
  );
}
