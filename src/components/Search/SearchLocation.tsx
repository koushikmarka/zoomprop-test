import GlobalContext from '@/context/GlobalContext'
import { search, autoComplete } from '@/services'
import { formatAddress, slugify } from '@/utils'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import ExploreIcon from '@mui/icons-material/Explore'
import HomeIcon from '@mui/icons-material/Home'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import TuneIcon from '@mui/icons-material/Tune'
import {
  Box,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Paper,
  Menu,
  Button,
} from '@mui/material'
import { useTheme, styled } from '@mui/material/styles'
import { IconSearch } from '@tabler/icons'
import { useRouter } from 'next/router'
import React, { useState, useContext, useEffect } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

export type SearchLocationProps = {
  callBack?: any
  fullAddress?: any
  selectedLocation?: any
  placeholder?: string
  num?: number
  hideSuggestions?: boolean
  fullCoords?: boolean
  filters?: boolean
  hideFilters?: boolean
  large?: boolean
}

const searchBarPlaceholder: any = {
  region: 'Search by city or town name',
  address: 'Search by address',
  collection: 'Search for collection',
  zipcode: 'Search by zipcode',
}

type LargeProps = {
  large: any
}

const OutlineInputStyle = styled(OutlinedInput)<LargeProps>(
  ({ theme, large }) => ({
    width: large ? '100%' : 434,
    height: large ? '80px' : 'auto',
    fontSize: large ? '1.25rem' : 'auto',
    paddingLeft: large ? 22 : 16,
    paddingRight: large ? 22 : 16,

    '& input': {
      background: 'transparent !important',
      paddingLeft: '4px !important',
      '&::placeholder': {
        fontSize: large ? '1.25rem' : 'auto',
        fontWeight: 'normal',
        letterSpacing: '1px',
      },
    },
    [theme.breakpoints.down('lg')]: {
      width: 250,
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 4,
      background:
        theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff',
    },
  }),
)

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  alignItems: 'center',
  display: 'flex',
  cursor: 'pointer',
  '&:hover': {
    background:
      theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff',
  },
}))

const SearchDropDown = styled(List)<LargeProps>(({ large }) => ({
  maxWidth: large ? 2000 : 434,
  width: large ? '50%' : 434,
  paddingLeft: 16,
  paddingRight: 16,
  position: 'absolute',
  '.MuiListItemButton-root:last-child': {
    marginBottom: '16px',
  },
  '.MuiListItemButton-root:first-child': {
    marginTop: '16px',
  },
}))

const SearchLocation: React.FC<SearchLocationProps> = ({
  callBack,
  selectedLocation,
  placeholder,
  num,

  fullCoords,
  filters,
  hideFilters,
  large,
}: SearchLocationProps) => {
  const theme = useTheme()
  const router = useRouter()

  const gContext = useContext<any>(GlobalContext)
  const token = gContext.user.authToken
  const [address, setAddress] = useState<any>()

  const [searchType, setSearchType] = useState<any>('region')
  const [addressSearch, setAddressSearch] = useState<boolean>(true)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [collections, setCollections] = useState<any>([])

  const [searchOptions, setSearchOptions] = useState<any>({
    componentRestrictions: { country: 'us' },
    strictBounds: true,
    types: ['(cities)'],
  })

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const searchTypes: any = [
    {
      type: 'region',
      icon: <ExploreIcon sx={{ mr: 1 }} />,
      label: 'Search by region',
    },
    {
      type: 'address',
      icon: <HomeIcon sx={{ mr: 1 }} />,
      label: 'Search by address',
    },
    {
      type: 'zipcode',
      icon: <LabelImportantIcon sx={{ mr: 1 }} />,
      label: 'Search by zipcode',
    },
    {
      type: 'collection',
      icon: <CollectionsBookmarkIcon sx={{ mr: 1 }} />,
      label: 'Search for collection',
    },
  ]

  const handleChange = (address: any) => {
    if (address.length >= 1) {
      if (searchType === 'collection') {
        autoComplete(token, { text: address }).then((res) => {
          if (address.length > 1) {
            setCollections(res)
          }
        })
      }
    } else {
      setCollections([])
    }

    setAddress(address)
  }

  useEffect(() => {
    setAddress(
      selectedLocation && selectedLocation.address
        ? selectedLocation.address
        : '',
    )
  }, [selectedLocation])

  useEffect(() => {
    if (searchType !== 'collection') {
      let t: any = {
        componentRestrictions: { country: 'us' },
        strictBounds: true,
      }

      if (searchType === 'region') {
        t.types = ['(cities)']
      }
      if (searchType === 'address') {
        t.types = ['address']
      }
      if (searchType === 'zipcode') {
        t.types = ['(regions)']
      }
      setSearchOptions(t)
    } else {
      setAddressSearch(false)
    }
  }, [searchType])

  const sendData = (address: any) => {
    let obj: any = {
      address: address,
    }

    if (searchType === 'zipcode') {
      search(token, address).then((res) => {
        if (res.city) {
          router.push(`/region/${slugify(res.city)}`)
        }
      })
    }
    if (searchType === 'address') {
      console.log('this is address', address)
      router.push(
        `/property/${slugify(
          address.houseNumber + ' ' + address.street,
        )}/${slugify(address.city)}/${slugify(address.state)}`,
      )
    }
    if (searchType === 'region') {
      geocodeByAddress(address)
        .then((results: any) => {
          return getLatLng(results[0])
        })
        .then((latLng) => {
          obj.coords = latLng

          gContext.setSelectedLocation(obj)

          if (callBack) {
            if (fullCoords) {
              callBack(obj)
            } else {
              callBack(
                `/${obj.address
                  .slice(0, -5)
                  .toLowerCase()
                  .replace(/ /g, '-')
                  .replace(/[^\w-]+/g, '')}`,
              )
            }
          }
        })
        .catch((error) => console.error('Error', error))
    }
  }

  const handleSelect = async (address: any) => {
    const results: any = await geocodeByAddress(address)

    if (searchType === 'address') {
      sendData(formatAddress(results, searchType))
    }
    if (searchType === 'zipcode') {
      sendData(formatAddress(results, searchType))
    }
    if (searchType === 'region') {
      if (address.indexOf(',') > -1) {
        sendData(address)
      }
    }
    setAddress(address)
  }

  const selectType = (type: any) => {
    handleClose()
    setSearchType(type)
  }

  return (
    <>
      <PlacesAutocomplete
        value={address ? address : ''}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <i className="flaticon-381-search-2 search-icon"></i>
            {num}

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <OutlineInputStyle
                large={large}
                startAdornment={
                  <InputAdornment position="start">
                    <IconSearch
                      stroke={large ? 2 : 1.5}
                      size={large ? '1.25rem' : '16px'}
                      color={theme.palette.grey[500]}
                    />
                  </InputAdornment>
                }
                endAdornment={
                  !hideFilters && (
                    <div>
                      <Button
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                      >
                        <TuneIcon
                          sx={{
                            cursor: 'pointer',
                            color: theme.palette.common.white,
                          }}
                        />
                      </Button>

                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        {searchTypes.map((t: any, index: number) => (
                          <Item
                            onClick={() => selectType(t.type)}
                            sx={{ m: 1 }}
                            key={`search-type-${index}`}
                          >
                            {t.icon}
                            {t.label}
                          </Item>
                        ))}
                      </Menu>
                    </div>
                  )
                }
                {...getInputProps({
                  placeholder: placeholder
                    ? placeholder
                    : filters
                    ? searchBarPlaceholder[searchType]
                    : 'Search by city or town name',
                  className: 'location-search-input',
                })}
              />
            </Box>

            <SearchDropDown
              large={large ? true : false}
              className="autocomplete-dropdown-container"
              sx={{
                bgcolor: 'background.paper',
                py: 0,
              }}
            >
              {addressSearch ? (
                <>
                  {suggestions.map((suggestion) => {
                    return (
                      <ListItemButton
                        sx={{ cursor: 'pointer', fontSize: '80px' }}
                        {...getSuggestionItemProps(suggestion)}
                      >
                        <ListItemText
                          sx={{
                            '.MuiTypography-root': {
                              fontSize: large ? '1.35rem' : 'auto',
                              paddingTop: large ? '10px' : 'inherit',
                              paddingBottom: large ? '10px' : 'inherit',
                            },
                          }}
                          primary={suggestion.description}
                        />
                      </ListItemButton>
                    )
                  })}
                </>
              ) : (
                collections.map((collection: any) => {
                  return (
                    <ListItemButton
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        router.push(`/collection/${collection.id}`)
                      }}
                    >
                      <ListItemText primary={collection.name} />
                    </ListItemButton>
                  )
                })
              )}
            </SearchDropDown>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  )
}

export default SearchLocation
