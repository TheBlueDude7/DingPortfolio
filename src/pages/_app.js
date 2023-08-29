import '@/styles/globals.css'
import '@/index.css'
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";

export default function App({ Component, pageProps }) {
  return (
    <>
    <GoogleAnalytics trackPageViews={true} TRACKING_ID={'G-GVNQ0FHHYE'} gaMeasurementId={'G-GVNQ0FHHYE'}/>
    <Component {...pageProps} />
    </>
  ) 
}
