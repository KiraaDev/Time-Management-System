
function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center h-screen dark:bg-gradient-to-r dark:from-[#fff] dark:via-[#f0f0f0] dark:to-[#e0e0e0]">
        <div className=" rounded-lg shadow-2xl p-12 text-center space-y-8 w-[600px]">
          <div>
            <h2 className="text-lg font-bold  text-gray-700 mb-4">Oops! Something went wrong.</h2>
            <h1 className="text-8xl font-bold text-gray-700 dark:text-gray-900">404</h1>
            <p className="text-lg  text-gray-700 dark:text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
            <a
              href="/"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md  bg-gray-700 text-slate-100 hover:bg-gray-900"
            >
              Return to Dashboard
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
