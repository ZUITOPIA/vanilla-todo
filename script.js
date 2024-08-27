function handleAddTodo() {
    let inputValue = document.getElementById("todo-input").value; // 입력한 todo 집중
    if (!inputValue) return; // 입력된 todo가 존재하지 않는다면 아무것도 하지 않기 위함

    let todos = JSON.parse(localStorage.getItem("todos")) || []; // localstorage에 저장해둔 todo를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)
    todos.push(inputValue); // 입력된 todo를 추가

    localStorage.setItem("todos", JSON.stringify(todos)); // update 된 객체를 localStorage 에도 update

    document.getElementById("todo-input").value = ""; // todo input 창 초기화
    renderTodos(); // todo 목록 새로고침
}

document.getElementById("add-todo-btn").addEventListener("click", handleAddTodo); // +버튼에 todo 추가하는 함수 연결
document.getElementById("todo-input").addEventListener("keydown", function (event) {
    if (event.isComposing && event.key === "Enter") {
        handleAddTodo(); // Enter 키가 눌리면 todo 추가 함수 호출
    }
});

function renderTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || []; // 저장해두었던 todo 목록 가져오기 (아직 없다면 빈 배열로 초기화)
    let todoList = document.querySelector(".todo-list"); // todo 목록 집중

    todoList.innerHTML = ""; // 새로운 목록을 업데이트하기 위해 기존 목록 초기화
    // 초기화하지 않고도 배열에 추가된 항목을 화면에 표시할 수 있지만 -> 중복 문제, 성능 문제 생길 수 있음

    todos.forEach((todo, index) => {
        let li = document.createElement("li"); // todo 목록에 들어있는 각각의 값 마다 li 태그 붙이기
        li.innerHTML = `<span onclick="handleAddDone(${index})">${todo}</span> <i class="delete-btn" onclick="handleDeleteTodoItem(${index})"></i>`; // handleAddDone 함수와 handleDeleteTodoItem의 인자로 index를 넘겨주는 기능을 한 번에 처리하기 위함
        todoList.appendChild(li); // 클래스인 todo-list의 자식 요소로 추가
    });

    document.getElementById("todo-list-title").textContent = `📋 TO DO (${todos.length})`; // todo 목록에 들어있는 값의 개수
}

function handleDeleteTodoItem(index) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []; // localstorage에 저장해둔 todo를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)

    todos.splice(index, 1); // todos 배열 내의 index에 해당하는 값을 1개 삭제할 것

    localStorage.setItem("todos", JSON.stringify(todos)); // update된 todos 배열 localStorage에 update

    renderTodos(); // todo 목록에서 하나를 삭제했으므로 목록 새로고침
}

function handleAddDone(index) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []; // localstorage에 저장해둔 todo를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)
    let done = JSON.parse(localStorage.getItem("done")) || []; // localstorage에 저장해둔 done를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)

    done.push(todos[index]); // 선택한 todo를 done 목록으로 이동
    todos.splice(index, 1); // todos 배열 내에서 done 배열로 옮겨가는 것은 곧 todos 배열에서 삭제하는 것과 같음

    localStorage.setItem("todos", JSON.stringify(todos)); // 값이 하나 삭제된 todos 배열 Update
    localStorage.setItem("done", JSON.stringify(done)); // 값이 하나 추가된 done 배열 Update

    renderTodos(); // update 됐으므로 새로고침
    renderDone(); // update 됐으므로 새로고침
}

function renderDone() {
    let done = JSON.parse(localStorage.getItem("done")) || []; // localstorage에 저장해둔 done를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)
    let doneList = document.querySelector(".done-list"); // done-list에 집중

    doneList.innerHTML = ""; // (위 renderTodo 내부와 마찬가지) 새로운 목록을 업데이트하기 위해 기존 목록 초기화

    done.forEach((todo, index) => {
        let li = document.createElement("li"); // done 목록에 들어있는 각각의 값 마다 li 태그 붙이기
        li.innerHTML = `<span>${todo}</span> <i class="delete-btn" onclick="handleDeleteDoneItem(${index})"></i>`; // handleAddDone 함수와 handleDeleteTodoItem의 인자로 index를 넘겨주는 기능을 한 번에 처리하기 위함
        doneList.appendChild(li); // 클래스인 done-list의 자식 요소로 추가
    });

    document.getElementById("done-list-title").textContent = `💿 DONE (${done.length})`; // done 목록에 들어있는 값의 개수
}

function handleDeleteDoneItem(index) {
    let done = JSON.parse(localStorage.getItem("done")) || []; // localstorage에 저장해둔 done를 가져와서 객체로 (아직 아무것도 없다면 빈 배열로 초기화)
    done.splice(index, 1); // done 목록에서 index에 있는 값부터 1개 삭제

    localStorage.setItem("done", JSON.stringify(done)); // update된 done 목록 localStorage에도 update

    renderDone(); // update 하였으므로 새로고침
}

document.addEventListener("DOMContentLoaded", () => {
    // 초기 렌더링 설정을 위한 코드
    // DOM이 완전히 로드된 후에 초기화되도록 설정!
    // 로컬 저장소에서 가져온 데이터로 초기 상태 보여질 수 있도록 함
    // 이 코드가 없다면 페이지 로드 시 초기 목록을 로드하는 데 실패할 수 있음
    renderTodos();
    renderDone();
});
