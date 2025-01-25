
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <img className="logo" src="img/android-chrome-512x512.png" alt="" />
          <h1 className="text-3xl bg-red-500 font-bold title">Domenico Ciardullo</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#skills" className="hover:underline">Skills</a></li>
              <li><a href="#projects" className="hover:underline">Projects</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
       
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center flex flex-col items-center my-10">
  <h2 className="text-4xl font-bold bg-blue-600 mb-4 title">Hi, I am Domenico Ciardullo!</h2>
  <p className="text-lg text-gray-700 title">
    A passionate Frontend Developer who loves crafting beautiful and functional websites.
  </p>
  <a
    href="#contact"
    className="mt-6 inline-block bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
  >
    Get in Touch
  </a>
</section>


        {/* About Section */}
        <section id="about" className="my-16">
          <h2 className="text-3xl font-bold mb-6 title text-black">About Me</h2>
          <p className="text-gray-700 leading-relaxed title">
            I am a frontend developer with a keen eye for design and a passion for coding. My goal
            is to build engaging and intuitive user experiences. I specialize in React, CSS, and modern
            web development practices.
          </p>
        </section>

        {/* Skills Section */}
        <section id="skills" className="my-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Skills</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <li className="bg-white p-4 shadow rounded skills"><img src="img/html.png" alt="html" /></li>
            <li className="bg-white p-4 shadow rounded flex justify-center skills"><img className='w-[280px]' src="img/css.png" alt="css" /></li>
            <li className="bg-white p-4 shadow rounded skills"><img src="img/js.png" alt="js" /></li>
            <li className="bg-white p-4 shadow rounded skills"><img src="img/react.png" alt="html" /></li>
          </ul>
        </section>

        {/* Projects Section */}
        <section id="projects" className="my-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-xl font-bold mb-2">Project 1</h3>
              <p className="text-gray-700">
               <img src="img/project-1.jpg" alt="project-1" />
              </p>
            </div>
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-xl font-bold mb-2">Project 2</h3>
              <p className="text-gray-700">
                <img src="img/project-2.jpg" alt="project-2" />
              </p>
            </div>
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-xl font-bold mb-2">Project 3</h3>
              <p className="text-gray-700">
                <img src="img/project-3.jpg" alt="project-3" />
              
              </p>
            </div>
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-xl font-bold mb-2">Project 4</h3>
              <p className="text-gray-700">
                <img src="img/project-4.jpg" alt="project-4" />
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="my-16">
          <h2 className="text-3xl font-bold mb-6 text-black">Contact</h2>
          <p className="text-gray-700 mb-4">
            Feel free to reach out to me via email or connect with me on social media.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/" className="text-gray-700 hover:text-blue-600 text-3xl">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/" className="text-gray-700 hover:text-blue-600 text-3xl">
              <FaLinkedin />
            </a>
            <a href="mailto:email@example.com" className="text-gray-700 hover:text-blue-600 text-3xl">
              <FaEnvelope />
            </a>
          
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 Domenico Ciardullo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
