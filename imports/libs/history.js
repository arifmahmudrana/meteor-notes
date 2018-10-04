let history

if (typeof document !== 'undefined') {
  import createBrowserHistory from 'history/createBrowserHistory';

  history = createBrowserHistory()
}

export default history