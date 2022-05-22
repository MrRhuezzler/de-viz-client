import { BrowserRouter } from 'react-router-dom';
import Navigator from './Navigator';
import TailWindCssLoader from './components/tailwindcssLoader';

export default function App() {

    return (
        <>
            <TailWindCssLoader />
            <BrowserRouter>
                <Navigator />
            </BrowserRouter>
        </>
    )
}

