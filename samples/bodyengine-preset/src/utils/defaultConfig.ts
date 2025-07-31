import { AddressData, Configuration, PonyfillFactoryCredentials, UserData } from "./types"
import { characters } from './defaultCharacters'
import { CDNAddress } from './constants'
import { CreationTool } from "@davi-ai/react-bodyengine-three"
import { EnvironmentPreset } from "@davi-ai/react-bodyengine-three/dist/models/types"

export const tenants: { [key: string]: AddressData } = {
  asklea_lesbertranges_preview: {
    tenant: 'asklea_lesbertranges',
    prefix: 'dev'
  },
  emovi: {
    tenant: 'emovi',
    prefix: 'prod'
  },
  emovi2: {
    tenant: 'e9djctsurrlu56enlc',
    prefix: 'prod'
  }
}

const defaultConfig: Configuration = {
  isUsedOnBorne: false,
  locales: {
    default: 'fr-FR'
  },
  position: {
    searchForLocation: false
  },
  answerpanel: true,
  skipWelcome: true,
  companyName: undefined,
  baseMenu: undefined,
  customMenu: undefined,
  enableSpeechCaching: false,
  allowSwitchLayout: true,
  hideRetorikLogo: true,
  hideMenu: false,
  enableConversationCookie: false,
  conversationCookieMaxAge: 1800,
  doNotDetectDeviceFromUserAgent: false,
  enableTelemetry: false,
  //forceMobileView:true
  // hideControls: true
  /*
  remote: {
    desktopTactile: -200
  }
  */
  disableSpeechMode: false,
  disableSound: false,
  speechRecognitionOptions: {
    timerBeforeSpeechEnd: 1500,
    enableActivationSound: true,
    enableContinuousRecognitionOnAllDevices: true,
    wakeWords: {
      common: ['J\'ai une question'],
      localized: {
        "fr-FR": [
          'bonjour',
          'Cléa', 'Clea', 'Kléa', 'Klea',  // Variantes orthographiques
          'Léa', 'Lea',
          'Claire',  // Mots phonétiquement proches souvent confondus
          'J\'ai une question',
          "Est ce que tu m'entend"
        ], "en-US": ['hi', 'storm']
      }
    },
    grammars: {
      common: ["tp up", "back up", "innov up", 'davi'],
      localized: {
        "fr-FR": ['saint pa'],
        "en-US": ['contoso']
      }
    }
  },
  speechSynthesisOptions: {
    sayAs: {
      common: [
        {
          text: 'nuvee',
          ipa: 'nyvi'
        }
      ],
      localized: {
        'fr-FR': [
          {
            text: 'champagne',
            ipa: 'ʃa'
          },
          {
            text: 'champagnes',
            ipa: 'ʃat\u006F\u0303'
          }
        ]
      }
    }
  }
}

const defaultConfig2: Configuration = {
  isUsedOnBorne: false,
  locales: {
    default: 'fr-FR'
  },
  position: {
    searchForLocation: false
  },
  answerpanel: true,
  skipWelcome: true,
  companyName: undefined,
  baseMenu: undefined,
  customMenu: undefined,
  enableSpeechCaching: false,
  allowSwitchLayout: true,
  hideRetorikLogo: true,
  hideMenu: false,
  enableConversationCookie: false,
  conversationCookieMaxAge: 1800,
  doNotDetectDeviceFromUserAgent: false,
  enableTelemetry: false,
  //forceMobileView:true
  // hideControls: true
  /*
  remote: {
    desktopTactile: -200
  }
  */
  disableSpeechMode: false,
  disableSound: false,
  speechRecognitionOptions: {
    timerBeforeSpeechEnd: 1500,
    enableActivationSound: true,
    enableContinuousRecognitionOnAllDevices: true,
    wakeWords: {
      common: ['J\'ai une question', "Emma"],
      localized: {
        "fr-FR": [
          'bonjour',
          'Emma',  // Variantes orthographiques
          'Claire',  // Mots phonétiquement proches souvent confondus
          'J\'ai une question',
          "Est ce que tu m'entend"
        ], "en-US": ['hi', 'storm']
      }
    },
    grammars: {
      common: ["tp up", "back up", "innov up", 'davi'],
      localized: {
        "fr-FR": ['saint pa'],
        "en-US": ['contoso']
      }
    }
  },
  speechSynthesisOptions: {
    sayAs: {
      common: [
        {
          text: 'nuvee',
          ipa: 'nyvi'
        }
      ],
      localized: {
        'fr-FR': [
          {
            text: 'champagne',
            ipa: 'ʃa'
          },
          {
            text: 'champagnes',
            ipa: 'ʃat\u006F\u0303'
          }
        ]
      }
    }
  }
}

const userData: UserData = {
  name: 'DAVI',
  id: Math.random().toString(36).substring(2, 9),
  username: 'DAVI',
  nom: 'RETORIK',
  prenom: 'Davi',
  email: 'davi@davi.ai',
  token: '',
  referrer: '',
  ipaddress: '',
  gdprConsent: true
}

const ponyfillFactoryCredentials: PonyfillFactoryCredentials = {
  region: 'francecentral',
  subscriptionKey: '2f62867e22a544b78a16c99a2707ef49'
}

const voices = {
  guyNeural: {
    voice: 'GuyNeural'
  },
  henriNeural: {
    voice: 'HenriNeural'
  },
  man: {
    gender: 'male'
  },
  multilingualNeural: {
    voice: 'JennyMultilingualNeural',
    gender: 'female'
  },
  coralie: {
    voice: 'CoralieNeural',
    gender: 'female'
  },
  Henri: {
    voice: "Henri",
    gender: "male"
  },
  Alain: {
    voice: "Alain",
    gender: "male"
  },
  Claude: {
    voice: "Claude",
    gender: "male"
  },
  Jerome: {
    voice: "Jerome",
    gender: "male"
  },
  Maurice: {
    voice: "Maurice",
    gender: "male"
  },
  Denise: {
    voice: "DeniseNeural",
    gender: "female"
  },
  Brigitte: {
    voice: "BrigitteNeural",
    gender: "female"
  },
  Celeste: {
    voice: "CelesteNeural",
    gender: "female"
  },
  Coralie: {
    voice: "CoralieNeural",
    gender: "female"
  },
  Eloise: {
    voice: "EloiseNeural",
    gender: "female"
  },
  Jacqueline: {
    voice: "JacquelineNeural",
    gender: "female"
  },
  Josephine: {
    voice: "JosephineNeural",
    gender: "female"
  },
  Vivienne: {
    voice: "VivienneMultilingualNeural",
    gender: "female"
  },
  Yvette: {
    voice: "YvetteNeural",
    gender: "female"
  },
}
export let agent1 = {
  url: characters.adrien,
  animationsUrl: `${CDNAddress}/bodyengine-three/animations/cc4/female/standing/`,
  type: CreationTool.avaturn as CreationTool,
  gender: "male" as "male"|"female",
  speechSynthesis: {
    credentials: {
      region: "westeurope",
      subscriptionKey: "f5f61ee8c7334f6ab967d007d970638b",
    },
  },
  environmentPreset: "apartment" as EnvironmentPreset,
  debug: false,
  autoLookAt: true,
  license: "fake-licence"
}
export let agent2 = {
  agentData: characters.emma,
  ponyfillFactoryCredentials: {
    region: 'francecentral',
    subscriptionKey: '2f62867e22a544b78a16c99a2707ef49'
  },
  addressData: tenants.emovi2,
  userData: userData,
  config: defaultConfig2,
  customVoice: voices.Brigitte,
  animationsUrl: `${CDNAddress}/bodyengine-three/animations/cc4/female/standing/`,
  //type: CreationTool.avatarsdk,
  //type: CreationTool.avaturn,
  //type: CreationTool.cc3,
  autoLookAt: true,
  license: "license"
}
