import { ConnectedRouter } from 'connected-react-router';
import {
  configureStore,
  getHistory,
} from 'src/modules/store';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import RoutesComponent from 'src/view/shared/routes/RoutesComponent';
import 'typeface-roboto';
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Message from 'src/view/shared/message';

const store = configureStore();

export default function App(props) {
  return (
    <Provider store={store}>
      <AppWithRedux {...props} />
    </Provider>
  );
}

function AppWithRedux(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <AppWithSnackbar {...props} />
    </SnackbarProvider>
  );
}

function AppWithSnackbar(props) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // this is a little hack to not have to import notistack
    // on all the components that emit messages
    Message.registerNotistakEnqueueSnackbar(
      enqueueSnackbar,
    );
  }, [enqueueSnackbar]);

  return (
    <>
      <ConnectedRouter history={getHistory()}>
        <RoutesComponent />
      </ConnectedRouter>
    </>
  );
}
