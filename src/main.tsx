import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
import { Provider } from 'react-redux'; 
import { store } from './store'; 
=======
import 'bootstrap/dist/css/bootstrap.min.css';

>>>>>>> eacec934a4a37ab072573a116ec6c83fd8f5e607

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}> 
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
