'use client';
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
    <main className="h-48 flex flex-col justify-between items-center h-screen m-10 mt-10 py-10 bg-yellow-400">
      <div>
        <div className="w-full">
          <h1 className="bg-gray-500 text-2xl text-center mb-1 rounded-md py-4">{voteObject?.title}</h1>
          <div className="flex justify-end mb-6">
            <Image className=" inline" width={24} height={24} src="/image/icon-user-fill.png" alt="person" />
            <p>{voteObject?.user}</p>
          </div>
        </div>
        <ul className="flex flex-col w-full gap-2">
          {voteObject?.votes &&
            voteObject?.votes.map((elem, index) => {
              return (
                <li key={index} className=" h-16 flex justify-between items-center bg-gray-500 rounded-md py-2 px-2">
                  <p className=" bg-gray-500 inline">{elem.option}</p>
                  <div>
                    <Image className=" inline" width={24} height={24} src="/image/icon-user-fill.png" alt="person" />
                    <span className={userAllNumber / 2 < voteUserNumber ? 'visible' : 'invisible'}>
                      {elem.selecteduser}
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <p className="mb-4">과반수 이상 투표 현황을 공개합니다.</p>
        <VoteMenu share={false} />
      </div>
    </main>
  );
}
