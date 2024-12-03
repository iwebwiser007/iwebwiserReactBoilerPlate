import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from "./store/index.ts"
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ScrollToTop from './utility/ScrollToTop.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ReactNotifications />
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
)
