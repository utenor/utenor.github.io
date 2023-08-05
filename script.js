const commandInput = document.getElementById("commandInput");
const outputElement = document.getElementById("output");

let commandHistory = [];
let historyIndex = -1;

commandInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const command = commandInput.value.trim();
        executeCommand(command);
        commandInput.value = "";
        commandHistory.push(command);
        historyIndex = commandHistory.length;
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            commandInput.value = commandHistory[historyIndex];
        }
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.value = commandHistory[historyIndex];
        } else {
            commandInput.value = "";
        }
    }
});

function executeCommand(command) {
    let output = "";

    const commands = {
        help:"<br>Available commands:<br>- help: Display available commands<br>- about: Learn about UTENOR<br>- skills: View my skills<br>- socials: Connect with me on socials<br>- projects: Explore my projects<br>- devblog: Discover my devblogs<br>- clear: Clear the terminal",
        about:"<br>A little about me:<br><br>Hey there, I'm UTENOR, a creative soul with a passion for expressing ideas through web development, art, and a love for cars. I enjoy bringing my imagination to life on the digital canvas and showcasing my passions through my work. Whether it's crafting code or designing visuals, I find joy in every project I embark on. I'm on a constant quest to learn and grow in this ever-evolving digital landscape. Let's embark on this journey together and make something extraordinary!",
        devblog: `<br>Explore my DevBlog Posts:<br>
<a href='https://discord.gg' target='_blank'>UTENOR DevBlog #1: 04/08/2023</a><br>
<a href='https://discord.gg' target='_blank'>UTENOR DevBlog #2: 11/08/2023</a><br>
<a href='https://discord.gg' target='_blank'>UTENOR DevBlog #3: 18/08/2023</a><br>
<a href='https://discord.gg' target='_blank'>UTENOR DevBlog #4: 25/08/2023</a>`,
        socials: `<br>Connect with me on social media:<br>
<a href='https://discord.gg' target='_blank'>Discord</a><br>
<a href='https://youtube.com' target='_blank'>YouTube</a><br>
<a href='https://github.com/ares-gh' target='_blank'>GitHub</a><br>
<a href='https://steampowered.com' target='_blank'>Steam</a><br>
<a href='https://spotify.com' target='_blank'>Spotify</a>`,
        skills: `<br>Discover My ICT Skills:<br>
- Web Development (HTML, CSS, JavaScript)<br>
- Programming (Python, Java, C++)<br>
- Database Management (SQL, MySQL)<br>
- Network Administration<br>
- System Administration (Linux, Windows)<br>
- Software Troubleshooting<br>
- Technical Support<br>
- Data Analysis`,
        projects: `<br>Browse My Projects:<br>
<a href='https://huracan.dev' target='_blank'>UTENOR</a><br>
<a href='https://huracan.dev' target='_blank'>TopLine Retail</a><br>
<a href='https://huracan.dev' target='_blank'>GeoMedia</a>`,
    };

    output = commands[command] || "<br>Command not found. Type 'help' to see available commands.";

    if (command === "clear") {
        clearTerminal();
        return; 
    }
    
    outputElement.innerHTML += `<br><span class="directory">user@UTENOR:~$</span> ${command}<br><pre><span class="output-text">${output}</span></pre>`;
    outputElement.scrollTop = outputElement.scrollHeight; 
}

function clearTerminal() {
    outputElement.innerHTML = "";
}

// Function to get the current UK time
function getCurrentUKTime() {
  const now = new Date();
  const offset = now.getTimezoneOffset(); // Get the timezone offset in minutes
  const ukOffset = 60; // UK time is either GMT (0) or BST (1 hour ahead of GMT)
  const ukTime = new Date(now.getTime() + (ukOffset + offset) * 60 * 1000);
  return ukTime.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
}

// Function to update the UK time in the welcome message
function updateUKTime() {
  const ukTimeElement = document.getElementById('ukTime');
  ukTimeElement.textContent = getCurrentUKTime();
}

// Call the updateUKTime function to set the initial UK time
updateUKTime();

// Call the updateUKTime function every second to update the time continuously
setInterval(updateUKTime, 1000);

// Function to fetch the current weather from OpenWeatherMap API
async function getWeather() {
  const apiKey = '62221f14ec9e065474c3a1b965982ea9'; // Replace with your OpenWeatherMap API key
  const city = 'Newport'; // Replace with your city name
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const weatherElement = document.getElementById('weather');
    weatherElement.textContent = `${temperature}°C`;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Call the getWeather function to fetch and display the current weather
getWeather();

