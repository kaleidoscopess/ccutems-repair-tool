function openGithub() {
    chrome.tabs.create({ url: 'https://github.com/kaleidoscopess/ccutems-repair-tool' });
}

function openBili(){
    chrome.tabs.create({ url: 'https://www.bilibili.com/video/BV1YT4y1P7PS/' });
}

function init() {
    var ava = document.getElementById('ava');
    ava.onclick = openGithub;

    var bili = document.getElementById('bili');
    bili.onclick = openBili;
}

init();