import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Experience from './components/Experience';
import Skills from './components/Skills';

function App() {
  return (
    <Layout>
      <Hero />
      <ProjectGrid />
      <Experience />
      <Skills />
    </Layout>
  );
}

export default App;
