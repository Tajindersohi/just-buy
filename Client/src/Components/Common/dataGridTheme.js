import { createTheme } from '@mui/material/styles';
import appTheme from '../../Assets/Theme';

const dataGridTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: `1px solid ${appTheme.colors.border}`,
          backgroundColor: appTheme.colors.contentBackground,
          fontFamily: appTheme.typography.fontFamily,
        },
        columnHeaders: {
          backgroundColor: appTheme.colors.primary,
          color: appTheme.colors.primary,
          fontWeight: appTheme.typography.fontWeight.semiBold,
          fontSize: appTheme.typography.fontSize.base,
        },
        columnSeparator: {
          color: appTheme.colors.border,
        },
        row: {
          '&:hover': {
            backgroundColor: `${appTheme.colors.primary}15`,
          },
        },
        cell: {
          fontSize: appTheme.typography.fontSize.sm,
          color: appTheme.colors.textPrimary,
          borderBottom: `1px solid ${appTheme.colors.border}`,
        },
        footerContainer: {
          backgroundColor: appTheme.colors.light,
          borderTop: `1px solid ${appTheme.colors.border}`,
        },
        toolbarContainer: {
          backgroundColor: appTheme.colors.background,
          borderBottom: `1px solid ${appTheme.colors.border}`,
        },
      },
    },
  },
});

export default dataGridTheme;
