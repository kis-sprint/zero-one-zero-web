import { getVoteResultListApi } from '@/apis/api';
import { Info } from '@/apis/api';
import VoteMenu from '@/components/VoteMenu';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function VoteResultPage() {
  const [voteObject, setVoteObject] = useState<Info>();

  // 추후 수정@@@
  const userAllNumber = parseInt(voteObject?.user.split('/')[1] || '0');
  const voteUserNumber = parseInt(voteObject?.user.split('/')[0] || '0');

  const getVoteResult = async () => {
    try {
      const res = await getVoteResultListApi();
      setVoteObject(res);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getVoteResult();
  }, []);

  return (
    <main className=" flex justify-center flex-col items-center h-screen">
      <h1 className="w-screen text-center">투표 제목 : {voteObject?.title}</h1>
      <p>{voteObject?.user}</p>
      <div className="flex-col">
        {voteObject?.votes &&
          voteObject?.votes.map((elem, index) => {
            return (
              <ul className="flex" key={index}>
                <li>
                  <p className="inline">{elem.option}</p>
                  <Image
                    className="bg-white inline"
                    width={24}
                    height={24}
                    src="/image/icon-user-fill.png"
                    alt="person"
                  />
                  <span className={userAllNumber / 2 < voteUserNumber ? 'visible' : 'invisible'}>
                    {elem.selecteduser}
                  </span>
                </li>
              </ul>
            );
          })}
      </div>
      <VoteMenu />
    </main>
  );
}
