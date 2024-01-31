
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List, useMediaQuery } from '@mui/material';
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import { useCustomizerStore } from '@stores/customizerStore';
import { useTranslation } from 'react-i18next';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useCustomizerStore();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu: any = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : '';
  // const dispatch = useDispatch();

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems(t).map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return (
              <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
            );

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => customizer.toggleMobileSidebar()}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => customizer.toggleMobileSidebar()}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
