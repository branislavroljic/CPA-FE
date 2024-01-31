import { useState } from "react";
import { Box } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import AppCard from "@ui/shared/AppCard";
import NoteSidebar from "@ui/notes/NoteSidebar";
import NoteContent from "@ui/notes/NoteContent";
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Notes",
  },
];

const Notifications = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);

  return (
    <PageContainer title="Notes ui" description="this is Note page">
      <Breadcrumb title="Note app" items={BCrumb} />
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
