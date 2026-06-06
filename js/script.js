const targetDate = new Date("October 23, 2026 08:00:00").getTime();

function updateCountdown(){

const now = new Date().getTime();

const distance = targetDate - now;

const days = Math.floor(distance / (1000 * 60 * 60 * 24));

const hours = Math.floor(
(distance % (1000 * 60 * 60 * 24))
/
(1000 * 60 * 60)
);

const minutes = Math.floor(
(distance % (1000 * 60 * 60))
/
(1000 * 60)
);

const seconds = Math.floor(
(distance % (1000 * 60))
/
1000
);

document.getElementById("countdown").innerHTML = `
<div class="count-box">
<h3>${days}</h3>
Hari
</div>

<div class="count-box">
<h3>${hours}</h3>
Jam
</div>

<div class="count-box">
<h3>${minutes}</h3>
Minit
</div>

<div class="count-box">
<h3>${seconds}</h3>
Saat
</div>
`;
}

setInterval(updateCountdown,1000);

updateCountdown();
