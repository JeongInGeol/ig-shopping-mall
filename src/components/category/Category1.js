import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터 페칭
    fetch('http://localhost:3000/api/users/dlsrjf1107@naver.com')
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // 빈 배열은 이 효과가 컴포넌트 마운트 시 한 번만 실행됨을 의미

  return (
    <div>
      {data ? <p>데이터: {JSON.stringify(data)}</p> : <p>로딩 중...</p>}
    </div>
  );
}

export default DataFetcher;
