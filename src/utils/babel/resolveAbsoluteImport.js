module.exports = function resolveAbsoluteImport(importName) {
    const values = {
        Accordion: 'react-chayns-accordion/component/Accordion.js',
        AccordionIntro: 'react-chayns-accordion/component/AccordionIntro.js',
        AmountControl: 'react-chayns-amountcontrol/component/AmountControl.js',
        InspectElementAnimation: 'react-chayns-animations/component/InspectElement/InspectElement.js',
        Button: 'react-chayns-button/component/Button.js',
        ChooseButton: 'react-chayns-button/component/ChooseButton.js',
        Calendar: 'react-chayns-button/component/Calendar.js',
        Checkbox: 'react-chayns-checkbox/component/Checkbox.js',
        ContextMenu: 'react-chayns-contextmenu/component/ContextMenu.js',
        EmojiInput: 'react-chayns-emoji_input/component/EmojiInput.js',
        GridCalendar: 'react-chayns-gridcalendar/component/GridCalendar.js',
        Input: 'react-chayns-input/component/Input.js',
        ModeSwitch: 'react-chayns-modeswitch/component/ModeSwitch.js',
        Mode: 'react-chayns-modeswitch/component/Mode.js',
        ModeSwitchHelper: 'react-chayns-modeswitch/component/ModeSwitchHelper.js',
        connectToModeSwitch: 'react-chayns-modeswitch/component/connectToModeSwitch.js',
        PersonFinder: 'react-chayns-personfinder/component/PersonFinder.js',
        RadioButton: 'react-chayns-radiobutton/component/RadioButton.js',
        ScrollView: 'react-chayns-scrollview/component/ScrollView.js',
        SelectButton: 'react-chayns-selectbutton/component/SelectButton.js',
        SelectList: 'react-chayns-selectlist/component/SelectList.js',
        SelectListItem: 'react-chayns-selectlist/component/SelectItem.js',
        SetupWizard: 'react-chayns-setupwizard/component/SetupWizard.js',
        SetupWizardItem: 'react-chayns-setupwizard/component/SetupItem.js',
        SharingBar: 'react-chayns-sharingbar/component/SharingBar.js',
        SmallWaitCursor: 'react-chayns-smallwaitcursor/component/SmallWaitCursor.js',
        Swiper: 'react-chayns-swiper/component/Slider.js',
        SwipeOverlay: 'react-chayns-swiper/component/SlideOverlay.js',
        Swipe: 'react-chayns-swiper/component/Slide.js',
        TextArea: 'react-chayns-textarea/component/TextArea.js',
        TextString: 'react-chayns-textstring/component/TextString.js',
        FileUpload: 'react-chayns-upload/component/FileUpload.js',
        RefuelWidget: 'react-refuel/component/Refuel.js',
        WeatherWidget: 'react-weather/component/Weather.js',
        WorldWeatherOnline: 'react-weather/component/utils/WorldWeatherOnline.js',
    };

    if(!values[importName]) {
        throw new Error(`Unable to resolve ${importName} from chayns-components. Please check the spelling. If it's not wrong please create an issue (https://github.com/TobitSoftware/chayns-components/issues).`);
    }

    return `chayns-components/lib/${values[importName]}`;
};
