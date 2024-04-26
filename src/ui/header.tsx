import { logOut } from "@/lib/actions";
import NavLinks from "./nav-links";
import StartInterviewButton from "./start-interview-button";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 font-bold text-xl text-gray-800">
              Interview Book
            </div>
            <div className="ml-10 space-x-4">
              <NavLinks />
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <StartInterviewButton />
            <form className="inline-block" action={logOut}>
              <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                Выйти
              </button>
            </form>
          </div>
        </nav>
      </div>
    </header>
  );
}
