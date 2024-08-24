import Player from 'react-player'
import { LoaderIcon } from 'lucide-react'
import { useCurrentLesson, useStore } from '../zustand-store'

export function Video() {  
  const { currentLesson } = useCurrentLesson()
  
  const { isLoading, next } = useStore(store => {
    return {
      isLoading: store.isLoading,
      next: store.next
    }
  })

  function handlePlayNext() {
    next()
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      { isLoading ? (
        <div className="flex h-full items-center justify-center">
          <LoaderIcon className="size-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <Player
          width="100%"
          height="100%"
          controls
          onEnded={handlePlayNext}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      ) }      
    </div>
  )
}