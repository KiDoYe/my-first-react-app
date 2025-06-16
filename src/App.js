// App.js: 전체 Todo 애플리케이션의 메인 컴포넌트
import './App.css'; // 기본 스타일
import './App.module.css'; // 우주 테마 스타일
import TodoForm from './components/TodoForm'; // 할 일 입력 폼 컴포넌트
import TodoList from './components/TodoList'; // 할 일 목록 컴포넌트
import { useState, useEffect } from 'react'; // React의 상태 관리와 side effect를 위한 훅
import styles from './App.module.css'; // CSS 모듈 import

function App() {
  // todos: 할 일 목록을 저장하는 상태
  // setTodos: 할 일 목록을 변경할 때 사용하는 함수
  // useState의 초기값을 함수로 전달하면, 컴포넌트가 처음 렌더링될 때만 실행됨
  const [todos, setTodos] = useState(() => {
    // localStorage에서 'todos'라는 key로 저장된 값을 불러옴
    const saved = localStorage.getItem('todos');
    // 저장된 값이 있으면 JSON 문자열을 객체로 변환해서 반환, 없으면 빈 배열 반환
    return saved ? JSON.parse(saved) : [];
  });

  // useEffect: todos 상태가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    // todos 배열을 JSON 문자열로 변환해서 localStorage에 저장
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // todos가 바뀔 때마다 실행됨

  // handleAdd: 새로운 할 일을 추가하는 함수
  // text: 사용자가 입력한 할 일 내용
  // date: 사용자가 선택한 날짜
  const handleAdd = (text, date) => {
    // 기존 todos 배열에 새 할 일을 추가해서 새로운 배열로 만듦
    setTodos([
      ...todos, // 기존 할 일 목록 복사
      { id: Date.now(), text, date, completed: false } // 새 할 일 객체에 날짜 추가
    ]);
  };

  // handleToggle: 할 일의 완료 상태를 토글(변경)하는 함수
  // id: 완료 상태를 바꿀 할 일의 id
  const handleToggle = (id) => {
    // todos 배열을 순회하면서 id가 일치하는 할 일의 completed 값을 반대로 바꿈
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo // id가 같으면 completed를 반전
    ));
  };

  // handleDelete: 할 일을 삭제하는 함수
  // id: 삭제할 할 일의 id
  const handleDelete = (id) => {
    // id가 일치하지 않는 할 일만 남겨서 새로운 배열로 만듦
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // handleEdit: 할 일 텍스트와 날짜를 수정하는 함수
  // id: 수정할 할 일의 id, newText: 새 텍스트, newDate: 새 날짜
  const handleEdit = (id, newText, newDate) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, date: newDate } : todo
    ));
  };

  // 실제로 화면에 보여지는 부분 (JSX)
  return (
    // 전체 앱 배경 div, 우주 테마 스타일 적용
    <div className={styles.app}>
      {/* 헤더 영역, 카드 스타일 적용 */}
      <header className={styles.header}>
        {/* 앱 제목 */}
        <h1 className={styles.title}>Todo List</h1>
        {/* 할 일 입력 폼 컴포넌트, handleAdd 함수를 props로 전달 */}
        <TodoForm onAdd={handleAdd} />
        {/* 할 일 목록 컴포넌트, todos 배열과 토글/삭제 함수 props로 전달 */}
        <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
      </header>
    </div>
  );
}

export default App; // App 컴포넌트를 외부에서 사용할 수 있도록 내보냄
