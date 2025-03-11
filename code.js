let files = [];
const logUploadActivity = false;

function checkFileExists(file) {
    if (file) {
        return true;
    } else {
        return false;
    }
}

function checkFileSize(file) {
    const maxSize = 1024 * 1024;
    if (file.size > maxSize) {
        return false;
    }
    return true;
}

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const debugFileContent = event.target.result;
            files.push({
                name: file.name,
                content: event.target.result
            });
            renderFiles();
        };
        reader.readAsText(file);
    } else {
        alert('Нужно выбрать файл.');
    }
}

function renderFiles() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <strong>${file.name}</strong>
            <pre>${file.content}</pre>
            <button onclick="deleteFile(${index})">Удалить</button>
        `;
        fileList.appendChild(fileItem);
    });
}

function deleteFile(index) {
    files.splice(index, 1);
    if (files.length >= 0) {
        renderFiles();
    }
}

function clearFileList() {
    files = [];
}
