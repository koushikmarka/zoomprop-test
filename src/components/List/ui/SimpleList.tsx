// material-ui
import { getPercentage, thousands } from '@/utils'
// assets
import ViewCompactTwoToneIcon from '@mui/icons-material/ViewCompactTwoTone'
import {
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

// ================================|| UI LIST - SIMPLE LIST ||================================ //

export type SimpleListProps = {
  listData?: any
  icon?: boolean
}

export default function SimpleList({ listData, icon }: SimpleListProps) {
  return (
    <List
      component="nav"
      aria-label="main mailbox folders"
      sx={{ p: 0, border: 'none' }}
    >
      {listData?.data?.map((item: any) => (
        <ListItemButton key={`item-${item.name}}`}>
          {icon && (
            <ListItemIcon>
              <ViewCompactTwoToneIcon sx={{ fontSize: '1.3rem' }} />
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.name || item.title + `...`}
            secondary={
              <>
                {listData.type == 'percentage'
                  ? getPercentage(item.attribute)
                  : thousands(item.attribute)}
                {listData.suffix && ` ${listData.suffix}`}
                {item.url && (
                  <Button sx={{ mt: 2 }} variant="contained" href={item.url}>
                    View more
                  </Button>
                )}
              </>
            }
          />
        </ListItemButton>
      ))}
    </List>
  )
}
