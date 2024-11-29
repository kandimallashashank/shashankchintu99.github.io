document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('background-music');
    const musicToggle = document.querySelector('.music-toggle');
    let isPlaying = false;

    console.log('Music element:', music); // Debug log

    function toggleMusic() {
        console.log('Toggle music called, current state:', isPlaying); // Debug log
        if (isPlaying) {
            music.pause();
            musicToggle.classList.add('muted');
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            console.log('Music paused'); // Debug log
        } else {
            music.play().then(() => {
                console.log('Music started playing successfully'); // Debug log
            }).catch(function(error) {
                console.error("Audio play failed:", error);
            });
            musicToggle.classList.remove('muted');
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isPlaying = !isPlaying;
    }

    // Add click event listener to music toggle button
    musicToggle.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Music toggle clicked'); // Debug log
        toggleMusic();
    });

    // Check if audio is loaded
    music.addEventListener('loadeddata', function() {
        console.log('Audio file loaded successfully'); // Debug log
    });

    // Check for audio errors
    music.addEventListener('error', function(e) {
        console.error('Audio error:', e); // Debug log
    });

    // Add event listener for first user interaction
    document.addEventListener('click', function initMusic() {
        console.log('First click detected'); // Debug log
        if (!isPlaying) {
            music.play().then(() => {
                console.log('Music started on first click'); // Debug log
                isPlaying = true;
                musicToggle.classList.remove('muted');
            }).catch(function(error) {
                console.error("Audio play failed on first click:", error);
            });
        }
        // Remove the event listener after first interaction
        document.removeEventListener('click', initMusic);
    });

    // Handle visibility change
    document.addEventListener('visibilitychange', function() {
        console.log('Visibility changed:', document.hidden); // Debug log
        if (document.hidden && isPlaying) {
            music.pause();
        } else if (!document.hidden && isPlaying) {
            music.play().catch(function(error) {
                console.error("Audio play failed on visibility change:", error);
            });
        }
    });
});
