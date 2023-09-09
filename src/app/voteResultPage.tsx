import { getVoteResultListApi } from '@/apis/api';
import { Info } from '@/apis/api';
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
              <div className="flex" key={index}>
                <p className="inline">{elem.option}</p>
                <div>
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
                </div>
              </div>
            );
          })}
      </div>
      <footer>
        <div className="flex items-center justify-center">
          <button>투표 수정 </button>
          <button className="ml-2">투표 종료</button>
        </div>
        <p>과반수이상 투표수 투표 현황을 공개합니다</p>
      </footer>
    </main>
  );
}
