// material
import { TextField, InputAdornment } from "@mui/material";
import { useProductFilterStore } from "@stores/productStore";
import { IconSearch } from "@tabler/icons-react";

// ----------------------------------------------------------------------
export default function ProductSearch() {
  const { filter, updateFilterNameSearch } = useProductFilterStore();
  return (
    <TextField
      id="outlined-search"
      placeholder="Search Product"
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
