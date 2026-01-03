import Hero from "../components/Hero"

export default function Home() {
  return (
    <main className="">
      <Hero />
      <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold">
        Home
      </h1>

      <p className="text-slate-600 dark:text-slate-300 mt-2">
        Welcome to Core Blog
      </p>
    </main>
  )
}
