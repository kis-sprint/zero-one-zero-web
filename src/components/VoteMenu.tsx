export default function VoteMenu() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <button>투표 수정 </button>
        <button className="ml-2">투표 종료</button>
      </div>
      <button>공유하기</button>
    </div>
  );
}
