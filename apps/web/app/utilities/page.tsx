import { getAllRegistryItems, getCategories } from '@/lib/registry'
import Link from 'next/link'
import { UtilitiesClient } from './utilities-client'

export default function UtilitiesPage() {
  const items = getAllRegistryItems()
  const categories = getCategories()

  return (
    <UtilitiesClient items={items} categories={categories} />
  )
}
