import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './components/app'

createRoot(document.getElementById('root')).render(
    <BrowserRouter basename="/EventTicketBookingSystem/">
        <App />
    </BrowserRouter>
)
