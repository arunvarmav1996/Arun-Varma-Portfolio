// To add a project: copy one of these files, edit it, import it here and add it to the list.
import forgottenFacility from './01-forgotten-facility.js'
import pumpHall from './02-pump-hall.js'
import customsYard from './03-customs-yard.js'
import relayStation from './04-relay-station.js'
import nightCrossing from './05-night-crossing.js'
import ledgeAndMantle from './06-ledge-and-mantle.js'

export const projects = [forgottenFacility, pumpHall, customsYard, relayStation, nightCrossing, ledgeAndMantle]

export const featured = projects.filter((p) => p.featured)

export const getProject = (slug) => projects.find((p) => p.slug === slug)
