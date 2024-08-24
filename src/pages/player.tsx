import { Header } from '../components/header'
import { Video } from '../components/video'
import { Module } from '../components/module'
import { useAppDispatch, useAppSelector } from '../store'
import { loadCourse, useCurrentLesson } from '../store/slices/player'
import { Fragment, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export function Player() {  
  const dispatch = useAppDispatch()

  /* Importante: Não retornar todo o state, mas apenas as informações necessárias */
  const modules = useAppSelector(state => state.player.course?.modules)
  const isCourseLoading = useAppSelector(state => state.player.isLoading)
  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    dispatch(loadCourse())
  }, [])
  
  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`
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
            { isCourseLoading ? (
              <Fragment>
                { Array.from({ length: 4 }).map(() => (
                  <div className="flex w-full items-center gap-3 bg-zinc-800 p-4">
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
                { modules && modules.map((module, index) => (
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