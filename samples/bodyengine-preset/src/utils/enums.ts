enum AvailableViews {
  home = 1,
  news,
  weather,
  emergency
}

enum AvailableSubViews {
  history = 1000,
  tutorial
}

enum CategoryId {
  eat = 'where to eat',
  sleep = 'where to sleep',
  see = 'what to see',
  do = 'what to do',
  localproducts = 'local products',
  services = 'services',
  agenda = 'events',
  occupant = 'occupant'
}

enum ContainerParent {
  agent = 1,
  widget,
  news
}

enum CurrentSubView {
  none = 1,
  history,
  languages,
  weather,
  emergency,
  custom
}

enum Depth {
  background = 1,
  util,
  chatbot,
  ui,
  dropdown,
  overlay,
  menu,
  modal,
  exitwidget
}

enum DeviceType {
  mobile = 1,
  borne,
  landscape,
  widget
}

enum LoaderSteps {
  loader = 1,
  locale,
  supported,
  store,
  directline,
  ponyfill,
  agentdata
}

enum Mode {
  vocal = 1,
  text,
  dashboard
}

enum Position {
  top = 1,
  right,
  bottom,
  left
}

enum RetorikEvent {
  DetailViewOpen = 1,
  DetailViewClose = 2,
  SpeechStarted = 3,
  SpeechEnded = 4
}

enum RecognitionState {
  Initializing = 1,
  Listening,
  Closing,
  ForceClosing,
  Closed
}

enum Routes {
  Home = 1,
  News
}

enum Emotions {
  Regret = 'regret',
  Dislike = 'dislike',
  Distress = 'distress',
  Fear = 'fear',
  Sadness = 'sadness',
  Shame = 'shame',
  Contempt = 'contempt',
  Disgust = 'disgust',
  Guilt = 'guilt',
  Anger = 'anger',
  Frustration = 'frustration',
  Pride = 'pride',
  Love = 'love',
  Relief = 'relief',
  Joy = 'joy',
  Hope = 'hope'
}

export {
  AvailableViews,
  AvailableSubViews,
  CategoryId,
  ContainerParent,
  CurrentSubView,
  Depth,
  DeviceType,
  Emotions,
  LoaderSteps,
  Mode,
  Position,
  RetorikEvent,
  RecognitionState,
  Routes
}
