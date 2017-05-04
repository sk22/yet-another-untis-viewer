import React, { Component } from 'react'
// import styled from 'styled-components'

import Toolbar from './components/toolbar'
import Settings from './components/settings'
import Timetable from './views/timetable'

class App extends Component {
  state = {
    settingsActive: true,
    timetable: {}
  }

  toggleSettings = () => this.setState({
    settingsActive: !this.state.settingsActive
  })

  saveSettings = () => {
    console.log('saving')
  }

  fetchInfo = e => {
    e.preventDefault()
    console.log('clicked')
  }

  render() {
    return (
      <div>
        <Toolbar>
          <div>
            {this.state.timetable.title || 'Untis Viewer'}
          </div>
          <div>
            <button onClick={this.toggleSettings}><i>settings</i></button>
          </div>
        </Toolbar>
        <form onSubmit={this.fetchInfo}>
          <Settings active={this.state.settingsActive}>
            <label htmlFor="url">URL</label>
            <input type="url" />
            <button type="submit">Update</button>
          </Settings>
        </form>
        <Timetable />
      </div>
    )
  }
}

export default App
