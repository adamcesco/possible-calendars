/* global chrome */
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const onCreateCalendarClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: () => {
        const itineraryContainers = document.querySelectorAll('.itineraryCardContainer');

        const itineraryData = Array.from(itineraryContainers).map(itineraryContainer => {
          const dateElement = itineraryContainer.querySelector('.dateContainer');
          const timeElements = itineraryContainer.querySelectorAll('.rangeTime');
        
          const dayOfWeek = dateElement.querySelector('.dayOfWeek').textContent;
          const dayOfMonth = dateElement.querySelector('.dayOfMonth').textContent;
          const monthOfYear = dateElement.querySelector('.monthOfYear').textContent;
        
          const timeslots = Array.from(timeElements).map(timeElement => {
            const time = timeElement.querySelector('.time').textContent;
            const duration = timeElement.querySelector('.durationTime').textContent;
            return { time, duration };
          });
        
          return {
            date: `${dayOfWeek}, ${monthOfYear} ${dayOfMonth}`,
            timeslots
          };
        });

        const timezone = document.querySelector('input[name="timezones"]')?.value;

        const jsonData = {
          timezone,
          itinerary: itineraryData
        };

        console.log(jsonData);
      }
    });
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onCreateCalendarClick}>
          create calendar
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
