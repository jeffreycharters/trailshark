import { stateEnums } from "./constants";

type ColorPlace = "button" | "border" | "background" | undefined;

export const getDaisyColour = (state: string, colorPlace: ColorPlace) => {
    let stateKey: string = state;
    switch (colorPlace) {
        case 'border':
            stateKey += 'Border';
            break;
        case 'button':
            stateKey += 'Btn';
            break;
        case 'background':
            stateKey += 'Bg'
            break;
        default:
            stateKey = '';
    }
    console.log({ stateKey, state, colorPlace });

    return stateEnums[stateKey]
}