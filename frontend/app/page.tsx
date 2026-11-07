export default function Home() {
  return (
    <div className="flex flex-col flex-1 gap-3 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl">This project is developed by Hameedreza</h1>
      <p className="text-3xl">click here 👇👇</p>
      <a className="text-4xl" href="https://github.com/Im-Hameedrza">
        Github
      </a>

      <p> to start go to overview page 👇</p>
      <a href="/overview">overview</a>
    </div>
  );
}
