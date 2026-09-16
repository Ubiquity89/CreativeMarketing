import { RootPage } from '@payloadcms/next/views'

import config from '@payload-config'

export default async function Page({ params, searchParams }: {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  return (
    <RootPage
      config={config}
      importMap={{}}
      params={Promise.resolve(resolvedParams)}
      searchParams={Promise.resolve(resolvedSearchParams)}
    />
  )
}