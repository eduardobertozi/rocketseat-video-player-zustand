import { Header } from '../components/header'
import { Video } from '../components/video'
import { Module } from '../components/module'
import { Fragment, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useCurrentLesson, useStore } from '../zustand-store'

export function Player() {  
  const { course, load, isLoading } = useStore()

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo ${currentLesson.title}`
    }
  }, [currentLesson])
  
  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <Header />
        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="absolute top-0 bottom-0 right-0 w-80 border-l border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thum-zinc-900 divide-y-2 divide-zinc-900">
            { isLoading ? (
              <Fragment>
                { Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                    <div className="size-10 rounded-full bg-gradient-to-tr from-zinc-500 to-zinc-700 animate-pulse" />

                    <div className="flex flex-1 items-center gap-2 text-left">
                      <div className="w-full h-2 bg-gradient-to-tr from-zinc-500 to-zinc-700 animate-pulse" />
                      <div className="w-1/4 h-1 bg-gradient-to-tr from-zinc-500 to-zinc-700 animate-pulse" />
                    </div>

                    <ChevronDown className="group-data-[state=open]:rotate-180 size-5 ml-auto text-zinc-400 transition-transform" />
                  </div>
                )) }
              </Fragment>
            ) : (
              <Fragment>
                { course && course.modules && course.modules.map((module, index) => (
                    <Module 
                      key={module.id}
                      moduleIndex={index} 
                      title={module.title} 
                      amountOfLessons={module.lessons.length} 
                    />
                )) }
              </Fragment>
            )}
          </aside>
        </main>
      </div>
    </div>
  )
}