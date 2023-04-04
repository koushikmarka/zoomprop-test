import AnalyticsIcon from '@mui/icons-material/Analytics'
import ArticleIcon from '@mui/icons-material/Article'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import WorkspacesIcon from '@mui/icons-material/Workspaces'

export const AppConfig = {
  site_name: 'Starter',
  title: 'Nextjs Starter',
  nav: {
    pages: [
      { title: 'Collections', url: '/collections', icon: WorkspacesIcon },
      { title: 'The Market', url: '/market', icon: ShowChartIcon },
      { title: 'Articles', url: '/articles', icon: ArticleIcon },
      { title: 'Stats', url: '/stats', icon: AnalyticsIcon },
    ],
    settings: [
      {
        title: 'Settings',
        type: 'url',
        url: '/settings',
        icon: SettingsIcon,
      },
      {
        title: 'Logout',
        type: 'fn',
        function: 'signOutUser',
        icon: LogoutOutlinedIcon,
      },
    ],
  },
  description: 'Zoomprop is great',
  locale: 'en',
}
