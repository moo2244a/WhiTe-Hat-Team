let users = {
    "moo2244a": { password: "M01025365472", phone: "01025365472", projects: [], messages: [] },
    "Abdelrahman": { password: "A0128597216", phone: "0128597216", projects: [], messages: [] }
};

let currentUser = null;

// التحقق من تسجيل الدخول
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (users[username] && users[username].password === password) {
        currentUser = username;
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("dashboardContainer").style.display = "block";
        document.getElementById("currentUser").innerText = username;
        loadProjects();
        loadMessages();
    } else {
        document.getElementById("error").innerText = "بيانات الدخول غير صحيحة!";
    }
});

// تسجيل الخروج
function logout() {
    currentUser = null;
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("dashboardContainer").style.display = "none";
    document.getElementById("error").innerText = "";
}

// رفع مشروع
function uploadFile() {
    const fileInput = document.getElementById("fileUpload");
    const file = fileInput.files[0];
    if (file && currentUser) {
        users[currentUser].projects.push(file);
        loadProjects();
        alert("تم رفع المشروع بنجاح");
    }
}

// تحميل المشاريع
function loadProjects() {
    const projectList = document.getElementById("projectList");
    projectList.innerHTML = "";
    users[currentUser].projects.forEach((project, index) => {
        const projectDiv = document.createElement("div");
        projectDiv.innerHTML = `
            <span>${project.name}</span>
            <button onclick="openProject(${index})">فتح</button>
            <button onclick="deleteProject(${index})">حذف</button>
        `;
        projectList.appendChild(projectDiv);
    });
}

// فتح مشروع
function openProject(index) {
    const project = users[currentUser].projects[index];
    const url = URL.createObjectURL(project); // إنشاء رابط للملف
    window.open(url); // فتح الملف في نافذة جديدة
}

// حذف مشروع
function deleteProject(index) {
    users[currentUser].projects.splice(index, 1);
    loadProjects();
    alert("تم حذف المشروع بنجاح");
}

// إرسال رسالة
function sendMessage() {
    const recipient = document.getElementById("recipient").value;
    const messageContent = document.getElementById("messageContent").value;
    const messageFile = document.getElementById("messageFile").files[0]; // الملف الذي سيتم إرساله

    if (users[recipient]) {
        const message = { from: currentUser, content: messageContent, file: messageFile ? messageFile : null };
        users[recipient].messages.push(message);
        alert("تم إرسال الرسالة بنجاح");
        document.getElementById("recipient").value = "";
        document.getElementById("messageContent").value = "";
        document.getElementById("messageFile").value = "";
        loadMessages();
    } else {
        alert("يرجى إدخال مستخدم صحيح");
    }
}

// عرض الرسائل
function loadMessages() {
    const inbox = document.getElementById("inbox");
    inbox.innerHTML = "";
    users[currentUser].messages.forEach(message => {
        const messageDiv = document.createElement("div");
        messageDiv.innerText = `من ${message.from}: ${message.content}`;
        if (message.file) {
            const fileLink = document.createElement("div");
            const fileOpenButton = document.createElement("button");
            fileOpenButton.innerText = "فتح الملف";
            fileOpenButton.onclick = () => {
                const url = URL.createObjectURL(message.file);
                window.open(url);
            };
            fileLink.appendChild(fileOpenButton);
            messageDiv.appendChild(fileLink);
        }
        inbox.appendChild(messageDiv);
    });
}
