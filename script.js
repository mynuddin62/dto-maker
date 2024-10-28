function convertToTypeScript() {
    const javaDTO = document.getElementById("javaDTO").value;
    if (!javaDTO.trim()) {
        document.getElementById("tsDTO").value = "Please enter Java DTO fields.";
        return;
    }

    const lines = javaDTO.split("\n");
    let tsDTO = "";
    const customTypes = new Set(); // Store custom types to declare later

    lines.forEach(line => {
        line = line.trim();

        if (line.startsWith("private")) {
            let [javaType, fieldName] = line
                .replace("private", "")
                .replace(";", "")
                .trim()
                .split(/\s+/);

            let tsType;

            // Handle common primitive types and detect custom class types
            switch (javaType) {
                case "String":
                    tsType = "string";
                    break;
                case "Integer":
                case "int":
                case "double":
                case "Double":
                case "Long":
                    tsType = "number";
                    break;
                case "Boolean":
                    tsType = "boolean";
                    break;
                case "Date":
                    tsType = "Date";
                    break;
                default:
                    // Check for List or custom class type
                    if (javaType.startsWith("List<")) {
                        let innerType = javaType.match(/List<(.+)>/)[1];
                        innerType = removeDtoSuffix(innerType);
                        tsType = `${innerType}[]`; // Use [] for array type
                        customTypes.add(innerType); // Register custom type for later
                    } else {
                        tsType = removeDtoSuffix(javaType); // Remove Dto suffix if present
                        customTypes.add(tsType); // Register custom type for later
                    }
            }

            fieldName = toCamelCase(fieldName);
            tsDTO += `  ${fieldName}?: ${tsType};\n`;
        }
    });


    // Set the output text area and copy to clipboard
    document.getElementById("tsDTO").value = tsDTO;
    copyToClipboard(tsDTO);
}

function removeDtoSuffix(type) {
    return type.endsWith("Dto") ? type.slice(0, -3) : type;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const tooltip = document.getElementById("tooltipText");
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = 1;
        setTimeout(() => {
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = 0;
        }, 2000);
    });
}

function toCamelCase(fieldName) {
    return fieldName.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}
