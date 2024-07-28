'use client'

import * as React from 'react'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const ModeToggle = () => {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-sky-900 hover:bg-sky-800 dark:bg-slate-700"
          size="icon"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-slate-100 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-slate-900" align="end">
        <DropdownMenuItem
          className="dark:bg-slate-900 dark:hover:bg-slate-500 dark:focus:bg-slate-500"
          onClick={() => setTheme('light')}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="dark:bg-slate-900 dark:hover:bg-slate-500 dark:focus:bg-slate-500"
          onClick={() => setTheme('dark')}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="dark:bg-slate-900 dark:hover:bg-slate-500 dark:focus:bg-slate-500"
          onClick={() => setTheme('system')}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModeToggle
