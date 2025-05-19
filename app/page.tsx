import CharacterInfo from "./_components/CharacterInfo";
import StatInfo from "./_components/StatInfo";

export default function Home() {
  return (
    <section className="bg-gray-800 min-h-screen flex flex-col">
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Left Panel - Character Info */}
        <div className="w-full lg:w-1/3 xl:w-1/4 p-2 lg:p-4 bg-gray-900 overflow-y-auto">
          <h2 className="text-xl text-gray-200 font-semibold mb-4">Character Info</h2>
          <CharacterInfo />
          <StatInfo />
        </div>

        {/* Right Panel - Game Content */}
        <div className="w-full lg:w-2/3 xl:w-3/4 p-2 lg:p-4 bg-gray-800 overflow-y-auto">
          <h1 className="text-3xl font-bold text-amber-500 text-center mb-8">Working In Progress</h1>
          <h2 className="text-xl text-gray-200 font-semibold mb-4">Game Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Game content panels */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg text-gray-200 mb-2">Equipment</h3>
              <p className="text-gray-300">Character equipment management panel</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg text-gray-200 mb-2">Inventory</h3>
              <p className="text-gray-300">Character inventory management panel</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg text-gray-200 mb-2">Skills</h3>
              <p className="text-gray-300">Character skills management panel</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg text-gray-200 mb-2">Quests</h3>
              <p className="text-gray-300">Character quests management panel</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}