import React from 'react'
import Banner from './components/banner'
import Services from './components/services'
import PlatformOverview from './platform-overview'
import Testimonials from './components/testimonials'
import Title from '@/components/title'
import CoreValues from './components/code-values'

const Home = () => {
  return (
    <>
      <Title>Home</Title>
      <Banner/>
      <Services/>
      <PlatformOverview/>
      <Testimonials/>
      <CoreValues/>
    </>
  )
}

export default Home