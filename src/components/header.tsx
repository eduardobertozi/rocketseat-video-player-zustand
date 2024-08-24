import { MessageCircleIcon } from 'lucide-react';
import { useCurrentLesson } from '../store/slices/player';
import { useAppSelector } from '../store';

export function Header() {
  const { currentModule, currentLesson } = useCurrentLesson()
  const isCourseLoading = useAppSelector(state => state.player.isLoading)
  
  return (
    <div className="flex items-center justify-between">
      { isCourseLoading ? (
        <div className="flex flex-col gap-2">
          <div className="w-24 h-6 bg-gradient-to-tr from-zinc-500 to-zinc-700 animate-pulse rounded" />
          <div className="w-32 h-4 bg-gradient-to-tr from-zinc-600 to-zinc-800 animate-pulse rounded" />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{currentModule?.title}</h1>
          <span className="text-sm text-zinc-400">{currentLesson?.title}</span>
        </div>
      ) }
      <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
        <MessageCircleIcon className="size-4" />
        Deixar feedback
      </button>
    </div>
  )
}