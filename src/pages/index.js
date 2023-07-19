import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic';
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech} from '@/components';

const DynamicMain = dynamic(() => import('@/components/DynamicCanvas'), {
  ssr: false,
})
export default function Home() {
  return (
    <DynamicMain />
  )
}
