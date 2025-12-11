import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import RevealOnScroll from './components/RevealOnScroll';

function App() {
  return (
    <Layout>
      <Hero />
      <RevealOnScroll delay={100}>
        <ProjectGrid />
      </RevealOnScroll>
      <RevealOnScroll delay={200}>
        <Experience />
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <Skills />
      </RevealOnScroll>
      <RevealOnScroll delay={200}>
        <Certifications />
      </RevealOnScroll>
    </Layout>
  );
}

export default App;
