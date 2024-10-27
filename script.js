function convertToTypeScript() {
    const javaDTO = document.getElementById("javaDTO").value;
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
                    tsType = "number";
                    break;
                case "Boolean":
                    tsType = "boolean";
                    break;
                default:
                    tsType = "any";
            }

            // Convert field name to camelCase and append '?'
            tsDTO += `  ${fieldName}?: ${tsType};\n`;
        }
    });

    // Display the TypeScript DTO
    document.getElementById("tsDTO").value = tsDTO;
}
