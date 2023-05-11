import './App.css';
import { useState } from 'react';

function App() {

  const [dates,setDates]=useState([
    {"id":1,"date": "12.05.2022", "time": "18:30","votes": 6},
    {"id":2,"date": "12.05.2022","time": "19:30","votes": 0},
    {"id":3,"date": "13.05.2022","time": "18:30","votes": 1},
    {"id":4,"date": "13.05.2022","time": "19:30","votes": 4},
    {"id":5,"date": "14.05.2022","time": "18:30","votes": 5},
    {"id":6,"date": "14.05.2022","time": "19:30","votes": 11},
    {"id":7,"date": "15.05.2022","time": "18:30","votes": 1},
    {"id":8,"date": "15.05.2022","time": "19:30","votes": 2},
    {"id":9,"date": "16.05.2022","time": "18:30","votes": 5},
    {"id":10,"date": "16.05.2022","time": "19:30","votes": 0},
    {"id":11,"date": "17.05.2022","time": "18:30","votes": 1},
    {"id":12,"date": "17.05.2022","time": "19:30","votes": 3}
  ]);
}

export default App;
