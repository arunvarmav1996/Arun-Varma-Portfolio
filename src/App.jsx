import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import LevelDesign from './pages/LevelDesign.jsx'
import CombatDesign from './pages/CombatDesign.jsx'
import Process from './pages/Process.jsx'
import About from './pages/About.jsx'
import Resume from './pages/Resume.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<CaseStudy />} />
        <Route path="level-design" element={<LevelDesign />} />
        <Route path="combat-design" element={<CombatDesign />} />
        <Route path="process" element={<Process />} />
        <Route path="about" element={<About />} />
        <Route path="resume" element={<Resume />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
