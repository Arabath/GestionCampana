import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles'

export default function useBreakpoint(br) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(br));

  return matches
}
