import { Header } from '../components/header'
import { Video } from '../components/video'
import { Module } from '../components/module'
import { useAppSelector } from '../store'
import { start, useCurrentLesson } from '../store/slices/player'
import { useEffect } from 'react'
import { api } from '../lib/axios'
import { useDispatch } from 'react-redux'

export function Player() {
  const dispatch = useDispatch()
  
  /* Importante: Não retornar todo o state, mas apenas as informações necessárias */
  const modules = useAppSelector(state => state.player.course?.modules)

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    api.get("/courses/1").then(async (res) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch(start(res.data))
    })
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
            { modules && modules.map((module, index) => (
                <Module 
                  key={module.id}
                  moduleIndex={index} 
                  title={module.title} 
                  amountOfLessons={module.lessons.length} 
                />
            )) }
          </aside>
        </main>
      </div>
    </div>
  )
}