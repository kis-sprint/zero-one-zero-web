'use client';
import { getVoteResultListApi } from '@/apis/api';
import { Info } from '@/apis/api';
import VoteMenu from '@/components/VoteMenu';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

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
    <main className="relative h-48 flex flex-col h-screen justify-evenly m-10 my-10 py-10 px-8">
      <div>
        <div className="w-full">
          <h1 className=" text-2xl text-center mb-1 rounded-md py-4">{voteObject?.title}</h1>
          <div className="flex justify-end mb-6">
            <Image className=" inline" width={30} height={30} src="/image/icon-user-fill.png" alt="person" />
            <p>{voteObject?.user}</p>
          </div>
        </div>
        <ul className="w-full flex flex-col justify-evenly gap-4">
          {voteObject?.votes &&
            voteObject?.votes.map((el, idx) => {
              return (
                <li
                  key={idx}
                  className={classNames(
                    'relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-2 md:pl-4 md:pr-6',
                  )}
                >
                  <div className="flex flex-1 justify-between">{el.option}</div>
                  <div className="flex justify-end">
                    <Image className=" inline" width={30} height={30} src="/image/icon-user-fill.png" alt="person" />
                    <span className={userAllNumber / 2 < voteUserNumber ? 'visible' : 'invisible'}>
                      {el.selecteduser}
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <div className="flex justify-center">
          <p className="mb-4">과반수 이상일 시 투표 현황을 공개합니다.</p>
        </div>
        <div className="flex" style={{ position: 'absolute', bottom: '13%', width: '30rem' }}>
          <VoteMenu share={true} />
        </div>
      </div>
    </main>
  );
}
