import { styles } from "./style";
import { Text, TouchableOpacity } from "react-native";

const ButtonComp = (props) => {
    const { title, onPress, type, style, disable } = props;
    const styleType = {
        buttonType: "",
        textType: "",
    };

    switch (type) {
        case "largePrimary":
            (styleType["buttonType"] = styles.large_primary),
                (styleType["textType"] = styles.buttonTextPrimary);
            break;
        case "mediumPrimary":
            (styleType["buttonType"] = styles.medium_primary),
                (styleType["textType"] = styles.buttonTextPrimary);
            break;
        case "smallPrimary":
            (styleType["buttonType"] = styles.small_primary),
                (styleType["textType"] = styles.buttonTextPrimary);
            break;
        case "largeSecondary":
            (styleType["buttonType"] = styles.large_secondary),
                (styleType["textType"] = styles.buttonTextSecondary);
            break;
        case "mediumSecondary":
            (styleType["buttonType"] = styles.medium_secondary),
                (styleType["textType"] = styles.buttonTextSecondary);
            break;
        case "smallSecondary":
            (styleType["buttonType"] = styles.small_secondary),
                (styleType["textType"] = styles.buttonTextSecondary);
            break;
    }

    return (
        <TouchableOpacity
            style={[
                disable && { pointerEvents: 'none', opacity: 0.5 },
                styleType.buttonType,
                { minWidth: 50 },
                style,
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    ["smallSecondary", "smallPrimary"].includes(type) &&
                    styles.buttonTextsmall,
                    styleType.textType,
                    { fontFamily: 'Outfit-Regular' },
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};
export default ButtonComp;
