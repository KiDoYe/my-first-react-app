import React from 'react'; // React import
import TodoItem from './TodoItem'; // 개별 할 일 컴포넌트 import
import styles from './TodoList.module.css'; // CSS 모듈 import

// TodoList: 할 일 목록을 렌더링하는 컴포넌트
function TodoList({ todos, onToggle, onDelete, onEdit }) {
  // 실제로 화면에 보여지는 부분 (JSX)
  return (
    // ul: 할 일 목록 전체를 감싸는 태그, 스타일 적용
    <ul className={styles.list}>
      {/* todos 배열을 map으로 순회하며 TodoItem 컴포넌트 생성 */}
      {todos.map(todo => (
        <TodoItem
          key={todo.id} // 각 할 일의 고유 id를 key로 사용
          todo={todo} // 할 일 객체를 props로 전달
          onToggle={onToggle} // 완료 토글 함수 전달
          onDelete={onDelete} // 삭제 함수 전달
          onEdit={onEdit} // 수정 함수 전달
        />
      ))}
    </ul>
  );
}

export default TodoList; // TodoList 컴포넌트를 외부에서 사용할 수 있도록 내보냄
