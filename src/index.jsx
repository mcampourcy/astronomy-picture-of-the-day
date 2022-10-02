import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApiProvider } from './ApiProvider'
import { App } from './App'
import { Homepage } from './Homepage'
import { Picture } from './Picture'
import './index.css'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <ApiProvider>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route
                        path="astronomy-picture-of-the-day"
                        element={<Homepage />}
                    />
                    <Route path=":date/:id" element={<Picture />} />
                </Route>
            </Routes>
        </ApiProvider>
    </BrowserRouter>
)
