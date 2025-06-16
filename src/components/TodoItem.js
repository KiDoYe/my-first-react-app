import React, { useState } from 'react'; // React의 기능을 사용하기 위해 import
import styles from './TodoItem.module.css'; // CSS 모듈 import (각 항목 스타일 적용)

// TodoItem 컴포넌트: 할 일 1개를 화면에 보여주고, 완료/수정/삭제 기능을 제공
// props 설명:
// - todo: { id, text, date, completed } 형태의 할 일 객체
// - onToggle: 체크박스 클릭 시 완료 상태를 바꾸는 함수
// - onDelete: 삭제 버튼 클릭 시 할 일을 삭제하는 함수
// - onEdit: 저장 버튼 클릭 시 할 일 내용/날짜를 수정하는 함수
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  // 수정 모드 여부를 저장하는 상태 (true면 수정 input이 보임)
  const [isEditing, setIsEditing] = useState(false);
  // 수정 input에 표시될 텍스트 상태
  const [editText, setEditText] = useState(todo.text);
  // 수정 input에 표시될 날짜 상태
  const [editDate, setEditDate] = useState(todo.date || '');

  // '수정' 버튼 클릭 시 실행: 수정 모드로 전환, 기존 값 세팅
  const handleEditClick = () => {
    setIsEditing(true);
    setEditText(todo.text);
    setEditDate(todo.date || ''); // 날짜가 없으면 빈 문자열로 초기화
  };

  // 텍스트 input 값이 바뀔 때마다 상태 업데이트
  const handleEditChange = (event) => {
    setEditText(event.target.value);
  };

  // 날짜 input 값이 바뀔 때마다 상태 업데이트
  const handleEditDateChange = (event) => {
    setEditDate(event.target.value);
  };

  // '저장' 버튼 클릭 시 실행: 값이 비어있지 않으면 onEdit 호출 후 수정 모드 해제
  const handleEditSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim(), editDate); // 부모에게 수정 요청
      setIsEditing(false); // 수정 모드 해제
    }
  };

  // '취소' 버튼 클릭 시 실행: 수정 모드 해제, 값 원래대로 복원
  const handleEditCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
    setEditDate(todo.date || ''); // 날짜가 없으면 빈 문자열로 초기화
  };

  // 실제로 화면에 보여지는 부분 (JSX)
  return (
    // li: 한 개의 할 일 항목, 완료 여부에 따라 스타일 다르게 적용
    <li className={todo.completed ? `${styles.item} ${styles.completed}` : styles.item}>
      {/* 체크박스: 클릭 시 완료 상태 토글 */}
      <input
        type="checkbox"
        checked={todo.completed} // 완료된 할 일은 체크됨
        onChange={() => onToggle(todo.id)} // 체크박스 클릭 시 onToggle 함수 실행
        className={styles.checkbox}
      />
      {isEditing ? (
        // 수정 중일 때: 텍스트/날짜 입력란과 저장/취소 버튼 표시
        <>
          {/* 할 일 텍스트 입력란 */}
          <input
            type="text"
            value={editText}
            onChange={handleEditChange}
            className={styles.text}
            style={{ marginRight: 8 }}
          />
          {/* 날짜 입력란 */}
          <input
            type="date"
            value={editDate}
            onChange={handleEditDateChange}
            className={styles.text}
            style={{ marginRight: 8, maxWidth: 150 }}
          />
          {/* 저장 버튼 */}
          <button onClick={handleEditSave} className={styles.save}>저장</button>
          {/* 취소 버튼 */}
          <button onClick={handleEditCancel} className={styles.cancel}>취소</button>
        </>
      ) : (
        // 수정 중이 아닐 때: 할 일 텍스트와 날짜, 수정/삭제 버튼 표시
        <span className={styles.text}>
          {todo.text}
          {/* 날짜가 있으면 표시 */}
          {todo.date && (
            <span style={{ fontSize: '0.95em', color: '#aab7ff', marginLeft: 12 }}>
              ({todo.date})
            </span>
          )}
        </span>
      )}
      {/* 수정 버튼: 클릭 시 인라인 편집 모드로 전환 */}
      <button onClick={handleEditClick} className={styles.edit}>수정</button>
      {/* 삭제 버튼: 클릭 시 해당 할 일 삭제 */}
      <button onClick={() => onDelete(todo.id)} className={styles.delete}>삭제</button>
    </li>
  );
}

export default TodoItem; // TodoItem 컴포넌트를 외부에서 사용할 수 있도록 내보냄
