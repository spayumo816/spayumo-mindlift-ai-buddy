export const Tools = () => {
  const tools = [
    {
      category: "🎓 Uplift Moodle",
      links: [
        {
          title: "Uplift Moodle",
          url: "https://moodle.upliftcodecamp.com/moodle/login/index.php",
          description:
            "My primary learning platform where I complete coding modules and assignments.",
          featured: true,
        },
      ],
    },
    {
      category: "Learning Platforms",
      links: [
        {
          title: "Udemy",
          url: "https://www.udemy.com/",
          description:
            "Online courses for programming, development, and professional skills.",
        },
        {
          title: "Coursera",
          url: "https://www.coursera.org/",
          description:
            "University-level courses and professional certificates.",
        },
      ],
    },
    {
      category: "Code Repositories",
      links: [
        {
          title: "GitHub",
          url: "https://github.com/",
          description:
            "Host repositories, collaborate on projects, and manage version control.",
        },
        {
          title: "GitLab",
          url: "https://gitlab.com/",
          description:
            "DevOps platform for source control, CI/CD, and collaboration.",
        },
      ],
    },
    {
      category: "Package & Deployment",
      links: [
        {
          title: "NPMJS",
          url: "https://www.npmjs.com/",
          description:
            "JavaScript package registry used for installing libraries.",
        },
        {
          title: "Render",
          url: "https://render.com/",
          description:
            "Deploy fullstack applications, APIs, and databases easily.",
        },
      ],
    },
    {
      category: "Practice & Productivity",
      links: [
        {
          title: "MonkeyType",
          url: "https://monkeytype.com/",
          description: "Improve typing speed for coding productivity.",
        },
        {
          title: "Codewars",
          url: "https://www.codewars.com/",
          description: "Practice coding challenges and algorithms.",
        },
      ],
    },
    {
      category: "Planning & Diagramming",
      links: [
        {
          title: "Excalidraw",
          url: "https://excalidraw.com/",
          description: "Sketch system designs, flows, and UI ideas quickly.",
        },
        {
          title: "Draw.io",
          url: "https://draw.io/",
          description: "Create diagrams for system architecture and workflows.",
        },
        {
          title: "Trello",
          url: "https://trello.com/",
          description: "Organize tasks and project workflows using boards.",
        },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="rounded-[28px] border border-white/30 bg-white/14 px-4 py-4 backdrop-blur-md sm:px-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Toolkit
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
            Learning Tools
          </h2>
          <p className="mt-1 text-sm text-white/80">
            Platforms, utilities, and apps that support your learning workflow.
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        {tools.map((section) => (
          <section
            key={section.category}
            className="rounded-[28px] border border-slate-200/80 bg-white/94 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-6"
          >
            <div className="mb-5 rounded-3xl border border-slate-200/90 bg-slate-50/80 px-4 py-4 sm:px-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8971D0]">
                  Category
                </p>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-800">
                  {section.category}
                </h3>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {section.links.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`group rounded-3xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md ${
                    link.featured
                      ? "border-[#8971D0]/25 bg-[#8971D0]/5"
                      : "border-slate-200 bg-slate-50/80"
                  }`}
                >
                  <div className="flex h-full flex-col">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold tracking-tight text-slate-800 transition group-hover:text-[#8971D0]">
                        {link.title}
                      </h4>

                      {link.featured && (
                        <span className="rounded-full bg-[#8971D0] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {link.description}
                    </p>

                    <div className="mt-4">
                      <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
                        Open tool
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
