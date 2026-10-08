import { Link } from 'react-router-dom'
import { PageHeader } from '../components/design/Blocks.jsx'

export default function NotFound() {
  return (
    <PageHeader kicker="404" title="This route is not on the map" lead="The page may have moved. The case studies are the best place to start.">
      <Link to="/projects" className="btn mt-8">
        View design work
      </Link>
    </PageHeader>
  )
}
