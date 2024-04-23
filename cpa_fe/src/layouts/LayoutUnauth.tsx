import { Card, TextField } from "@mui/material";
import useAuthStore from "@stores/authStore";
import { useNotificationStore } from "@stores/notificationStore";
import Notification from "@ui/Notification";
import { Navigate, Outlet } from "react-router-dom";
import { styled } from "@mui/system";

const borderRadius = 16;

type GradientProps = {
  gradientColors?: string[];
};

export const GradientCard = styled(Card)<GradientProps>(
  ({ gradientColors = ["#E3A02B", "#3A77F5"] }) => ({
    border: "none",
    outline: "none",
    position: "relative",
    borderRadius,
    background: `white`,
    backgroundColor: "transparent",

    "&::before": {
      content: '""',
      position: "absolute",
      top: "1px",
      left: "2px",
      right: "2px",
      bottom: "1px",
      zIndex: -1,
      borderRadius,
      backgroundColor: "black",
    },
  })
);

export const GradientTextField = styled(TextField)(({ theme }) => ({
  border: "none",
  outline: "none",
  position: "relative",
  borderRadius: 8,
  background: `linear-gradient(278.24deg, rgba(58, 117, 252, 0.4) 0%, rgba(58, 117, 252, 0) 100%)`,

  "& fieldset": { border: "none" },
}));

export default function LayoutUnauth() {
  const valid = useAuthStore((state) => state.isValid);

  const { isOpen, data, closeNotification } = useNotificationStore();

  if (valid) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <div
      // className="flex h-screen w-full items-center justify-center bg-blue-50"
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("/assets/backgrounds/background.png")',
        backgroundAttachment: "fixed",
        backgroundPosition: "right bottom",
        backgroundColor: "black",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <Outlet />
      <Notification
        isShowing={isOpen}
        primaryText={data.primaryText}
        secondaryText={data.secondaryText}
        isError={data.isError}
        closeNotification={closeNotification}
      />
    </div>
  );
}
