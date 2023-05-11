import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

// const dates=[
//   {
//     "date": "12.05.2022",
//     "time": "18:30",
//     "votes": 6
//   },
//   {
//     "date": "12.05.2022",
//     "time": "18:30",
//     "votes": 0
//   },
//   {
//     "date": "12.05.2022",
//     "time": "18:30",
//     "votes": 9
//   }
// ];

// const root = ReactDOM.createRoot(document.getElementById('root'));
// const titleElement = 
// <div class="titleBox">
//   <h1>Списък с дати и часове</h1>
//   <h3>и гласове за тях</h3>
// </div>;

/* <div class="dates">
{dates.map(line => (
        <div key={i} style={{ margin: '30px' }}>
          <div>{`Date: ${line.date}`}</div>
          <div>{`Time: ${line.time}`}</div>
          <div>{`Votes: ${line.votes}`}</div>
        </div>
      ))}
</div> */
//root.render(titleElement);
