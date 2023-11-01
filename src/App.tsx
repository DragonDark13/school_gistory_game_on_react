import React from 'react';
import './App.css';
import HistoryTimeline from './components/HistoryTimeline/HistoryTimeline';
import historicalEvents from './data/data.json'

function App() {

    return (
        <div className="App">
            <HistoryTimeline events={historicalEvents.historyList}/>
        </div>
    );
}

export default App;
