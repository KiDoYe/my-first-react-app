import React, { useState } from 'react'; // React import
import styles from './TodoItem.module.css'; // CSS 모듈 import

// TodoItem: 개별 할 일을 렌더링하고 상태 변경 및 삭제 기능을 처리하는 컴포넌트
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDate, setEditDate] = useState(todo.date || '');

  const handleEditClick = () => {
    setIsEditing(true);
    setEditText(todo.text);
    setEditDate(todo.date || '');
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditDateChange = (e) => {
    setEditDate(e.target.value);
  };

  const handleEditSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim(), editDate);
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
    setEditDate(todo.date || '');
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
        // 수정 중일 때: 텍스트 입력란과 저장/취소 버튼 표시
        <>
          <input
            type="text"
            value={editText}
            onChange={handleEditChange}
            className={styles.text}
            style={{ marginRight: 8 }}
          />
          <input
            type="date"
            value={editDate}
            onChange={handleEditDateChange}
            className={styles.text}
            style={{ marginRight: 8, maxWidth: 150 }}
          />
          <button onClick={handleEditSave} className={styles.save}>저장</button>
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
