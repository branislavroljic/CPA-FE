import { useEffect, useState } from 'react';
import {
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Chip,
  Stack,
  Divider,
} from '@mui/material';

import { IconBellRinging } from '@tabler/icons-react';
import Scrollbar from '@ui/custom-scroll/Scrollbar';
import useAuthStore from '@stores/authStore';
import { Notification } from '@api/notification';
import { useTranslation } from 'react-i18next';
import pointsSvg from '/src/assets/images/svgs/goldcoin.svg';

const Notifications = () => {
  // const [listening, setListening] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuthStore((state) => state);
  let eventSource: EventSource | undefined = undefined;
  const [anchorEl2, setAnchorEl2] = useState(null);

  const { t } = useTranslation();

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    eventSource = new EventSource(
      new URL('http://localhost:5000/sse-server/notifications/' + user?.id)
    );

    eventSource.addEventListener('Notification', (event) => {
      const notification = JSON.parse(event.data) as Notification;
      if (notification.userId === user?.id)
        setNotifications((notifications) => [...notifications, notification]);
      // console.log('received:', notification);
      // console.log('notifications: ' + notifications.length);
      // setData(result)
    });

    eventSource.onopen = (event) => {
      console.log('connection opened');
    };
    // setListening(true);

    return () => {
      eventSource?.close();
    };
  }, []);

  return (
    <Box>
      <IconButton
        size="large"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          color: anchorEl2 ? 'primary.main' : 'text.secondary',
        }}
        onClick={handleClick2}
      >
        {notifications.length > 0 ? (
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        ) : (
          <IconBellRinging size="21" stroke="1.5" />
        )}
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Stack
          direction="row"
          py={2}
          px={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{t('util.notifications')}</Typography>
          <Chip
            label={`${notifications.length} ${t('util.new')}`}
            color="primary"
            size="small"
          />
        </Stack>
        <Divider variant="middle" />
        <Scrollbar sx={{ height: '385px' }}>
          {notifications.map((notification, index) => (
            <Box key={index}>
              <MenuItem sx={{ py: 2, px: 4 }}>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    src={pointsSvg}
                    sx={{
                      width: 48,
                      height: 48,
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="subtitle2"
                      color="textPrimary"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: '240px',
                      }}
                    >
                      {notification.message}
                    </Typography>
                    {/* <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: '240px',
                      }}
                      noWrap
                    >
                      {notification.subtitle}
                    </Typography> */}
                  </Box>
                </Stack>
              </MenuItem>
              <Divider
                key={index + '_divider'}
                variant="inset"
                component="li"
              />
            </Box>
          ))}
        </Scrollbar>
        {/* <Box p={3} pb={1}>
          <Button
            to="/apps/email"
            variant="outlined"
            component={Link}
            color="primary"
            fullWidth
          >
            See all Notifications
          </Button>
        </Box> */}
      </Menu>
    </Box>
  );
};

export default Notifications;
