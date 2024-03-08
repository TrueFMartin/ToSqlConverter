function formatSQLValues(inputText) {
  const sections = inputText.split(/\n(?=[A-Za-z])/);
  let sqlFormattedSections = [];

  sections.forEach(section => {
    // Split the section into lines, ignoring the first line (relation name)
    let lines = section.split('\n').slice(1);
    // Drop the last empty line
    lines = lines.slice(0, lines.length-1);
    let values = [];

    lines.forEach(line => {
      // Remove any extra spaces and tabs, then split by one or more spaces/tabs
      // const parts = line.trim().replace(/\s\s+/g, ' ').split(/\s|\t/);
      const parts = splitString(line)
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

function splitString(input) {
  input = input.replaceAll("\t", "  ")
  const parts = input.split(' ').reduce((acc, word, index, arr) => {
    if (word === '') return acc;

    const currentIsCapitalized = /^[A-Z]/.test(word);
    const nextIsCapitalized = index + 1 < arr.length ? /^[A-Z]/.test(arr[index + 1]) : false;
    const prevIsCapitalized = index - 1 >= 0 ? /^[A-Z]/.test(arr[index - 1]) : false;

    // Handle grouping of capitalized words separated by a single space
    if (currentIsCapitalized && (nextIsCapitalized || prevIsCapitalized) && arr[index - 1] !== '' && word !== '') {
      const last = acc.pop();
      if (typeof last === 'string' && /^[A-Z]/.test(last)) {
        acc.push(last + ' ' + word);
      } else {
        if (last) acc.push(last);
        acc.push(word);
      }
    } else {
      acc.push(word);
    }

    return acc;
  }, []);

  // Split any remaining multiple space-separated segments
  return parts.reduce((acc, part) => {
    if (/\s{2,}/.test(part)) {
      acc.push(...part.split(/\s{2,}/).filter(Boolean));
    } else {
      acc.push(part);
    }
    return acc;
  }, []);
}

function testSplit(strIn){
  let out = ""
  splitString(strIn).forEach(s => out = out + s + "\n")
  return out
}
