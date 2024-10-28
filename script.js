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

        // Extract field name and type if the line starts with 'private'
        if (line.startsWith("private")) {
            let [javaType, fieldName] = line
                .replace("private", "")
                .replace(";", "")
                .trim()
                .split(/\s+/);

            // Convert Java type to TypeScript type
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

            // Convert field name to camelCase and append '?'
            fieldName = toCamelCase(fieldName);
            tsDTO += `  ${fieldName}?: ${tsType};\n`;
        }
    });

    // Display the TypeScript DTO
    document.getElementById("tsDTO").value = tsDTO;
}

// Helper function to convert field name to camelCase
function toCamelCase(fieldName) {
    return fieldName.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}
