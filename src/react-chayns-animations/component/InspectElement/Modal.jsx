/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as Constants from './constants';

export default class Modal extends React.Component {
    static propTypes = {
        top: PropTypes.string,
        left: PropTypes.string,
        right: PropTypes.string,
        renderComponent: PropTypes.func.isRequired,
        closeOverlay: PropTypes.func.isRequired,
        direction: PropTypes.number,
        width: PropTypes.string,
        expandedWidth: PropTypes.number,
    };

    static defaultProps = {
        top: undefined,
        left: undefined,
        right: undefined,
        direction: undefined,
        width: undefined,
        expandedWidth: undefined,
    };

    constructor() {
        super();

        this.state = {

        };
    }

    getModalWidth() {
        const {
            width,
            left,
            right,
            direction,
        } = this.props;

        if(direction === Constants.DIRECTION_LEFT) {
            return `${parseFloat(width) + (2 * parseFloat(right))}px`;
        }

        return `${parseFloat(width) + (2 * parseFloat(left))}px`;
    }

    getWidth() {
        const { width, expandedWidth } = this.props;
        const {
            didLeave,
            willEnter,
            willEnterActive,
            didEnter,
            willLeave,
            willLeaveActive,
        } = this.state;


        if(!didLeave && !didEnter && !willEnterActive && !willEnter && !willLeave && !willLeaveActive) {
            return width;
        }

        if(willEnter || willLeaveActive) {
            return width;
        }

        return window.chayns.utils.isString(expandedWidth) ? expandedWidth : `${expandedWidth}px`;
    }

    componentWillEnter(callback) {
        if(window.debugLevel >= 2) {
            console.debug('inspect-element (Modal) component: componentWillEnter', this.props, this.state);
        }

        this.setState({
            willEnter: true,
            willEnterActive: false,
            didEnter: false,
            willLeave: false,
            willLeaveActive: false,
            didLeave: false
        });

        window.setTimeout(() => {
            window.chayns.showOverlay('rgba(0, 0, 0, 0.8)', '.55s').then(() => {
                if(this.props.closeOverlay) {
                    this.props.closeOverlay();
                }
            }).catch(() => {});

            this.setState({
                willEnter: false,
                willEnterActive: true,
                didEnter: false,
                willLeave: false,
                willLeaveActive: false,
                didLeave: false
            });
        }, 100);

        window.setTimeout(() => {
            callback();
        }, 650);
    }

    componentDidEnter() {
        if(window.debugLevel >= 2) {
            console.debug('inspect-element (Modal) component: componentDidEnter', this.props, this.state);
        }

        this.setState({
            willEnter: false,
            willEnterActive: false,
            didEnter: true,
            willLeave: false,
            willLeaveActive: false,
            didLeave: false
        });


        if(this._content) {
            const { bottom } = this._content.getBoundingClientRect();
            const { height } = document.body.getBoundingClientRect();
            const newPadding = (bottom - height) + 25;
            const tapp = document.querySelector('.tapp') || document.body;

            if(tapp && bottom > height && tapp.style.borderBottomWidth < newPadding) {
                tapp.style.borderBottomWidth = `${newPadding}px`;
                tapp.style.borderBottomStyle = 'solid';
                tapp.style.borderBottomColor = 'transparent';
            }
        }
    }

    componentWillLeave(callback) {
        if(window.debugLevel >= 2) {
            console.debug('inspect-element (Modal) component: componentWillLeave', this.props, this.state);
        }

        this.setState({
            willEnter: false,
            willEnterActive: false,
            didEnter: false,
            willLeave: true,
            willLeaveActive: false,
            didLeave: false
        });

        window.setTimeout(() => {
            this.setState({
                willEnter: false,
                willEnterActive: false,
                didEnter: false,
                willLeave: false,
                willLeaveActive: true,
                didLeave: false
            });

            window.chayns.invokeCall({ // invoke setOverlay-call (same behavior like hideOverlay, but allows to set a transition)
                action: 116,
                value: {
                    enabled: false,
                    color: 'rgba(0, 0, 0, 0.8)',
                    transition: '0.55s',
                    callback: ''
                }
            });
        }, 100);

        window.setTimeout(() => {
            callback();
        }, 650);
    }

    render() {
        const {
            top,
            renderComponent,
            closeOverlay,
            direction,
        } = this.props;
        const {
            willEnter,
            willEnterActive,
            willLeave,
            willLeaveActive,
            didEnter,
        } = this.state;

        if(window.debugLevel >= 2) {
            console.debug('render inspect-element (Modal) component', this.props, this.state);
        }

        return (
            <span
                className={classnames('modal', {
                    'modal--visible': didEnter,
                    'modal--enter': willEnter,
                    'modal--enter--active': willEnterActive,
                    'modal--leave': willLeave,
                    'modal--leave--active': willLeaveActive,
                    'modal--left': (direction === Constants.DIRECTION_LEFT),
                    'modal--right': (direction === Constants.DIRECTION_RIGHT)
                })}
                style={{
                    top,
                    left: (direction === Constants.DIRECTION_RIGHT) ? 0 : null,
                    right: (direction === Constants.DIRECTION_LEFT) ? 0 : null,
                    width: this.getModalWidth()
                }}
            >
                <div
                    className="modal--overlay"
                    onClick={closeOverlay}
                />
                <div
                    className="modal--content"
                    style={{
                        width: this.getWidth()
                    }}
                    ref={(ref) => { this._content = ref; }}
                >
                    {renderComponent({
                        visible: didEnter,
                        enter: willEnter,
                        enterActive: willEnterActive,
                        leave: willLeave,
                        leaveActive: willLeaveActive
                    })}
                </div>
            </span>
        );
    }
}
