import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { AppShell } from '@/components/AppShell'
import { BankProvider } from '@/bank/BankContext'
import { QuizProvider } from '@/quiz/QuizContext'
import { HomePage } from '@/pages/Home'
import { QuizPage } from '@/pages/Quiz'
import { ResultsPage } from '@/pages/Results'
import { StatsPage } from '@/pages/Stats'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BankProvider>
      <QuizProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/stats" element={<StatsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </BankProvider>
  </React.StrictMode>
)
