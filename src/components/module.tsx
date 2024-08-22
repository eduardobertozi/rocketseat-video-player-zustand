import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { Lesson } from './lesson';

interface ModuleProps {
  moduleIndex: number
  title: string
  amountOfLessons: number
}

export function Module({ title, amountOfLessons, moduleIndex } : ModuleProps) {
  return (
    <Collapsible.Root className="group">
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex size-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-1 gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className='text-xs text-zinc-400'>{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="group-data-[state=open]:rotate-180 size-5 ml-auto text-zinc-400 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          <Lesson title="Fundamentos do Redux" duration="09:13" />
          <Lesson title="Fundamentos do Redux" duration="09:13" />
          <Lesson title="Fundamentos do Redux" duration="09:13" />
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}