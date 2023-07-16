import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<CookiesProvider>
			<BrowserRouter>
				<App />
				<Toaster />
			</BrowserRouter>
		</CookiesProvider>
	</React.StrictMode>
);
