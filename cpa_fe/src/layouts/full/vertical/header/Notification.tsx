import { IconButton, Box, Badge } from "@mui/material";

import { Link } from "react-router-dom";
import { IconBellRinging } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@stores/authStore";
import { getUnreadNotifications } from "@api/user/user";
import { useEffect } from "react";

const Notifications = () => {
  const { user } = useAuthStore();

  const { data, refetch } = useQuery({
    queryKey: ["unread_notifications", user?.id],
    queryFn: () => getUnreadNotifications(user?.id ?? 0),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          color: "text.secondary",
        }}
        to="/notifications"
        component={Link}
      >
        <Badge
          color="primary"
          badgeContent={data?.notReadNotifications}
        >
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default Notifications;
