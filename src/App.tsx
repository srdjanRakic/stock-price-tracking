import { Provider } from 'react-redux';
import { Quote } from './Quote';
import { store } from './store/store';
import { StyledEngineProvider } from '@mui/material/styles';

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <Quote />
      </Provider>
    </StyledEngineProvider>
  );
}
