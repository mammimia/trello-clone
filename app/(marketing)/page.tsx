import { Medal } from 'lucide-react';
import { NextPage } from 'next';

interface Props {}

const MarketingPage: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div
          className="mb-4 flex items-center rounded-full border
         bg-amber-100 p-4 uppercase shadow-sm"
        >
          <Medal className="mr-2 h-6 w-6" />
          No 1 task management
        </div>
        <h1
          className="mb-6 text-center text-3xl text-neutral-800
         md:text-6xl"
        >
          Taskify helps team move
        </h1>
        <div
          className="w-fit rounded-md bg-gradient-to-r
         from-fuchsia-600 to-pink-600 p-2 pb-4 text-3xl
          text-white md:text-6xl"
        >
          work forward.
        </div>
        <div
          className="mx-auto mt-4 max-w-xs text-center text-sm
         text-neutral-400 md:max-w-2xl md:text-xl"
        >
          Collabrate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team works is unique -
          accomplish it all with Taskify.
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;
