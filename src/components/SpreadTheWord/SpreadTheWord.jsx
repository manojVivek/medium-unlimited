import React from 'react';
import classNames from 'classnames';

import styles from './SpreadTheWord.css';

class SpreadTheWord extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={classNames(styles.header)}>
          Finding <b>Medium-Unlimited</b> extension helpful? <br />
          Please help spread the word!
        </div>
        <div className={classNames(styles.shareList)}>
          <div className={classNames(styles.shareIcon)}>
            {this._getTwitterIcon()}
          </div>
          <div className={classNames(styles.shareIcon)}>
            <span>{this._getFacebookIcon()}</span>
          </div>
          <div className={classNames(styles.shareIcon)}>
            <span>{this._getLinkedinIcon()}</span>
          </div>
          <div className={classNames(styles.shareIcon)}>
            <span>{this._getGplusIcon()}</span>
          </div>
        </div>
      </div>
    );
  }

  _getShareContent = () => {
    return 'Read medium.com Membership articles for free. Use this chrome extension - ';
  };

  _getShareUrl = source => {
    const url =
      'https://chrome.google.com/webstore/detail/eipfkfmeeebeehnkhmmgneiopemjamej';
    if (source) {
      return url + '?source=' + source;
    }
    return url;
  };

  _getTwitterIcon = () => {
    return (
      <span
        className={classNames(styles.handCursor)}
        onClick={() =>
          window.open(
            'https://twitter.com/intent/tweet?text=' +
              this._getShareContent() +
              this._getShareUrl('twitter'),
            '_blank'
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{isolation: 'isolate'}}
          viewBox="0 0 29 29"
          width="40"
          height="40"
        >
          <defs>
            <clipPath id="_clipPath_ivr1KsuYy3c3K1IftooGO4lWYriZ6x0W">
              <rect width="29" height="29" />
            </clipPath>
          </defs>
          <g clipPath="url(#_clipPath_ivr1KsuYy3c3K1IftooGO4lWYriZ6x0W)">
            <path
              d=" M 22.053 7.54 C 21.204 6.611 20.002 6.083 18.743 6.085 C 16.244 6.085 14.218 8.11 14.217 10.609 C 14.217 10.959 14.257 11.309 14.299 11.659 C 10.665 11.452 7.287 9.72 4.999 6.889 C 4.609 7.579 4.389 8.349 4.349 9.149 C 4.379 10.749 5.179 12.139 6.369 12.939 C 5.649 12.919 4.959 12.719 4.349 12.369 C 4.339 12.389 4.339 12.409 4.349 12.449 C 4.339 14.619 5.899 16.449 7.979 16.889 C 7.589 16.969 7.189 17.019 6.769 17.049 C 6.489 17.019 6.199 16.999 5.959 16.969 C 6.499 18.739 8.169 20.049 10.159 20.119 C 8.528 21.354 6.545 22.034 4.499 22.059 C 4.159 22.029 3.799 21.999 3.449 21.979 C 5.449 23.249 7.829 23.999 10.389 23.999 C 18.699 23.999 23.249 17.099 23.229 11.149 C 23.249 10.909 23.239 10.719 23.229 10.499 C 24.119 9.879 24.879 9.079 25.489 8.159 C 24.669 8.539 23.799 8.779 22.899 8.879 C 23.837 8.315 24.53 7.419 24.839 6.369 C 23.999 6.899 23.029 7.269 22.009 7.499 L 22.053 7.54 Z "
              fill="rgb(255,255,255)"
            />
          </g>
        </svg>
      </span>
    );
  };

  _getFacebookIcon = () => {
    return (
      <span
        className={classNames(styles.handCursor)}
        onClick={() =>
          window.open(
            'https://www.facebook.com/sharer/sharer.php?u=' +
              this._getShareUrl('facebook') +
              '&quote=' +
              this._getShareContent(),
            '_blank'
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{isolation: 'isolate'}}
          viewBox="0 0 29 29"
          width="40"
          height="40"
        >
          <defs>
            <clipPath id="_clipPath_VFOMaKg6co3kOdtptH9EtVw9oItdKgrm">
              <rect width="29" height="29" />
            </clipPath>
          </defs>
          <g clipPath="url(#_clipPath_VFOMaKg6co3kOdtptH9EtVw9oItdKgrm)">
            <path
              d=" M 24.36 14.55 C 24.36 9.077 19.945 4.64 14.5 4.64 C 9.055 4.64 4.64 9.077 4.64 14.55 C 4.64 19.494 8.245 23.58 12.955 24.327 L 12.955 17.342 L 10.55 17.342 L 10.55 14.545 L 12.955 14.545 L 12.955 12.48 C 12.955 10.087 14.41 8.784 16.535 8.784 C 17.552 8.784 18.427 8.86 18.682 8.894 L 18.682 11.396 L 17.208 11.396 C 16.053 11.396 15.828 11.949 15.828 12.758 L 15.828 14.545 L 18.585 14.545 L 18.225 17.342 L 15.83 17.342 L 15.83 24.36 C 20.644 23.706 24.36 19.57 24.36 14.55 Z "
              fill="rgb(255,255,255)"
            />
          </g>
        </svg>
      </span>
    );
  };

  _getLinkedinIcon = () => {
    return (
      <span
        className={classNames(styles.handCursor)}
        onClick={() =>
          window.open(
            'https://www.linkedin.com/shareArticle?mini=true&url=' +
              this._getShareUrl('linkedin') +
              '&summary=' +
              this._getShareContent(),
            '_blank'
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{isolation: 'isolate'}}
          viewBox="0 0 29 29"
          width="40"
          height="40"
        >
          <defs>
            <clipPath id="_clipPath_V73mGRAu5vAtkHgvfvb4wO2K6pZ9zZKQ">
              <rect width="29" height="29" />
            </clipPath>
          </defs>
          <g clipPath="url(#_clipPath_V73mGRAu5vAtkHgvfvb4wO2K6pZ9zZKQ)">
            <path
              d=" M 5.952 3.438 C 4.567 3.447 3.447 4.567 3.438 5.952 L 3.438 23.048 C 3.438 24.423 4.577 25.563 5.952 25.563 L 23.048 25.563 C 24.423 25.563 25.563 24.423 25.563 23.048 L 25.563 5.952 C 25.563 4.577 24.423 3.438 23.048 3.438 L 5.952 3.438 Z  M 5.952 5.449 L 23.048 5.449 C 23.335 5.449 23.551 5.665 23.551 5.952 L 23.551 23.048 C 23.554 23.182 23.502 23.312 23.407 23.407 C 23.312 23.502 23.182 23.554 23.048 23.551 L 5.952 23.551 C 5.817 23.554 5.688 23.502 5.593 23.407 C 5.498 23.312 5.446 23.183 5.449 23.048 L 5.449 5.952 C 5.449 5.665 5.665 5.449 5.952 5.449 Z  M 8.906 7.178 C 8.279 7.162 7.693 7.489 7.375 8.03 C 7.056 8.57 7.056 9.241 7.375 9.782 C 7.693 10.323 8.279 10.649 8.906 10.634 C 9.845 10.612 10.593 9.844 10.593 8.906 C 10.593 7.967 9.845 7.2 8.906 7.178 Z  M 17.988 11.766 C 16.547 11.766 15.588 12.555 15.192 13.305 L 15.129 13.305 L 15.129 11.986 L 12.3 11.986 L 12.3 21.54 L 15.254 21.54 L 15.254 16.825 C 15.254 15.58 15.502 14.374 17.045 14.374 C 18.566 14.374 18.586 15.78 18.586 16.888 L 18.586 21.54 L 21.54 21.54 L 21.54 16.291 C 21.54 13.723 20.994 11.766 17.989 11.766 L 17.988 11.766 Z  M 7.46 11.986 L 7.46 21.54 L 10.446 21.54 L 10.446 11.986 L 7.46 11.986 Z "
              fill="rgb(255,255,255)"
            />
          </g>
        </svg>
      </span>
    );
  };

  _getGplusIcon = () => {
    return (
      <span
        className={classNames(styles.handCursor)}
        onClick={() =>
          window.open(
            'https://plus.google.com/share?url=' +
              this._getShareUrl('googleplus'),
            '_blank'
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{isolation: 'isolate'}}
          viewBox="0 0 29 29"
          width="40"
          height="40"
        >
          <defs>
            <clipPath id="_clipPath_NROlIUatBptegyK44EecoaurkpYXKnxg">
              <rect width="29" height="29" />
            </clipPath>
          </defs>
          <g clipPath="url(#_clipPath_NROlIUatBptegyK44EecoaurkpYXKnxg)">
            <g>
              <g>
                <g>
                  <path
                    d=" M 23.5 13 L 23.5 10 L 22 10 L 22 13 L 19 13 L 19 14.5 L 22 14.5 L 22 17.5 L 23.5 17.5 L 23.5 14.5 L 26.5 14.5 L 26.5 13 L 23.5 13 Z "
                    fill="rgb(255,255,255)"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d=" M 10 13 L 10 16 L 14.244 16 C 13.624 17.746 11.956 19 10 19 C 7.519 19 5.5 16.981 5.5 14.5 C 5.5 12.019 7.519 10 10 10 C 11.076 10 12.111 10.386 12.915 11.086 L 14.885 8.824 C 13.536 7.648 11.802 7 10 7 C 5.865 7 2.5 10.365 2.5 14.5 C 2.5 18.635 5.865 22 10 22 C 14.136 22 17.5 18.635 17.5 14.5 L 17.5 13 L 10 13 Z "
                    fill="rgb(255,255,255)"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </span>
    );
  };
}

export default SpreadTheWord;
