import { getVoteListApi } from '@/apis/api';
import VoteMenu from '@/components/VoteMenu';
import { useEffect, useState } from 'react';
type ButtonStates = {
  [index: number]: boolean;
};
export default function VoteDetailPage() {
  const [votes, setVotes] = useState<string[]>();
  const [title, setTitle] = useState('');
  const [buttonStates, setButtonStates] = useState<ButtonStates>({});

  const handleClick = (index: number) => {
    setButtonStates({
      ...buttonStates,
      [index]: !buttonStates[index],
    });
  };

  const fetchVotes = async () => {
    try {
      const { votes, title } = await getVoteListApi();
      setVotes(votes);
      setTitle(title);
    } catch (error) {
      console.error(error); // or handle the error as you want
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <main className="flex justify-center flex-col items-center h-screen">
      <h1 className="w-screen text-center">투표 제목 : {title}</h1>
      {votes &&
        votes.map((elem, index) => {
          return (
            <ul key={index}>
              <li>
                <label
                  onClick={() => handleClick(index)}
                  className={`${buttonStates[index] ? 'bg-green-500' : 'bg-blue-500'} ${
                    buttonStates[index]
                      ? 'hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                      : 'hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  }`}
                >
                  {elem}
                </label>
                <input className="hidden bg-white " name={elem} id={elem} type="checkbox" value={elem} />
              </li>
            </ul>
          );
        })}
      <button>투표</button>
      <VoteMenu />
    </main>
  );
}
