// @flow strict

import * as React from 'react';

function ProjectCard({ project }) {

  return (
    <div className="relative w-full rounded-lg border border-[var(--line)] bg-[var(--surface-2)]">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>
      <div className="px-4 lg:px-8 py-3 lg:py-5 relative">
        <div className="flex flex-row space-x-1 lg:space-x-2 absolute top-1/2 -translate-y-1/2">
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400"></div>
          <div className="h-2 w-2 rounded-full bg-green-400 lg:h-3 lg:w-3"></div>
        </div>
        <p className="ml-3 text-center text-base text-[var(--accent)] lg:text-xl">
          {project.name}
        </p>
      </div>
      <div className="overflow-hidden border-t-[2px] border-[var(--line)] px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-xs md:text-sm lg:text-base">
          <div className="blink">
            <span className="mr-2 text-pink-500">const</span>
            <span className="mr-2 text-[var(--ink)]">project</span>
            <span className="mr-2 text-pink-500">=</span>
            <span className="text-[var(--muted-2)]">{'{'}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-[var(--ink)]">name:</span>
            <span className="text-[var(--muted-2)]">{`'`}</span>
            <span className="text-amber-400">{project.name}</span>
            <span className="text-[var(--muted-2)]">{`',`}</span>
          </div>

          <div className="ml-4 lg:ml-8 mr-2">
            <span className=" text-[var(--ink)]">tools:</span>
            <span className="text-[var(--muted-2)]">{` ['`}</span>
            {
              project.tools.map((tag, i) => (
                <React.Fragment key={i}>
                  <span className="text-amber-400">{tag}</span>
                  {
                    project.tools?.length - 1 !== i &&
                    <span className="text-[var(--muted-2)]">{`', '`}</span>
                  }
                </React.Fragment>
              ))
            }
            <span className="text-[var(--muted-2)]">{"],"}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-[var(--ink)]">myRole:</span>
            <span className="text-orange-400">{project.role}</span>
            <span className="text-[var(--muted-2)]">,</span>
          </div>
          <div className="ml-4 lg:ml-8 mr-2">
            <span className="text-[var(--ink)]">Description:</span>
            <span className="text-cyan-500">{' ' + project.description}</span>
            <span className="text-[var(--muted-2)]">,</span>
          </div>
          <div><span className="text-[var(--muted-2)]">{`};`}</span></div>
        </code>
      </div>
    </div>
  );
};

export default ProjectCard;