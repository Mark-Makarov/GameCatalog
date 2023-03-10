import App from 'next/app';
import '@/styles/globals.css'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
          <Component {...pageProps} />
    );
  }
}
