function openGithub() {
    chrome.tabs.create({ url: 'https://github.com/kaleidoscopess' });
}

function openBili(){
    chrome.tabs.create({ url: 'https://space.bilibili.com/27632350' });
}

function init() {
    var ava = document.getElementById('ava');
    ava.onclick = openGithub;

    var bili = document.getElementById('bili');
    bili.onclick = openBili;
}

init();