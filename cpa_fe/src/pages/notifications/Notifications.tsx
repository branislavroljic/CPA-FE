import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import AppCard from "@ui/shared/AppCard";
import NoteSidebar from "@ui/notifications/NoteSidebar";
import NoteContent from "@ui/notifications/NoteContent";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);
  const { t } = useTranslation();

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: t("notification.title"),
      },
    ],
    [t]
  );

  return (
    <PageContainer title="Pure Sell" description="this is Note page">
      <Breadcrumb title={t("notification.title")} items={BCrumb} />
      <AppCard>
        {isMobileSidebarOpen ? (
          <NoteSidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
        ) : (
          <></>
        )}

        <Box flexGrow={1}>
          <NoteContent
            toggleNoteSidebar={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
          />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Notifications;
