import React from 'react';
import PropTypes from 'prop-types';

import ModeSwitchHelper from './ModeSwitchHelper';

class ModeSwitch extends React.Component {
    static propTypes = {
        groups: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])),
        save: PropTypes.bool,
        onChange: PropTypes.func,
        defaultMode: PropTypes.number
    };

    static defaultProps = {
        groups: null,
        save: false,
        onChange: null,
        defaultMode: null
    };

    static init(config) {
        if(!config) return false;

        ModeSwitchHelper.init(config);

        return true;
    }

    static isUserInGroup(groupId) {
        if(!window.chayns.env.user.isAuthenticated) return false;

        for (let j = 0, userGroups = window.chayns.env.user.groups, k = userGroups.length; j < k; j += 1) {
            if(groupId === userGroups[j].id) {
                return true;
            }
        }

        return false;
    }

    componentDidMount() {
        ModeSwitchHelper.init({
            groups: this.props.groups,
            save: this.props.save,
            onChange: this.props.onChange,
            defaultMode: this.props.defaultMode
        });
    }

    render() {
        return null;
    }
}

ModeSwitch.getCurrentMode = ModeSwitchHelper.getCurrentMode;
ModeSwitch.addChangeListener = ModeSwitchHelper.onChange;
ModeSwitch.removeChangeListener = ModeSwitchHelper.unregisterOnChange;
ModeSwitch.show = ModeSwitchHelper.show;
ModeSwitch.hide = ModeSwitchHelper.hide;
ModeSwitch.isUserInGroup = ModeSwitchHelper.isUserInGroup;
ModeSwitch.isChaynsManager = ModeSwitchHelper.isChaynsManager;

export default ModeSwitch;
