import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppButton } from '../shared/WhatsAppButton'

/**
 * Layout — wraps every page with the sticky Navbar and Footer.
 * @param {{ children: React.ReactNode }} props
 */
export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
