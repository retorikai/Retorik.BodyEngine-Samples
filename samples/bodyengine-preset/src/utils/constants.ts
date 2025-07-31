import { AvailableViews, AvailableSubViews, DeviceType } from './enums'
import type { BaseMenu, BaseSubMenu } from './types'

const mobileBreakpoint = 600
const mediumBreakpoint = 1500

const CDNAddress = 'https://cdn.retorik.ai'
const CDNCharactersAddress = `${CDNAddress}/spiritenginehtml5/characters`
const CDNCharactersBodyEngineAddress = `${CDNAddress}/bodyengine-three/characters`
const CDNImagesAddress = `${CDNAddress}/retorik-framework/imagefiles`
const CDNAudioAddress = `${CDNAddress}/retorik-framework/audiofiles`

const studioRetorik = 'https://studio.retorik.ai'
const studioRetorikDev = 'https://dev.studio.retorik.ai'
const studioRetorikStaging = 'https://preview.studio.retorik.ai'
const studioRetorikExperimental = 'https://experimental.studio.retorik.ai'

const managementRetorik = 'https://management.retorik.ai'
const managementRetorikDev = 'https://dev.management.retorik.ai'
const managementRetorikStaging = 'https://staging.management.retorik.ai'
const managementOGData = '/api/getOGData'

const openRoute = 'https://api.openrouteservice.org/v2/directions'
const openRouteAPIKey =
  '5b3ce3597851110001cf62483cfd6bd46f934b7d96f108a35e0f08b8'
const openMeteoBefore = 'https://api.open-meteo.com/v1/forecast?'
const openMeteoAfter =
  '&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&current_weather=true'

const webchatTokenRetrievalAddress =
  'K2.ContentFields.WebChat/api/GetWebchatToken'

const hospitalityApiAddress = 'api/hospitality/Emergency'

const telemetryAddress = 'https://telemetry.retorik.ai/otlp-http/v1/traces'

const googleMapsAddress = 'https://www.google.com/maps/dir/?api=1&'

const DEFAULT_LANGUAGE_DATA = {
  default: 'fr-FR',
  all: ['fr-FR']
}

const DEFAULT_VIEWS: BaseMenu[] = [
  { view: AvailableViews.home, indice: 1 },
  { view: AvailableViews.emergency, indice: 2 }
]
const DEFAULT_SUB_VIEWS: BaseSubMenu[] = [
  { view: AvailableSubViews.history, indice: 1 },
  { view: AvailableSubViews.tutorial, indice: 2 }
]

const mobileDisplays = [DeviceType.mobile, DeviceType.widget]

const commonColors = {
  primary: '#00D7FF',
  secondary: '#1999B1',
  black: '#101219',
  whereToEatColor: '#FC952E',
  whereToSleepColor: '#9F007D',
  tobeSeenColor: '#76AB2A',
  tobeDoneColor: '#E23C2A',
  localProductsColor: '#AFB942',
  servicesColor: '#00C8BC',
  agendaColor: '#865DA2',
  occupantColor: '#6DEDBC'
}

const visemeCodes = new Map<number, string>([
  [0, "sil"],
  [1, "aa"],
  [2, "aa"],
  [3, "O"],
  [4, "E"],
  [5, "E"],
  [6, "I"],
  [7, "U"],
  [8, "O"],
  [9, "U"],
  [10, "O"],
  [11, "aa"],
  [12, "kk"],
  [13, "RR"],
  [14, "nn"],
  [15, "SS"],
  [16, "CH"],
  [17, "TH"],
  [18, "FF"],
  [19, "DD"],
  [20, "kk"],
  [21, "PP"],
]);

export {
  visemeCodes,
  mobileBreakpoint,
  mediumBreakpoint,
  CDNAddress,
  CDNCharactersAddress,
  CDNCharactersBodyEngineAddress,
  CDNImagesAddress,
  CDNAudioAddress,
  studioRetorik,
  studioRetorikDev,
  studioRetorikStaging,
  studioRetorikExperimental,
  managementRetorik,
  managementRetorikDev,
  managementRetorikStaging,
  managementOGData,
  openRoute,
  openRouteAPIKey,
  openMeteoBefore,
  openMeteoAfter,
  webchatTokenRetrievalAddress,
  hospitalityApiAddress,
  telemetryAddress,
  googleMapsAddress,
  DEFAULT_LANGUAGE_DATA,
  DEFAULT_VIEWS,
  DEFAULT_SUB_VIEWS,
  mobileDisplays,
  commonColors
}
