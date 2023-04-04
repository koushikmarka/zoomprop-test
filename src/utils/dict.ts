export const filterDict = {
  sortOrder: {
    yoy: 'desc',
    apr: 'desc',
    str: 'desc',
    ltr: 'desc',
  },
  filterKey: {
    yoy: 'yoy1year',
    apr: 'aprLast6Month',
    str: 'strDailyRate',
    ltr: 'capRate',
  },
}

export const addressDict = ['streetAddress', 'city', 'state']

export const nationalAveragesDict = {
  yoy1: {
    name: '1 year yoy',
    type: 'percentage',
  },
  yoy3: {
    name: '3 year yoy',
    type: 'percentage',
  },
  yoy5: {
    name: '5 year yoy',
    type: 'percentage',
  },
  yoy10: {
    name: '10 year yoy',
    type: 'percentage',
  },
  aprLast3Month: {
    name: 'Last 3 months appr',
    type: 'percentage',
  },
  aprLastMonth: {
    name: 'Last 30 days appr',
    type: 'percentage',
  },
  aprLast6Month: {
    name: 'Last 6 months appr',
    type: 'percentage',
  },
  aprNext6Month: {
    name: 'Next 6 months appr',
    type: 'percentage',
  },
  aprNext3Month: {
    name: 'Next 3 months appr',
    type: 'percentage',
  },
  aprNextMonth: {
    name: 'Next 30 days appr',
    type: 'percentage',
  },
  capRate: {
    name: 'Cap Rate',
    type: 'percentage',
  },
  medianListingPrice: {
    name: 'Median Listing Price',
    type: 'thousands',
  },
  pricePerSqft: {
    name: 'Price Per Sqft',
    type: 'thousands',
  },
  rentalEstimate: {
    name: 'Rental Estimate',
    type: 'thousands',
  },
  averageDailyRate: {
    name: 'Average Daily Rate',
    type: 'thousands',
  },
  averageOccupancyRate: {
    name: 'Average Occupancy Rate',
    type: 'percentage',
  },
  averageRevenue: {
    name: 'Average Revenue',
    type: 'thousands',
  },
}

export const trendingTypes = [
  { label: 'YoY', key: 'yoy' },
  { label: 'Appreciation', key: 'apr' },
  { label: 'STR', key: 'str' },
  { label: 'LTR', key: 'ltr' },
]

export const dataViewRegionYoYTemplate = [
  { label: 'Photo', key: 'primaryImageUrl', index: 0 },
  { label: 'Price', key: 'listPrice', type: 'num', prefix: '$' },
  { label: 'Address', key: 'streetAddress' },
  { label: 'City', key: 'city' },
  {
    label: '1 yr',
    key: 'yoy1',
    dynamic: true,
    type: 'percentage',
  },
  {
    label: '3 yr',
    key: 'yoy3',
    dynamic: true,
    type: 'percentage',
  },

  {
    label: '5 yr',
    key: 'yoy5',
    dynamic: true,
    type: 'percentage',
  },

  {
    label: '10 yr',
    key: 'yoy10',
    dynamic: true,
    type: 'percentage',
  },

  { label: 'Beds', key: 'beds' },
  { label: 'Baths', key: 'baths' },
  { label: 'Sqft', key: 'livingArea', type: 'num' },
  { label: '', key: 'listingId', type: 'button' },
]

export const dataViewCollectionsYoYTemplate = [
  { label: 'Name', key: 'name' },
  { label: 'Property Count', key: 'propertyCount', type: 'num' },
  {
    label: '1 mo',
    key: 'yoy1month',
    dynamic: true,
    filter: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: '3 mo',
    key: 'yoy3month',
    dynamic: true,
    filter: true,
    suffix: '%',
    type: 'percentage',
  },

  {
    label: '6 mo',
    key: 'yoy6month',
    dynamic: true,
    filter: true,
    suffix: '%',
    type: 'percentage',
  },

  {
    label: '1 yr',
    key: 'yoy1year',
    dynamic: true,
    filter: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'Date',
    key: 'date',
    filter: true,
    dynamic: true,
    type: 'date',
  },
  {
    label: 'Type',
    key: 'collectionType',
  },
  { label: '', key: 'collectionId', text: 'View Collection', type: 'button' },
]

export const dataViewCollectionYoYTemplate = [
  { label: 'Photo', key: 'imageUrl', index: 0 },
  { label: 'Price', key: 'listPrice', type: 'num', prefix: '$' },
  { label: 'Address', key: 'addressLine' },
  { label: 'City', key: 'addressCity' },
  {
    label: '1 yr',
    key: 'yoy1year',
    dynamic: true,
    type: 'percentage',
  },
  {
    label: '3 yr',
    key: 'yoy3year',
    dynamic: true,
    type: 'percentage',
  },

  {
    label: '5 yr',
    key: 'yoy5year',
    dynamic: true,
    type: 'percentage',
  },

  {
    label: '10 yr',
    key: 'yoy10year',
    dynamic: true,
    type: 'percentage',
  },

  { label: 'Beds', key: 'beds' },
  { label: 'Baths', key: 'baths' },
  { label: 'Sqft', key: 'sqft', type: 'num' },
  { label: '', key: 'listingId', type: 'button' },
]

export const dataViewCollectionAprTemplate = [
  { label: 'Photo', key: 'imageUrl', index: 0 },
  { label: 'Price', key: 'listPrice', type: 'num', prefix: '$' },
  { label: 'Address', key: 'addressLine' },
  { label: 'City', key: 'addressCity' },
  {
    label: 'last 1 Mo',
    key: 'lastMonthApr',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'last 3 Mo',
    key: 'last3MonthApr',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'last 6 Mo',
    key: 'last6MonthApr',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'next 1 Mo',
    key: 'nextMonthApr',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'next 3 Mo',
    key: 'next3MonthApr',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'next 6 Mo',
    key: 'next6MonthApr',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  { label: 'Beds', key: 'beds' },
  { label: 'Baths', key: 'baths' },
  { label: 'Sqft', key: 'sqft', type: 'num' },
  { label: '', key: 'listingId', type: 'button' },
]

export const dataViewCollectionStrTemplate = [
  { label: 'Photo', key: 'imageUrl', index: 0 },
  { label: 'Price', key: 'listPrice', type: 'num', prefix: '$' },
  { label: 'Address', key: 'addressLine' },
  { label: 'City', key: 'addressCity' },
  {
    label: 'Daily Rate',
    key: 'strDailyRate',
    type: 'num',
    prefix: '$',
  },
  {
    label: 'Annual Rev',
    key: 'strMonthlyRevenue',
    type: 'num',
    prefix: '$',
  },
  {
    label: 'Fill Rate',
    key: 'strOccupancyrate',
    type: 'percentage',
    suffix: '%',
  },
  { label: 'Beds', key: 'beds' },
  { label: 'Baths', key: 'baths' },
  { label: 'Sqft', key: 'sqft', type: 'num' },
  { label: '', key: 'listingId', type: 'button' },
]

export const dataViewCollectionLtrTemplate = [
  { label: 'Photo', key: 'imageUrl', index: 0 },
  { label: 'Price', key: 'listPrice', type: 'num', prefix: '$' },
  { label: 'Address', key: 'addressLine' },
  { label: 'City', key: 'addressCity' },
  {
    label: 'Cap Rate',
    key: 'capRate',
    filter: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'Ppsf',
    key: 'pricePerSqft',
    filter: true,
    type: 'num',
    prefix: '$',
  },
  {
    label: 'Square foot',
    filter: true,
    key: 'sqft',
    type: 'num',
  },
  {
    label: 'Rental Estimate ',
    filter: true,
    key: 'rentalEstimate',
    type: 'num',
    prefix: '$',
  },
  { label: '', key: 'listingId', type: 'button' },
]

export const dataViewWholesaleYoYTemplate = [
  { label: 'Price', key: 'taxAssessedValue', type: 'num', prefix: '$' },
  { label: 'Address', key: 'streetAddress' },
  { label: 'State', key: 'addressState' },
  { label: 'City', key: 'city' },
  {
    label: 'ARV',
    key: 'arv',
    prefix: '$',
    type: 'num',
  },

  {
    label: 'Year Built',
    key: 'yearBuilt',
  },

  { label: 'Beds', key: 'beds' },
  { label: 'Baths', key: 'baths' },
  { label: 'Sqft', key: 'livingArea', type: 'num' },
  { label: '', key: 'listingId', type: 'button' },
]

export const dataViewRegionAprTemplate = [
  { label: 'Photo', key: 'primaryImageUrl', index: 0 },
  { label: 'Price', key: 'listPrice', type: 'num', prefix: '$' },
  { label: 'Address', key: 'streetAddress' },
  { label: 'City', key: 'city' },
  {
    label: 'last 1 Mo',
    key: 'months1',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'last 3 Mo',
    key: 'months3',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'last 6 Mo',
    key: 'months6',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'next 1 Mo',
    key: 'nextMonths1',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'next 3 Mo',
    key: 'nextMonths3',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'next 6 Mo',
    key: 'nextMonths6',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  { label: 'Beds', key: 'beds' },
  { label: 'Baths', key: 'baths' },
  { label: 'Sqft', key: 'livingArea', type: 'num' },
  { label: '', key: 'listingId', type: 'button' },
]

export const dataViewRegionStrTemplate = [
  { label: 'Photo', key: 'primaryImageUrl', index: 0 },
  { label: 'Price', key: 'listPrice', type: 'num', prefix: '$' },
  { label: 'Address', key: 'streetAddress' },
  { label: 'City', key: 'city' },
  {
    label: 'Daily Rate',
    key: 'averageDailyRate',
    type: 'num',
    prefix: '$',
  },
  {
    label: 'Annual Rev',
    key: 'annualRevenue',
    type: 'num',
    prefix: '$',
  },
  {
    label: 'Fill Rate',
    key: 'occupancy',
    type: 'percentage',
    suffix: '%',
  },
  { label: 'Beds', key: 'beds' },
  { label: 'Baths', key: 'baths' },
  { label: 'Sqft', key: 'livingArea', type: 'num' },
  { label: '', key: 'listingId', type: 'button' },
]

export const dataViewRegionLtrTemplate = [
  { label: 'Photo', key: 'primaryImageUrl', index: 0 },
  { label: 'Price', key: 'listPrice', type: 'num', prefix: '$' },
  { label: 'Address', key: 'streetAddress' },
  { label: 'City', key: 'city' },
  {
    label: 'Cap Rate',
    key: 'capRate',
    filter: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'Ppsf',
    key: 'ppsf',
    filter: true,
    type: 'num',
    prefix: '$',
  },
  {
    label: 'Square foot',
    filter: true,
    key: 'livingArea',
    type: 'num',
  },
  {
    label: 'Rental Estimate ',
    filter: true,
    key: 'rentEstimate',
    type: 'num',
    prefix: '$',
  },
  { label: '', key: 'listingId', type: 'button' },
]

export const dataForeclosureTemplate = [
  { label: 'Price', key: 'estimatedvalue', type: 'num', prefix: '$' },
  {
    label: 'Tax Assessed Value',
    key: 'taxassessedvalue',
    type: 'num',
    prefix: '$',
  },
  {
    label: 'Improvement Value',
    key: 'taximprovementvalue',
    type: 'num',
    prefix: '$',
  },
  { label: 'Land Value', key: 'taxlandvalue', type: 'num', prefix: '$' },
  { label: 'Annual Tax', key: 'annualtaxamount', type: 'num', prefix: '$' },
  {
    label: 'Type',
    key: 'propertytypecode',
  },
  {
    label: 'Location',
    type: 'array',
    key: ['address', 'fullAddress'],
  },
  {
    label: 'Year Built',
    key: 'yearbuilt',
  },

  { label: 'PPSF', key: 'pricepersqft', type: 'num', prefix: '$' },
  { label: 'Sqft', key: 'buildingsqft', type: 'num' },
  { label: 'Lot Sqft', key: 'lotsqft', type: 'num' },
  { label: '', key: 'listingId', type: 'button' },
]

export const dataViewTrendingYoyTemplate = [
  { label: 'Rank', key: 'rank', index: 0 },
  { label: 'Location', key: 'city' },
  {
    label: '1 yr',
    key: 'yoy1year',
    dynamic: true,
    filter: true,
    type: 'percentage',
  },
  {
    label: '3 yr',
    key: 'yoy3year',
    dynamic: true,
    filter: true,
    type: 'percentage',
  },
  {
    label: '5 yr',
    key: 'yoy5year',
    dynamic: true,
    filter: true,
    type: 'percentage',
  },
  {
    label: '10 yr',
    key: 'yoy10year',
    filter: true,
    dynamic: true,
    type: 'percentage',
  },
  { label: '10 year graph', key: 'priceData', type: 'graph' },
  { label: '', key: 'viewRegion', type: 'button' },
]

export const dataViewTrendingAprTemplate = [
  { label: 'Rank', key: 'rank', index: 0 },
  { label: 'Location', key: 'city' },
  {
    label: 'Last Mo',
    key: 'aprLastMonth',
    type: 'percentage',
    filter: true,
    suffix: '%',
  },
  {
    label: 'Last 3Mo',
    key: 'aprLast3Month',
    type: 'percentage',
    filter: true,
    suffix: '%',
  },
  {
    label: 'Last 6Mo',
    key: 'aprLast6Month',
    type: 'percentage',
    filter: true,
    suffix: '%',
  },
  {
    label: 'Next Mo',
    key: 'aprNextMonth',
    filter: true,
    type: 'percentage',
    suffix: '%',
  },
  {
    label: 'Next 3Mo',
    key: 'aprNext3Month',
    filter: true,
    type: 'percentage',
    suffix: '%',
  },
  {
    label: 'Next 6Mo',
    key: 'aprNext6Month',
    filter: true,
    type: 'percentage',
    suffix: '%',
  },
  { label: 'Graph', key: 'priceData', type: 'graph' },
  { label: '', key: 'viewRegion', type: 'button' },
]

export const dataViewTrendingStrTemplate = [
  { label: 'Rank', key: 'rank', index: 0 },
  { label: 'Location', key: 'city' },
  {
    label: 'Avg Day Rate',
    key: 'strDailyRate',
    filter: true,
    prefix: '$',
    type: 'num',
  },
  {
    label: 'Avg Occupancy Rate',
    key: 'strOccupancyRate',
    filter: true,

    type: 'percentage',
    suffix: '%',
  },
  {
    label: 'Avg Yr Rev',
    filter: true,
    key: 'strMonthlyRevenue',
    type: 'num',
    prefix: '$',
  },
  { label: 'Rental growth stats', key: 'rentalGrowthStats', type: 'graph' },
  { label: '', key: 'viewRegion', type: 'button' },
]

export const dataViewTrendingLtrTemplate = [
  { label: 'Rank', key: 'rank', index: 0 },
  { label: 'Location', key: 'city' },
  {
    label: 'Cap Rate',
    key: 'capRate',
    filter: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'Ppsf',
    key: 'pricePerSqft',
    filter: true,
    type: 'num',
    prefix: '$',
  },
  {
    label: 'Median listing price',
    filter: true,
    key: 'medianListingPrice',
    type: 'num',
    prefix: '$',
  },
  {
    label: 'Rental Estimate ',
    filter: true,
    key: 'rentalEstimate',
    type: 'num',
    prefix: '$',
  },
  { label: '', key: 'viewRegion', type: 'button' },
]

export const dataViewStrTemplate = [
  { label: 'Rank', key: 'rank', index: 0 },
  { label: 'Location', key: 'city' },
  { label: '1 yr', key: '1year', dynamic: true },
  { label: '2 yr', key: '2year', dynamic: true },
  { label: '5 yr', key: '5year', dynamic: true },
  { label: '10 yr', key: '10year', dynamic: true },
]

export const dataViewTrendingPopularTemplate = [
  { label: 'Rank', key: 'rank', index: 0 },
  { label: 'Location', key: 'city' },
  {
    label: 'Last 1 mo',
    key: 'lastMonthAppreciation',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'Last 3 mo',
    key: 'last3monthAppreciation',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'Last 6 mo',
    key: 'last6monthAppreciation',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'Last 1 yr',
    key: 'lastYearAppreciation',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'Next 1 mo',
    key: 'nextMonthAppreciation',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'Next 3 mo',
    key: 'next3monthAppreciation',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
  {
    label: 'Next 6 mo',
    key: 'next6monthAppreciation',
    dynamic: true,
    suffix: '%',
    type: 'percentage',
  },
]

export const dataView: any = {
  trending: {
    yoy: {
      data: [...dataViewTrendingYoyTemplate],
      dynamic: true,
    },
    apr: {
      data: [...dataViewTrendingAprTemplate],
      dynamic: true,
    },
    str: {
      data: [...dataViewTrendingStrTemplate],
      dynamic: true,
    },
    ltr: {
      data: [...dataViewTrendingLtrTemplate],
      dynamic: true,
    },
  },
  trendingDashboard: {
    yoy: {
      data: [...dataViewTrendingYoyTemplate],
      dynamic: true,
    },
  },
  regionData: {
    yoy: {
      data: [...dataViewRegionYoYTemplate],
      dynamic: true,
    },
    apr: {
      data: [...dataViewRegionAprTemplate],
      dynamic: true,
    },
    str: {
      data: [...dataViewRegionStrTemplate],
      dynamic: true,
    },
    ltr: {
      data: [...dataViewRegionLtrTemplate],
      dynamic: true,
    },
  },
  newListings: {
    yoy: {
      data: [...dataViewRegionYoYTemplate],
      dynamic: true,
    },
    apr: {
      data: [...dataViewRegionAprTemplate],
      dynamic: true,
    },
    str: {
      data: [...dataViewRegionStrTemplate],
      dynamic: true,
    },
    ltr: {
      data: [...dataViewRegionLtrTemplate],
      dynamic: true,
    },
  },
  allListings: {
    yoy: {
      data: [...dataViewRegionYoYTemplate],
      dynamic: true,
    },
    apr: {
      data: [...dataViewRegionAprTemplate],
      dynamic: true,
    },
    str: {
      data: [...dataViewRegionStrTemplate],
      dynamic: true,
    },
    ltr: {
      data: [...dataViewRegionLtrTemplate],
      dynamic: true,
    },
  },
  collection: {
    yoy: {
      data: [...dataViewCollectionYoYTemplate],
      dynamic: true,
    },
    apr: {
      data: [...dataViewCollectionAprTemplate],
      dynamic: true,
    },
    str: {
      data: [...dataViewCollectionStrTemplate],
      dynamic: true,
    },
    ltr: {
      data: [...dataViewCollectionLtrTemplate],
      dynamic: true,
    },
  },
  collections: {
    yoy: {
      data: [...dataViewCollectionsYoYTemplate],
      dynamic: true,
    },
    apr: {
      data: [...dataViewRegionAprTemplate],
      dynamic: true,
    },
    str: {
      data: [...dataViewRegionStrTemplate],
      dynamic: true,
    },
  },
  wholesale: {
    yoy: {
      data: [...dataViewWholesaleYoYTemplate],
      dynamic: true,
    },
    apr: {
      data: [...dataViewRegionAprTemplate],
      dynamic: true,
    },
    str: {
      data: [...dataViewRegionStrTemplate],
      dynamic: true,
    },
  },
  foreclosure: {
    yoy: {
      data: [...dataForeclosureTemplate],
      dynamic: true,
    },
  },
}
