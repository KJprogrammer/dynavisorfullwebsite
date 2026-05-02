import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CredentialStrip from '@/components/CredentialStrip'
import BenchmarkReveal from '@/components/BenchmarkReveal'
import PlatformLayers from '@/components/PlatformLayers'
import ValidationStamps from '@/components/ValidationStamps'
import UseCases from '@/components/UseCases'
import Partnership from '@/components/Partnership'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <CredentialStrip />
        <BenchmarkReveal />
        <PlatformLayers />
        <ValidationStamps />
        <UseCases />
        <Partnership />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
