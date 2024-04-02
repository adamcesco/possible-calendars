/* global chrome */
console.log('Content script loaded');
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'scrape') {
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

    sendResponse({ jsonData });
  }
});