import React, { Component } from 'react'
import remove from 'lodash.remove'

import Toolbar from './components/toolbar'
import Settings from './components/settings'
import Icon from './components/icon'
import Flex from './components/flex'
import Timetable from './components/timetable'
import Container from './components/container'
import WeekNumber from './components/week-number'
import Favorites from './components/favorites'
import Margin from './components/margin'
import Title from './components/title'
import BoxedInput from './components/boxed-input'
import Select from './components/select'
import Button from './components/button'

import fetchLists from './lib/fetch-lists'
import timetableFetcher from './lib/timetable-fetcher'
import weekOfYear from './lib/week-of-year'
import { load as storageLoad, save as storageSave } from './lib/data-storage'

const storage = storageLoad()

const defaultState = {
  version: 1,
  settingsActive: true,
  url: location.hash.slice(1) || '',
  element: '0',
  list: '0',
  lists: {},
  starred: [],
  week: weekOfYear(),
  html: null
}

class App extends Component {
  state = storage && storage.version === defaultState.version ? {
    ...storageLoad(),
    settingsActive: Boolean(location.hash.slice(1))
      && storage.url !== location.hash.slice(1),
    week: weekOfYear(),
    html: null,
    url: location.hash.slice(1) || storage.url
  } : defaultState

  componentDidMount() {
    if (Number(this.state.element)) {
      this.setHtml()
    } else if (this.state.url) {
      this.handleUpdateClick()
    }
  }

  setHtml = async () => {
    const html = await this.fetchTimetable(this.state)
    if (html) this.setState({ html }, this.save)
  }

  setActiveRequest = promise => {
    this.setState({ activeRequest: promise })
  }

  handleListChange = list => this.setState({
    list, element: '0'
  }, this.save)

  handleElementChange = async element => {
    this.setState({ element, html: null }, () => {
      this.setHtml().then(this.save)
    })
  }

  handleSettingsClick = () => this.setState({
    settingsActive: !this.state.settingsActive
  })

  handleUpdateClick = async e => {
    if (e) e.preventDefault()
    const lists = await fetchLists(this.inputUrl.value) || []
    this.setState({ lists, url: this.inputUrl.value })
    this.handleListChange(Object.keys(lists)[0])
  }

  handleStarClick = () => {
    if (!Number(this.state.element)) return
    const starred = this.state.starred
    const matching = starred.find(this.matchesCurrent)
    if (matching) {
      // not functional :(
      remove(starred, matching)
      this.setState({ starred })
    } else {
      this.setState({ starred: [...this.state.starred, {
        list: this.state.list,
        element: this.state.element
      }] })
    }
  }

  handleSelectTimetable = ({ element, list }) => {
    this.setState({ element, list, html: null }, () => {
      this.setHtml().then(this.save)
    })
  }

  handleChangeWeek = value => {
    this.setState({ week: value, html: null }, this.setHtml)
  }

  handleCurrentWeekClick = () => {
    this.setState({ week: weekOfYear() }, this.setHtml)
  }

  handleWeekDelta = delta => this.setState({
    week: this.state.week + delta,
    html: null
  }, this.setHtml)

  save = () => storageSave(this.state)
  fetchTimetable = timetableFetcher()

  matchesCurrent = v => (
    v.list === this.state.list && v.element === this.state.element
  )

  render() {
    return (
      <div>
        <Toolbar>
          <Title>Untis</Title>
          <Flex>
            <Favorites
              value="Favs"
              onChange={e => this.handleSelectTimetable(
                e.target.selectedOptions[0].dataset
              )}
            >
              {[
                <option disabled key="favorites">Favs</option>,
                ...this.state.starred.map(v => this.state.lists[v.list] && (
                  <option
                    key={`${v.list[0]}${v.element}`}
                    data-list={v.list}
                    data-element={v.element}
                  >{this.state.lists[v.list][v.element].name}</option>
                ))
              ]}
            </Favorites>
            <Icon small onClick={() => this.handleWeekDelta(-1)}>
              navigate_before
            </Icon>
            <WeekNumber
              type="number"
              value={this.state.week}
              onChange={e => this.handleChangeWeek(e.target.valueAsNumber)}
            />
            <Icon small onClick={() => this.handleWeekDelta(1)}>
              navigate_next
            </Icon>
            <Icon onClick={this.handleCurrentWeekClick}>today</Icon>
            <Icon onClick={this.handleSettingsClick}>
              {this.state.settingsActive ? 'close' : 'settings'}
            </Icon>
          </Flex>
        </Toolbar>
        <form onSubmit={this.handleUpdateClick}>
          <Settings active={this.state.settingsActive}>
            <Flex>
              <Margin right><Select
                name="lists"
                onChange={e => this.handleListChange(e.target.value)}
                value={this.state.list}
              >
                {Object.keys(this.state.lists).map(name => (
                  <option value={name} key={name}>{name}</option>
                ))}
              </Select></Margin>
              <Margin right><Select
                name="elements"
                onChange={e => this.handleElementChange(e.target.value)}
                value={this.state.element}
              >
                {this.state.lists[this.state.list] &&
                this.state.lists[this.state.list].map(item => (
                  <option value={item.key} key={item.key}>{item.name}</option>
                ))}
              </Select></Margin>
              <Icon onClick={this.handleStarClick}>
                {this.state.starred.find(this.matchesCurrent)
                  ? 'star' : 'star_border'}
              </Icon>
            </Flex>
            <label htmlFor="url">URL</label>
            <BoxedInput
              id="url"
              type="url"
              defaultValue={this.state.url}
              innerRef={ref => { this.inputUrl = ref }}
            />
            <Button type="submit">Update</Button>
          </Settings>
        </form>
        {Number(this.state.element)
          ? <Timetable html={this.state.html} />
          : <Container><p>Choose a timetable</p></Container>}
      </div>
    )
  }
}

export default App
