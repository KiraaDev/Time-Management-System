
import { Button } from "../ui/button"
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet"
import { Toggle } from "../ui/toggle"

function NavBar() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-2" >
          <h1 className=" font-semibold text-xl">TimeWise</h1>
          <span className="sr-only">TimeWise</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a
            href="/"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            
          >
            Dashboard
          </a>
          <a
            href="/tasks"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            
          >
            Tasks
          </a>
          <a
            href="/dailySummary"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            
          >
            Daily Summary
          </a>
          <a
            href="/weeklyOverview"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            
          >
            Weekly Overview
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Toggle aria-label="Toggle dark mode" className="rounded-full">
            <MoonIcon />
          </Toggle>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <MenuIcon />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                <a
                  href="/"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  
                >
                  Dashboard
                </a>
                <a
                  href="/tasks"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  
                >
                  Tasks
                </a>
                <a
                  href="/dailySummary"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  
                >
                  Daily Summary
                </a>
                <a
                  href="/weeklyOverview"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  
                >
                   Weekly Overview
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MoonIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}


export default NavBar
