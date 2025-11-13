(function() {
    let idleTime = 0;
    const idleLimit = 20; 

    setInterval(() => {
        idleTime++;
        if (idleTime >= idleLimit) {
            sessionStorage.setItem('lastPage', window.location.href);
            
            window.location.href = 'screensaver.html'; 
        }
    }, 1000);

    function resetTimer() {
        idleTime = 0;
    }

    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll', 'click'];
    events.forEach(event => {
        document.addEventListener(event, resetTimer);
    });

    console.log("Inactivity timer started...");
})();