import { useState } from 'react';
import {
  Grid,
  Box,
  Card,
  Typography,
  Stack,
  Button,
  TextField,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from '@ui/container/PageContainer';
import Logo from '@layout/full/shared/logo/Logo';
import { z } from 'zod';
import i18n from '../../i18n';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import CustomFormLabel from '@ui/forms/theme-elements/CustomFormLabel';
import Banner from './Banner';
import { VerifyRecoverPasswordRequest } from '@api/auth';
import { useNotificationStore } from '@stores/notificationStore';

const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const recoverPasswordSchema = z.object({
  verificationCode: z.string({
    required_error: i18n.t('util.required.non', {
      field: i18n.t('login.verificationCodeLabel'),
    }),
  }),
  password: z
    .string({
      required_error: i18n.t('util.required.female', {
        field: i18n.t('login.passwordLabel'),
      }),
    })
    .min(8, {
      message: i18n.t('util.length', {
        field: i18n.t('login.passwordLabel'),
        num: 8,
      }),
    })
    .max(standardMaxLength, {
      message: i18n.t('util.maxLength', {
        field: i18n.t('login.passwordLabel'),
        num: standardMaxLength,
      }),
    }),
});

export default function RecoverPasswordPage() {
  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );
  const [isSuccessful, setIsSuccessful] = useState(false);

  const {
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VerifyRecoverPasswordRequest>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const navigate = useNavigate();

  const registerUser = async (input: VerifyRecoverPasswordRequest) => {
    const baseUrl = new URL(
      'auth/verify-recover-password',
      import.meta.env.VITE_API_URL
    );
    const result = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Accept-language': i18n.language,
        'Content-type': 'application/json',
      },
    });

    if (!result.ok) {
      setError('verificationCode', {
        message: '',
        type: 'server',
      });
      setError('password', {
        message: '',
        type: 'server',
      });
      openNotification({
        isError: true,
        primaryText: i18n.t('util.errorOccurred'),
        secondaryText: await result.text(),
      });
      return;
    }

    setIsSuccessful(true);
    return;
  };

  const { t } = useTranslation();

  return (
    <PageContainer description="this is recover password page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: '100vh' }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {!isSuccessful ? (
              <Card
                elevation={9}
                sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}
              >
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Logo />
                </Box>
                <Box component="form" onSubmit={handleSubmit(registerUser)}>
                  <Stack mb={3}>
                    <Box>
                      <CustomFormLabel htmlFor="verificationCode">
                        {t('login.verificationCodeLabel')}
                      </CustomFormLabel>
                      <Controller
                        control={control}
                        name="verificationCode"
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            error={errors.verificationCode !== undefined}
                            helperText={errors.verificationCode?.message}
                            required
                            variant="outlined"
                            fullWidth
                            id="verificationCode"
                            autoFocus
                            {...field}
                          />
                        )}
                      />
                    </Box>
                    <Box>
                      <CustomFormLabel htmlFor="password">
                        {t('login.passwordLabel')}
                      </CustomFormLabel>
                      <Controller
                        control={control}
                        name="password"
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            error={errors.password !== undefined}
                            helperText={errors.password?.message}
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            type="password"
                            id="password"
                            {...field}
                          />
                        )}
                      />
                    </Box>
                  </Stack>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                  >
                    {t('login.register')}
                  </Button>
                </Box>
                <Stack direction="row" spacing={1} mt={3}>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    {t('login.alreadyHaveAnAccount')}
                  </Typography>
                  <Typography
                    component={Link}
                    to="/login"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    {t('login.login')}
                  </Typography>
                </Stack>
              </Card>
            ) : (
              <Banner
                title={t('login.successfulVerification')}
                subtitle={t('login.successfulVerificationSubtitle')}
                goToText={t('login.goToLogin')}
                onGoToClick={() => navigate('/')}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
