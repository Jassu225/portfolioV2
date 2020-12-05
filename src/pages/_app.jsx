import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { initGA, logPageView } from '@utils/googleAnalytics';
import { lightTheme } from '@constants/themes';
import { ContextProvider as MobileContextProvider } from '@contexts/MobileContext';
import wrapper from '../store';

const App = ({ Component, pageProps, isServer, userAgent }) => {
  useEffect(() => {
    if (!window?.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView({ page: window.location.pathname });
  }, []);
  return (
    <ThemeProvider theme={lightTheme}>
      <MobileContextProvider isServer={isServer} userAgent={userAgent}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
        <style jsx global>
          {`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}
        </style>
      </MobileContextProvider>
    </ThemeProvider>
  );
};

App.getInitialProps = async ({ ctx, ...rest }) => {
  const isServer = !!ctx.req;
  return {
    isServer,
    userAgent: isServer ? ctx.req.headers['user-agent'] : '',
    ...rest
  };
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any),
  isServer: PropTypes.bool.isRequired,
  userAgent: PropTypes.string.isRequired
};

App.defaultProps = {
  pageProps: {}
};

export default wrapper.withRedux(App);
