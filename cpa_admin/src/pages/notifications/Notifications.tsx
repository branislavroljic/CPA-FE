import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import AppCard from "@ui/shared/AppCard";
import NoteSidebar from "@ui/notifications/NoteSidebar";
import NoteContent from "@ui/notifications/NoteContent";

const Notifications = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);

  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: "News",
      },
    ],
    []
  );

  return (
    <PageContainer title="News" description="this is Note page">
      <Breadcrumb title={"News"} items={BCrumb} />
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
