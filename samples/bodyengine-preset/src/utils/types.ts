import type { AvailableViews, AvailableSubViews } from './enums'
import type { WithChildren } from './utils'

type Configuration = RetorikMenusConfiguration & {
  fullSize?: boolean
  isUsedOnBorne?: boolean
  locales?: {
    getDefaultFromBrowser?: boolean,
    default?: string
  }
  position?: {
    searchForLocation?: boolean
    latitude?: number | undefined
    longitude?: number | undefined
    city?: string
    country?: string
  }
  subtitles?: boolean
  logo?: {
    src: string
  }
  answerpanel?: boolean
  skipWelcome?: boolean
  preventExpectedInputHint?: boolean
  pagination?: {
    borne?: number
    landscape?: number
    mobile?: number
  }
  remote?: {
    desktop?: number
    desktopTactile?: number
    verticalTactile?: number
  }
  companyName?: string
  subCompanyMessage?: string
  loaderInformationTexts?: {
    vocal: {
      top?: string
      bottom?: string
    }
    text: {
      top?: string
      bottom?: string
    }
  }
  hideRetorikLogo?: boolean
  hideMenu?: boolean
  hideControls?: boolean
  doNotDetectDeviceFromUserAgent?: boolean
  enableConversationCookie?: boolean
  conversationCookieMaxAge?: number
  enableTelemetry?: boolean
  allowSwitchLayout?: boolean
  forceMobileView?: boolean
  enableSpeechCaching?: boolean
  speechRecognitionOptions?: SpeechRecognitionOptions
  speechSynthesisOptions?: SpeechSynthesisOptions
  enableDocumentPrinting?: boolean
  disableSpeechMode?: boolean
  disableSound?: boolean
  timerForFilterSelectionListMode?: number
}

type RetorikMenusConfiguration = {
  baseMenu?: Array<BaseMenu | CustomMenu>
  customMenu?: Array<CustomMenu> | Array<Array<CustomMenu>>
  subMenu?: Array<BaseSubMenu | CustomMenu>
}

interface SpeechRecognitionOptions {
  timerBeforeSpeechEnd?: number
  enableActivationSound?: boolean
  enableContinuousRecognitionOnAllDevices?: boolean
  enableContinuousRecognitionOn?: {
    mobile?: boolean
    widget?: boolean
    desktop?: boolean
    borne?: boolean
  }
  wakeWords?: {
    common?: Array<string>
    localized?: {
      [key: string]: Array<string | {text:string,ipa:string}>
    }
  }
  grammars?: {
    common?: Array<string>
    localized?: {
      [key: string]: Array<string>
    }
  }
}

interface SpeechSynthesisOptions {
  sayAs?: {
    common?: Array<SayAsItem>
    localized?: {
      [key: string]: Array<SayAsItem>
    }
  }
}

interface SayAsItem {
  text: string
  ipa: string
}

type WidgetConfiguration = {
  position?: 'right' | 'left'
  width?: number
  button?: WidgetButton
  large?: WidgetFrame
  thumbnail?: WidgetFrame
}

type WidgetButton = {
  display?: boolean
  text?: {
    content?: string
    color?: string
    bold?: boolean
  }
  image?: {
    url?: string
    position?: 'left' | 'right'
    height?: string
    marginY?: boolean
  }
  border?: {
    color?: string
    thickness?: number
    rounded?: boolean
  }
  background?: {
    color?: string
  }
  position?: Position
}

type WidgetFrame = {
  height?: string
  width?: string
  position?: Position
  border?: {
    color?: string
    thickness?: number
    rounded?: boolean
  }
}

type Position = {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

type ViewsConfiguration = {
  homeRoute: string
  webcamRotation?: 0 | 90 | -90 | 180
  views: Views
}

type Views = {
  home: {
    background: BackgroundOptions
  }
  [option: string]: View
}

type View = {
  background: BackgroundOptions
  [option: string]:
    | string
    | number
    | boolean
    | undefined
    | null
    | BackgroundOptions
}

type BackgroundOptions = {
  style: 'image' | 'video' | 'webcam' | 'neutral'
  image?: string
  video?: string
  webcam?: string
  neutral?: string
  overlayOpacity?: number
  blur?: number
}

type NewsConfig = {
  intervalInSeconds?: number
  loop?: boolean
  openingVideo?: string
  endingVideo?: string
  showMenu?: boolean
  background: BackgroundOptions
}

type ChatbotData = {
  size?: number | string | undefined
  height?: number | string | undefined
  fullWidthInDesktopMode?: boolean
}

type AgentData = null | {
  url: string
  portrait: string
  gender: 'male' | 'female' | 'other'
  data: {
    idle: number
    explain: number
    still: number
    [option: string]: number
  }
  name?: string
}

type PonyfillFactoryCredentials = {
  region: string
  subscriptionKey?: string
  authorizationToken?: string
}

type AddressData = {
  baseURI?: string
  tenant?: string
  prefix?: string
  licenceKey?: string
}

type UserData = {
  name: string
  id: string
  username: string
  nom: string
  prenom: string
  email: string
  token: string
  referrer: string
  ipaddress: string
  gdprConsent: boolean
}

type Queue = Array<string>

type CustomVoice = {
  voice?: string
  gender?: 'male' | 'female' | 'other'
}

type AvailableLanguages = {
  default: string
  all: Array<string>
}

interface IconDefaultProps {
  className?: string
  color?: string
}

type TemplateDefaultProps = WithChildren<{
  className?: string
  background?: string
  depth?: number
  onClick?: () => void
  animation?: object
}>

type BaseMenu = {
  view: AvailableViews
  indice: number
}

type BaseSubMenu = {
  view: AvailableSubViews
  indice: number
}

type CustomMenu = {
  clickHandler?: () => void
  label: LocalizedStrings | string
  customDisplay?: string
  indice: number
  closeParametersOnClickInMobileMode?: boolean
  name?: string
}

type LocalizedStrings = {
  [key: string]: string
}

export type {
  Configuration,
  WidgetConfiguration,
  WidgetFrame,
  ViewsConfiguration,
  View,
  BackgroundOptions,
  ChatbotData,
  AgentData,
  PonyfillFactoryCredentials,
  AddressData,
  UserData,
  Queue,
  CustomVoice,
  NewsConfig,
  AvailableLanguages,
  IconDefaultProps,
  TemplateDefaultProps,
  BaseMenu,
  BaseSubMenu,
  CustomMenu,
  LocalizedStrings,
  RetorikMenusConfiguration,
  SayAsItem
}
