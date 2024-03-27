(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function d(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=d(o);fetch(o.href,n)}})();const S=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué tareas quieres agregar?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="filter" id="todos-filter" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filter" id="pendientes-filter" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filter" id="completados-filter" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a target="_blank" href="https://github.com/ImSebz">Sebastián Camargo</a></p>\r
    <p>Hecho en Vanilla JS</p>\r
</footer>`;let y;const C=new Uint8Array(16);function L(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(C)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function E(e,t=0){return r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]}const I=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:I};function A(e,t,d){if(w.randomUUID&&!t&&!e)return w.randomUUID();e=e||{};const i=e.random||(e.rng||L)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){d=d||0;for(let o=0;o<16;++o)t[d+o]=i[o];return t}return E(i)}class P{constructor(t){if(!t)throw new Error("La descripción es obligatoria");this.id=A(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"Completed",Pending:"Pending"},l={todos:[],filter:c.All},k=()=>{T(),console.log("InitStore")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(l))},U=(e=c.All)=>{switch(e){case c.All:return[...l.todos];case c.Completed:return l.todos.filter(t=>t.done);case c.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Opción ${e} no es válida.`)}},D=e=>{if(!e)throw new Error("La descripción es obligatoria");l.todos.push(new P(e)),f()},O=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},q=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},x=()=>{l.todos=l.todos.filter(e=>!e.done),f()},F=(e=c.All)=>{l.filter=e,f()},H=()=>l.filter,a={addTodo:D,deleteCompletedTodo:x,deleteTodo:q,getCurrentFilter:H,getTodos:U,initStore:k,loadStore:T,setFilter:F,toggleTodo:O},M=e=>{if(!e)throw new Error("El TODO es requerido");const{done:t,description:d,id:i}=e,o=`
            <div class="view">
                <input class="toggle" type="checkbox" ${t?"checked":""}>
                <label>${d}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
`,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",i),t&&n.classList.add("completed"),n};let b;const N=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error(`Elemento con id ${e} no encontrado`);b.innerHTML=a.getTodos(c.Pending).length};let h;const V=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Elemento con id ${e} no encontrado`);h.innerHTML="",t.forEach(d=>{h.append(M(d))})},m={ClearCompleted:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilter:".filter",PendingCount:"#pending-count"},R=e=>{const t=()=>{const s=a.getTodos(a.getCurrentFilter());V(m.TodoList,s),d()},d=()=>{N(m.PendingCount)};(()=>{const s=document.createElement("div");s.innerHTML=S,document.querySelector(e).appendChild(s),t()})();const i=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.ClearCompleted),u=document.querySelectorAll(m.TodoFilter);i.addEventListener("keyup",s=>{s.keyCode==13&&s.target.value.trim().length!==0&&(a.addTodo(s.target.value),t(),i.value="")}),o.addEventListener("click",s=>{const p=s.target.closest("[data-id]").getAttribute("data-id");a.toggleTodo(p),t()}),o.addEventListener("click",s=>{const g=s.target.className==="destroy",p=s.target.closest("[data-id]"),v=p.getAttribute("data-id");!p||!g||(a.deleteTodo(v),t())}),n.addEventListener("click",()=>{a.deleteCompletedTodo(),t()}),u.forEach(s=>{s.addEventListener("click",g=>{switch(u.forEach(p=>p.classList.remove("selected")),g.target.classList.add("selected"),g.target.id){case"todos-filter":a.setFilter(c.All);break;case"pendientes-filter":a.setFilter(c.Pending);break;case"completados-filter":a.setFilter(c.Completed);break}t()})})};a.initStore();R("#app");
