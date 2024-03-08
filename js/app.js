function formatSQLValues(inputText) {
  const sections = inputText.split(/\n(?=[A-Za-z])/);

  let sqlFormattedSections = [];

  sections.forEach(section => {
    // Split the section into lines, ignoring the first line (relation name)
    let lines = section.split('\n').slice(1);
    lines = lines.slice(0, lines.length-1);
    let values = [];

    lines.forEach(line => {
      // Remove any extra spaces and tabs, then split by one or more spaces/tabs
      const parts = line.trim().replace(/\s\s+/g, ' ').split(/\s|\t/);
      // Format the line as a SQL tuple
      const formattedLine = parts.map((part, index) => isNaN(part) ? `'${part}'` : part).join(', ');
      values.push(`(${formattedLine})`);
    });

    if (values.length > 0) {
      sqlFormattedSections.push(values.join(',\n'));
    }
  });

  return sqlFormattedSections.join(';\n\n') + ';';
}
