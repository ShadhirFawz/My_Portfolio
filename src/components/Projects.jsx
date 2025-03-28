export default function ProjectsSection() {
    return (
      <section id="projects-section" className="max-w-5xl mx-auto py-8 mt-20">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden mb-6"
          >
            {/* Left Side - Image (3/8 Ratio) */}
            <div className="w-full md:w-3/8">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
  
            {/* Right Side - Content */}
            <div className="w-full md:w-5/8 p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-300">{project.description}</p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 font-semibold mt-3 inline-block hover:underline"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        ))}
      </section>
    );
  }
  