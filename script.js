// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading screen
    setTimeout(function() {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 2000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .step, .input-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .step, .input-section');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Generate button functionality
    const generateBtn = document.getElementById('generateBtn');
    const eventInput = document.getElementById('eventInput');
    const contentType = document.getElementById('contentType');
    const resultContainer = document.getElementById('resultContainer');
    const exploreBtn = document.getElementById('exploreBtn');

    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            if (!eventInput.value.trim()) {
                alert('Please enter a historical event description');
                return;
            }
            
            simulateGeneration();
        });
    }

    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.querySelector('#try-it').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Simulate the generation process (for demo purposes)
    function simulateGeneration() {
        resultContainer.innerHTML = `
            <div class="generating-animation">
                <div class="loader"></div>
                <p>Generating ${contentType.value} about "${eventInput.value.trim()}"...</p>
            </div>
        `;
        
        // Simulate API call delay
        setTimeout(function() {
            showGeneratedContent();
        }, 3000);
    }

    // Show simulated generated content
    function showGeneratedContent() {
        const eventName = eventInput.value.trim();
        let content = '';
        
        if (contentType.value === 'video') {
            content = `
                <div class="video-result">
                    <div class="video-placeholder">
                        <div class="play-button">▶</div>
                        <p>Generated Video: ${eventName}</p>
                    </div>
                    <div class="video-details">
                        <h3>Video Summary</h3>
                        <p>This 2-minute video explains the key aspects of "${eventName}" with historical accuracy and engaging visuals.</p>
                        <div class="video-timeline">
                            <div class="timeline-point" style="left: 0%">Introduction</div>
                            <div class="timeline-point" style="left: 30%">Background</div>
                            <div class="timeline-point" style="left: 60%">Main Events</div>
                            <div class="timeline-point" style="left: 90%">Impact</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (contentType.value === 'timeline') {
            content = `
                <div class="timeline-result">
                    <h3>Interactive Timeline: ${eventName}</h3>
                    <div class="timeline-container">
                        <div class="timeline-event">
                            <div class="event-date">1789</div>
                            <div class="event-content">Beginning of the French Revolution</div>
                        </div>
                        <div class="timeline-event">
                            <div class="event-date">1792</div>
                            <div class="event-content">Establishment of the French Republic</div>
                        </div>
                        <div class="timeline-event">
                            <div class="event-date">1793-1794</div>
                            <div class="event-content">Reign of Terror</div>
                        </div>
                        <div class="timeline-event">
                            <div class="event-date">1799</div>
                            <div class="event-content">Napoleon Bonaparte comes to power</div>
                        </div>
                    </div>
                    <button class="explore-more">Explore Related Events</button>
                </div>
            `;
        } else {
            content = `
                <div class="summary-result">
                    <h3>Detailed Summary: ${eventName}</h3>
                    <div class="summary-content">
                        <p>The ${eventName} was a pivotal moment in history that reshaped the political and social landscape.</p>
                        <p>Key figures involved included [Generated Name] and [Generated Name], whose actions directly influenced the outcome.</p>
                        <p>The immediate consequences were [Generated Fact], leading to long-term impacts such as [Generated Fact].</p>
                    </div>
                    <div class="summary-keypoints">
                        <h4>Key Points:</h4>
                        <ul>
                            <li>Generated key point about the event</li>
                            <li>Important statistical information</li>
                            <li>Cultural impact analysis</li>
                            <li>Connections to modern day</li>
                        </ul>
                    </div>
                </div>
            `;
        }
        
        resultContainer.innerHTML = content;
        
        // Add animation to the result
        resultContainer.style.animation = 'fadeIn 1s ease';
    }

    // Add some sample animations for the demo
    const sampleEvents = [
        "French Revolution",
        "Moon Landing 1969",
        "Industrial Revolution",
        "World War II",
        "Renaissance Period"
    ];

    let currentSample = 0;
    setInterval(function() {
        if (!document.hidden && !eventInput.matches(':focus')) {
            eventInput.placeholder = `Describe a historical event (e.g., "${sampleEvents[currentSample]}")`;
            currentSample = (currentSample + 1) % sampleEvents.length;
        }
    }, 3000);
});