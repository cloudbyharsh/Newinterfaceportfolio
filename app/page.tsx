import Nav from '@/components/Nav';
import VideoIntro from '@/components/VideoIntro';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Nav />
      <VideoIntro />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
