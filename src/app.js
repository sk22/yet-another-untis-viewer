import React, { Component } from 'react'
// import styled from 'styled-components'

import Toolbar from './components/toolbar'
import Settings from './components/settings'
import Icon from './components/icon'
import Flex from './components/flex'
import Timetable from './components/timetable'
import Container from './components/container'

import fetchLists from './lib/fetch-lists'
import timetableFetcher from './lib/timetable-fetcher'
import weekOfYear from './lib/week-of-year'
import { load as storageLoad, save as storageSave } from './lib/data-storage'

class App extends Component {
  state = storageLoad() ? {
    ...storageLoad(),
    settingsActive: false,
    week: weekOfYear()
  } : {
    settingsActive: false,
    url: 'https://intranet.spengergasse.at/stundenplan-data',
    element: '0',
    list: '0',
    lists: {},
    week: weekOfYear()
  }

  setHtml = async () => {
    const html = await this.fetchTimetable(this.state)
    if (html) this.setState({ html }, this.save)
  }

  setActiveRequest = promise => {
    this.setState({ activeRequest: promise })
  }

  save = () => storageSave(this.state)
  fetchTimetable = timetableFetcher()

  handleListChange = list => this.setState({ list, element: '0' }, this.save)

  handleElementChange = async element => {
    this.setState({ element, html: null }, this.setHtml)
  }

  handleSettingsClick = () => this.setState({
    settingsActive: !this.state.settingsActive
  })

  handleSettingsSubmit = async e => {
    e.preventDefault()
    const lists = await fetchLists(this.inputUrl.value)
    this.setState({ lists })
    this.handleListChange(Object.keys(lists)[0])
  }

  render() {
    return (
      <div>
        <Toolbar>
          <div>
            {this.state.title || 'Untis Viewer'}
          </div>
          <Flex>
            <button onClick={this.handleStarClick}>
              <Icon>star</Icon>
            </button>
            <button onClick={this.handleSettingsClick}>
              <Icon>settings</Icon>
            </button>
          </Flex>
        </Toolbar>
        <form onSubmit={this.handleSettingsSubmit}>
          <Settings active={this.state.settingsActive}>
            <Flex>
              <select
                onChange={e => this.handleListChange(e.target.value)}
                value={this.state.list}
              >
                {Object.keys(this.state.lists).map(name => (
                  <option value={name} key={name}>{name}</option>
                ))}
              </select>
              <select
                onChange={e => this.handleElementChange(e.target.value)}
                value={this.state.element}
              >
                {this.state.lists[this.state.list] &&
                this.state.lists[this.state.list].map(item => (
                  <option value={item.key} key={item.key}>{item.name}</option>
                ))}
              </select>
            </Flex>
            <label htmlFor="url">URL</label>
            <input
              type="url"
              defaultValue={this.state.url}
              ref={ref => { this.inputUrl = ref }}
            />
            <button type="submit">Update</button>
          </Settings>
        </form>
        {Number(this.state.element)
          ? <Timetable {...this.state} />
          : <Container><p>Choose a timetable</p></Container>}
      </div>
    )
  }
}

export default App
