export const Resources = () => {
  const resources = [
    {
      category: "HTML",
      links: [
        {
          title: "MDN HTML Documentation",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
          description: "Official and beginner-friendly HTML reference.",
        },
        {
          title: "W3Schools HTML Tutorial",
          url: "https://www.w3schools.com/html/",
          description: "Simple tutorials and examples for HTML basics.",
        },
      ],
    },
    {
      category: "CSS",
      links: [
        {
          title: "MDN CSS Documentation",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          description: "Complete CSS reference and guides.",
        },
        {
          title: "CSS-Tricks",
          url: "https://css-tricks.com/",
          description: "Practical guides, tips, and CSS techniques.",
        },
      ],
    },
    {
      category: "JavaScript",
      links: [
        {
          title: "MDN JavaScript Documentation",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          description: "Core JavaScript concepts and reference.",
        },
        {
          title: "JavaScript.info",
          url: "https://javascript.info/",
          description: "Deep but beginner-friendly JavaScript tutorial.",
        },
      ],
    },
    {
      category: "React",
      links: [
        {
          title: "React Official Docs",
          url: "https://react.dev/",
          description: "Official React documentation and learning guides.",
        },
        {
          title: "React Reference",
          url: "https://react.dev/reference/react",
          description: "Hooks, APIs, and React reference docs.",
        },
      ],
    },
    {
      category: "Tailwind CSS",
      links: [
        {
          title: "Tailwind CSS Docs",
          url: "https://tailwindcss.com/docs",
          description: "Official utility class documentation.",
        },
        {
          title: "Tailwind CSS Cheat Sheet",
          url: "https://www.webdevultra.com/articles/tailwindcss-cheatsheet-css-equivalents",
          description: "Webdevultra.com article",
        },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="rounded-[28px] border border-white/30 bg-white/14 px-4 py-4 backdrop-blur-md sm:px-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Library
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
            Learning Resources
          </h2>
          <p className="mt-1 text-sm text-white/80">
            Helpful documentation and tutorials for your study topics.
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        {resources.map((section) => (
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
                  className="group rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-full flex-col">
                    <h4 className="text-base font-bold tracking-tight text-slate-800 transition group-hover:text-[#8971D0]">
                      {link.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {link.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
                        Open resource
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
