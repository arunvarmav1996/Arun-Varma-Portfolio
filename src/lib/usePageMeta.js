import { useEffect } from 'react'
import { site } from '../data/site.js'

// Sets the document title and meta description for the current page.
export default function usePageMeta(title, description) {
  useEffect(() => {
    const owner = site.name.startsWith('[') ? 'Game Design Portfolio' : site.name
    document.title = title ? `${title} | ${owner}` : `${owner} | ${site.role}`
    if (description) {
      const tag = document.querySelector('meta[name="description"]')
      if (tag) tag.setAttribute('content', description)
    }
  }, [title, description])
}
