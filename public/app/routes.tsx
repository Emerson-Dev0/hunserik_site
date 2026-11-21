import { createBrowserRouter } from 'react-router'
import { AppLayout, GamesPage, HomePage, PronunciationPage, VocabularyPage } from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'vocabulario', Component: VocabularyPage },
      { path: 'pronuncia', Component: PronunciationPage },
      { path: 'jogos', Component: GamesPage },
      { path: '*', Component: HomePage },
    ],
  },
])
