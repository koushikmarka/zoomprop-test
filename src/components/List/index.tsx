import MainCard from '@/components/Cards/ui/MainCard'
import SubCard from '@/components/Cards/ui/SubCard'
import SimpleList from '@/components/List/ui/SimpleList'
import * as React from 'react'

export type ListComponentProps = {
  list?: any
  title?: string
  sectionTitle?: boolean
}

export default function ListComponent({
  list,
  title,
  sectionTitle,
}: ListComponentProps) {
  return (
    <MainCard title={title || ''}>
      {list.map((section: any) => (
        <>
          <SubCard
            title={sectionTitle ? section.name : ''}
            sx={{ p: 0, border: 'none' }}
          >
            <SimpleList listData={section} />
          </SubCard>
        </>
      ))}
    </MainCard>
  )
}
