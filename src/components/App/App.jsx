import React from 'react';
import classNames from 'classnames';
import styles from './App.css';
import SpreadTheWord from '../SpreadTheWord/SpreadTheWord.jsx';
import {track} from '../../analytics';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.imageUrl = chrome.extension.getURL('static/floating_button_256.png');
    this.state = {visible: false};
  }

  componentDidMount() {
    window.addEventListener('scroll', this._scrollEventListener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._scrollEventListener);
  }

  _scrollEventListener = () => {
    if (
      window.scrollY >= 500 &&
      document.body.scrollHeight - window.scrollY > 1800
    ) {
      if (!this.state.visible) {
        this.setState({visible: true});
      }
    } else {
      if (this.state.visible) {
        this.setState({visible: false});
      }
    }
  };

  render() {
    return (
      <div
        className={classNames(styles.container, {
          [styles.visibleFadeIn]: this.state.visible,
          [styles.hideFadeOut]: !this.state.visible,
        })}
      >
        <div
          className={classNames(styles.headerContainer, {
            [styles.headerExpanded]: this.state.expanded,
          })}
        >
          {this._getHeader()}
        </div>
        {this._getExpandedContent()}
      </div>
    );
  }

  _getHeader = () => {
    return (
      <div>
        <div
          className={classNames(styles.handCursor, styles.closeButton, {
            [styles.visibleFadeIn]: this.state.expanded,
            [styles.hide]: !this.state.expanded,
          })}
          onClick={() => this.setState({expanded: false})}
        >
          <span className={classNames(styles.handCursor)}>&#x2715;</span>
        </div>
        <div
          className={classNames(styles.iconContainer)}
          onClick={() => {
            if (!this.state.expanded) {
              track('FLOATING_BUTTON_CLICKED');
            }
            this.setState({expanded: !this.state.expanded});
          }}
        >
          <img className={classNames(styles.iconImg)} src={this.imageUrl} />
        </div>
        <div
          className={classNames(styles.headerContent, {
            [styles.visibleHeaderContent]: this.state.expanded,
            [styles.hideHeaderContent]: !this.state.expanded,
          })}
        >
          <span className={classNames(styles.nowrap)}>
            Medium-Unlimited
          </span>
        </div>
      </div>
    );
  };

  _getExpandedContent = () => {
    return (
      <div
        className={classNames(styles.bodyContent, {
          [styles.visibleBodyContent]: this.state.expanded,
          [styles.hideBodyContent]: !this.state.expanded,
        })}
      >
        <SpreadTheWord />
      </div>
    );
  };
}

export default App;
