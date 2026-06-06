const targetDate = new Date("October 23, 2026 08:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {

        document.getElementById("countdown").innerHTML = `
        <div class="countdown-ended">
            SUKAN MUHIBBAH ILKBS 2026 TELAH BERMULA
        </div>
        `;

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("countdown").innerHTML = `

    <div class="countdown-box">
        <h2>${days}</h2>
        <span>Hari</span>
    </div>

    <div class="countdown-box">
        <h2>${hours}</h2>
        <span>Jam</span>
    </div>

    <div class="countdown-box">
        <h2>${minutes}</h2>
        <span>Minit</span>
    </div>

    <div class="countdown-box">
        <h2>${seconds}</h2>
        <span>Saat</span>
    </div>

    `;
}

updateCountdown();
setInterval(updateCountdown, 1000);
