import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { AppShell } from '@/components/AppShell'
import { BankProvider } from '@/bank/BankContext'
import { QuizProvider } from '@/quiz/QuizContext'
import { HomePage } from '@/pages/Home'
import { QuizPage } from '@/pages/Quiz'
import { QuizSetupPage } from '@/pages/QuizSetup'
import { ResultsPage } from '@/pages/Results'
import { StatsPage } from '@/pages/Stats'
import { StudyPage } from '@/pages/Study'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <BankProvider>
      <QuizProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/quiz/setup" element={<QuizSetupPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/study" element={<StudyPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </BankProvider>
  </React.StrictMode>
)

// Remove o splash do index.html (caso algum navegador mantenha o nó por caching/hidratação)
setTimeout(() => {
  const splash = document.getElementById('boot-splash')
  if (splash) splash.remove()
}, 0)
