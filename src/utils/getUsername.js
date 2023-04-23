function getUsername(argv) {
  let defaultName = 'Vasya';
  if(argv.length > 2 && argv[2].startsWith('--username')) {
    defaultName = argv[2].slice(11);
  }

  return defaultName;
}

export default getUsername;