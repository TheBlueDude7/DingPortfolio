import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic';
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech} from '@/components';
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";

const DynamicMain = dynamic(() => import('@/components/DynamicCanvas'), {
  ssr: false,
})
export default function Home() {
  return (
    <>
    <GoogleAnalytics trackPageViews={true} TRACKING_ID={'G-GVNQ0FHHYE'} gaMeasurementId={'G-GVNQ0FHHYE'}/>
    <DynamicMain />
    </>
  )
}
