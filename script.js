const addTodoBtn = document.getElementById("add-todo-btn");
const todoInput = document.getElementById("todo-input");
const doneList = document.querySelector(".done-list");
const todoListTitle = document.getElementById("todo-list-title");
const todoList = document.querySelector(".todo-list");
const doneListTitle = document.getElementById("done-list-title");

// localStorage에서 값을 가져오는 함수
function getLocalStorageItem(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// localStorage에 값을 새로 저장하는 함수
function setLocalStorageItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function handleAddTodo() {
    let inputValue = todoInput.value; // 입력한 todo 집중
    if (!inputValue) return alert("내용을 입력해주세요!"); // 입력된 todo가 존재하지 않는다면 아무것도 하지 않기 위함

    const todos = getLocalStorageItem("todos"); // localstorage에 저장해둔 todo를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)
    const newTodos = [inputValue, ...todos];

    setLocalStorageItem("todos", newTodos); // update 된 객체를 localStorage 에도 update

    todoInput.value = ""; // todo input 창 초기화
    renderTodos(); // todo 목록 새로고침
}

addTodoBtn.addEventListener("click", handleAddTodo); // +버튼에 todo 추가하는 함수 연결

function renderTodos() {
    const todos = getLocalStorageItem("todos"); // localStorage에 저장해둔 done 목록을 가져옴
    todoList.innerHTML = ""; // 기존 todo 초기화

    todos.forEach((todo, index) => {
        const li = document.createElement("li"); // li 요소 생성
        const span = document.createElement("span"); // span 요소 생성
        span.textContent = todo; // todo 텍스트 추가

        span.addEventListener("click", () => handleAddDone(index));

        const deleteBtn = document.createElement("i"); // delete 버튼 생성
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => handleDeleteTodoItem(index);

        // li 요소에 span과 delete 버튼 추가
        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li); // doneList에 li 요소를 추가
    });

    todoListTitle.textContent = `📋 TO DO (${todos.length})`; // todo 목록에 들어있는 값의 개수
}

function handleDeleteTodoItem(index) {
    const todos = getLocalStorageItem("todos"); // localstorage에 저장해둔 todo를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)

    todos.splice(index, 1); // todos 배열 내의 index에 해당하는 값을 1개 삭제할 것

    setLocalStorageItem("todos", todos); // update된 todos 배열 localStorage에 update

    renderTodos(); // todo 목록에서 하나를 삭제했으므로 목록 새로고침
}

function handleAddDone(index) {
    const todos = getLocalStorageItem("todos"); // localstorage에 저장해둔 todo를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)
    const done = getLocalStorageItem("done"); // localstorage에 저장해둔 done를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)

    const newDone = [todos[index], ...done]; // 선택된 todo를 done 배열의 맨 앞에 새로 추가
    const newTodos = todos.filter((_, i) => i !== index); // Done이 된 todo의 index를 제외한 항목들만 남겨두기

    setLocalStorageItem("todos", newTodos);
    setLocalStorageItem("done", newDone);

    renderTodos(); // update 됐으므로 새로고침
    renderDone(); // update 됐으므로 새로고침
}

function renderDone() {
    const done = getLocalStorageItem("done"); // localStorage에 저장해둔 done 목록을 가져옴

    doneList.innerHTML = ""; // 기존 목록 초기화

    done.forEach((todo, index) => {
        const li = document.createElement("li"); // li 요소 생성

        const span = document.createElement("span"); // span 요소 생성
        span.textContent = todo; // todo 텍스트 추가

        span.addEventListener("click", () => handleMoveToTodo(index));

        const deleteBtn = document.createElement("i"); // delete 버튼 생성
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => handleDeleteDoneItem(index);

        // li 요소에 span과 delete 버튼 추가
        li.appendChild(span);
        li.appendChild(deleteBtn);

        doneList.appendChild(li); // doneList에 li 요소를 추가
    });

    // done 목록의 제목에 완료된 항목 수를 표시
    doneListTitle.textContent = `💿 DONE (${done.length})`;
}

function handleDeleteDoneItem(index) {
    const done = getLocalStorageItem("done"); // localstorage에 저장해둔 done를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)
    const newDone = done.filter((_, i) => i !== index);

    setLocalStorageItem("done", newDone); // update된 done 목록 localStorage에도 update

    renderDone(); // update 하였으므로 새로고침
}

// Done을 다시 Todo로
function handleMoveToTodo(index) {
    const done = getLocalStorageItem("done"); // localstorage에 저장해둔 done를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)
    const todos = getLocalStorageItem("todos"); // localstorage에 저장해둔 todo를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)

    const newTodos = [done[index], ...todos]; // 선택된 done을 todo 배열의 맨 앞에 새로 추가
    const newDone = done.filter((_, i) => i !== index); // Todo로 이동된 done의 index를 제외한 항목들만 남겨두기

    setLocalStorageItem("todos", newTodos);
    setLocalStorageItem("done", newDone);

    renderTodos(); // 업데이트 됐으므로 새로고침
    renderDone(); // 업데이트 됐으므로 새로고침
}

document.addEventListener("DOMContentLoaded", () => {
    // 초기 렌더링 설정을 위한 코드
    // DOM이 완전히 로드된 후에 초기화되도록 설정!
    // 로컬 저장소에서 가져온 데이터로 초기 상태 보여질 수 있도록 함
    // 이 코드가 없다면 페이지 로드 시 초기 목록을 로드하는 데 실패할 수 있음
    renderTodos();
    renderDone();
});
