import React, { useState } from 'react'; // React와 useState 훅 import
import styles from './TodoForm.module.css'; // CSS 모듈 import

// TodoForm: 할 일을 입력하고 추가하는 폼 컴포넌트
function TodoForm({ onAdd }) {
  // value: 입력창에 입력된 텍스트를 저장하는 상태
  // setValue: 입력값을 변경할 때 사용하는 함수
  const [value, setValue] = useState('');
  // date: 선택된 날짜를 저장하는 상태
  // setDate: 날짜를 변경할 때 사용하는 함수
  const [date, setDate] = useState(() => {
    // 오늘 날짜를 yyyy-mm-dd 형식으로 반환
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  // 폼이 제출될 때 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼의 기본 동작(새로고침) 방지
    if (!value.trim()) return; // 입력값이 비어있으면 추가하지 않음
    onAdd(value.trim(), date); // 부모 컴포넌트(App)로 입력값과 날짜 전달
    setValue(''); // 입력창 비우기
    // 날짜는 그대로 유지
  };

  // 실제로 화면에 보여지는 부분 (JSX)
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* 할 일 입력창 */}
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)} // 입력값이 바뀔 때마다 value 상태 변경
        placeholder="할 일을 입력하세요"
        className={styles.input}
      />
      {/* 날짜 선택창 */}
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)} // 날짜가 바뀔 때마다 date 상태 변경
        className={styles.input}
        style={{ maxWidth: 150 }}
      />
      {/* 추가 버튼 */}
      <button type="submit" className={styles.button}>추가</button>
    </form>
  );
}

export default TodoForm; // TodoForm 컴포넌트를 외부에서 사용할 수 있도록 내보냄
