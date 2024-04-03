import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useNotVerifiedModalStore } from "@stores/notVerifiedModalStore";
import { USER_KEY } from "@api/auth";
import useAuthStore from "@stores/authStore";

export default function NotVerifiedModal() {
  const { isOpen, closeModal } = useNotVerifiedModalStore();
  const { deleteUser } = useAuthStore((state) => state);

  const handleCloseModal = () => {
    deleteUser();
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
    closeModal();
  };

  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleCloseModal()}
      fullWidth
      maxWidth="sm"
      sx={{
        backdropFilter: "blur(6px)",
      }}
    >
      <DialogTitle
        display={"flex"}
        gap={1}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {t("login.accountVerification")}
      </DialogTitle>

      <Divider />
      <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="subtitle1">
          {t("login.notVerifiedOrApproved")}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button color="primary" size="large" onClick={() => handleCloseModal()}>
          {t("login.backToLogin")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
