function formatSQLValues(inputText) {
  // Split the input text into sections
  const sections = inputText.split(/\n(?=[A-Za-z])/);

  // This will hold the formatted SQL strings for each section
  let sqlFormattedSections = [];

  sections.forEach(section => {
    // Split the section into lines, ignoring the first line (section name)
    let lines = section.split('\n').slice(1);
    lines = lines.slice(0, lines.length-1);
    // This will hold the formatted SQL values for the current section
    let values = [];

    lines.forEach(line => {
      // Remove any extra spaces and tabs, then split by one or more spaces/tabs
      const parts = line.trim().replace(/\s\s+/g, ' ').split(/\s|\t/);
      // Format the line as a SQL tuple, handling strings appropriately
      const formattedLine = parts.map((part, index) => isNaN(part) ? `'${part}'` : part).join(', ');
      values.push(`(${formattedLine})`);
    });

    // Add the formatted values for the current section to the output array
    if (values.length > 0) {
      sqlFormattedSections.push(values.join(',\n'));
    }
  });

  // Join the sections with a semicolon and line breaks for separation
  return sqlFormattedSections.join(';\n\n') + ';';
}

// Example usage with `inputText` being the string from the data file
// const inputText = "Restaurants\n0 Tasty Thai Asian Dallas\n...";
// const output = formatSQLValues(inputText);
// console.log(output);
