let container = document.querySelector('.game_container');
let cactus_container = document.querySelector('.cactus_container');
let jump_btn = document.getElementById('jump-btn');
let message = document.querySelector('.message');
let restart_btn = document.getElementById('restartbtn');
let timeout;
let create_cactus;
let collision_;
let timeout_forleft;
let lordIconElement = document.querySelector('lord-icon');

const startGame = () => {
    message.style.display = 'none';
    clearGame();

    document.querySelector('.back_slider').style.animation = 'back 1s linear infinite';

    create_cactus = setInterval(() => {
        let random = Math.floor(Math.random() * (7 - 2) + 2);
        let cactus = document.createElement('div');
        cactus.className = 'cactus';
        cactus.style.height = `${random}em`;
        cactus_container.appendChild(cactus);

        timeout = setTimeout(() => {
            let all_child = cactus_container.querySelectorAll('*').length - 1;
            if (cactus_container.children[all_child - 1]) {
                cactus_container.removeChild(cactus_container.children[all_child - 1]);
            }
        }, 4000);
    }, 4000);

    timeout_forleft = setTimeout(() => {
        collision_ = setInterval(() => {
            let high = parseInt(getComputedStyle(lordIconElement).getPropertyValue('bottom'));
            let cac = document.querySelector('.cactus');
            if (cac) {
                let lef = parseInt(getComputedStyle(cac).getPropertyValue('left'));
                let tallness = parseInt(getComputedStyle(cac).getPropertyValue('height'));

                if (lef > 40 && lef <= 130 && high <= tallness) {
                    stop();
                }
            }
        }, 10);
    }, 4000);

    restart_btn.disabled = true;
    jump_btn.disabled = false;
}

const stop = () => {
    document.querySelector('.back_slider').style.animation = 'none';
    message.style.display = 'block';

    let cac = cactus_container.querySelector('*');
    if (cac) {
        let lef = getComputedStyle(cac).getPropertyValue('left');
        cac.style.left = lef;
        cac.style.animation = 'none';
    }

    let high = getComputedStyle(lordIconElement).getPropertyValue('bottom');
    lordIconElement.style.bottom = high;

    clearInterval(create_cactus);
    clearTimeout(timeout);
    clearTimeout(timeout_forleft);
    clearInterval(collision_);

    restart_btn.disabled = false;
    jump_btn.disabled = true;
}

const clearGame = () => {
    cactus_container.innerHTML = '';
    lordIconElement.style.bottom = '11px';

    clearTimeout(timeout);
    clearTimeout(timeout_forleft);
    clearInterval(create_cactus);
    clearInterval(collision_);
}

restart_btn.addEventListener('click', startGame);

jump_btn.addEventListener('click', () => { 
    lordIconElement.playerInstance.goToFirstFrame();
    lordIconElement.playerInstance.play();
    lordIconElement.style.bottom = '190px';

    setTimeout(() => {
        lordIconElement.style.bottom = '11px';
    }, 1000);
});
