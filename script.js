function convertToTypeScript() {
    const javaDTO = document.getElementById("javaDTO").value;
    if (!javaDTO.trim()) {
        document.getElementById("tsDTO").value = "Please enter Java DTO fields.";
        return;
    }

    const lines = javaDTO.split("\n");
    let tsDTO = "";

    lines.forEach(line => {
        line = line.trim();

        if (line.startsWith("private")) {
            let [javaType, fieldName] = line
                .replace("private", "")
                .replace(";", "")
                .trim()
                .split(/\s+/);

            let tsType;
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
                    tsType = "any";
            }

            fieldName = toCamelCase(fieldName);
            tsDTO += `  ${fieldName}?: ${tsType};\n`;
        }
    });

    // Set the output text area and copy to clipboard
    document.getElementById("tsDTO").value = tsDTO;
    copyToClipboard(tsDTO);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const tooltip = document.getElementById("tooltipText");
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = 1;

        // Hide tooltip after 2 seconds
        setTimeout(() => {
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = 0;
        }, 2000);
    });
}

function toCamelCase(fieldName) {
    return fieldName.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}