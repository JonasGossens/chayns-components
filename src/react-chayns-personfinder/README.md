# PersonFinder-Component # 

The PersonFinder-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage of the PersonFinder ##
At first the component has to be imported:

```jsx
import { PersonFinder } from 'chayns-components';
```

Then it can be used like in the following example:
```jsx
<PersonFinder
    placeholder="Person suchen"
    onChange={this.personChanged}
/>
```

### Props ###

| Property   | Description                                                                                        | Type    |
|------------|-----------------------------------------------------------------------------------------------------|--------|
| placeholder | Placeholder of the input field                                                 | String |
| onChange    | Callback that will be executed when a person gets selected                                                   | Function |
| className | CSS classes for the input field                             | String   |
| style    | Styles for the input field                                                   | Object |
| required    | Makes the input required                                                   | bool |